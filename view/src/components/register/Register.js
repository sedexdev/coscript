import React, { useState, useEffect, useRef } from "react";
import { Redirect, withRouter } from "react-router-dom";
import NavBar from "../NavBar";
import RegistrationForm from "./RegistrationForm";
import ConfirmRegistration from "./ConfirmRegistration";

import { sendEmail } from "../../redux/auxiliary/sendEmail";

// Redux
import { connect } from "react-redux";
import { displayAlert } from "../../redux/actions/alertpopup";
import { startRegistration, verifyEmail } from "../../redux/actions/auth";

import PropTypes from "prop-types";

import "./register.css";

export const Register = ({ ...props }) => {
    /**
     * Create references to focus on the emailField on mount and
     * for the code verification field to check for failures
     */
    const emailRef = useRef();
    const verifyRef = useRef();

    /**
     * Set the state for this functional component and its children
     */
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [failed, setFailed] = useState(false);
    const [verifyFailedMsg, setVerifyFailedMsg] = useState("");
    const [confirmCode, setConfirmCode] = useState("");
    const [loading, setLoading] = useState(false);

    /**
     * This effect will set the document title and scroll to the
     * top of the page on mount and unmount. It will also focus
     * on the email field when the component first mounts
     */
    useEffect(() => {
        document.title = "CoScript - Register";
        window.scrollTo(0, 0);
        if (emailRef.current) emailRef.current.focus();
    }, []);

    /**
     * Checks the 'failed' state property to see if a
     * verification code failed to match and sets the
     * 'verifiedFailed' ref textContext to the value of
     * 'verifyFailedMsg' if it did
     */
    useEffect(() => {
        if (failed) {
            if (verifyRef.current)
                verifyRef.current.textContent = verifyFailedMsg;
        }
    }, [failed, verifyFailedMsg]);

    /**
     * Sets the 'loading' state property to true to
     * display a loading spinner while registering
     * the user
     */
    const displaySpinner = () => {
        setLoading(true);
    };

    /**
     * Sets the 'loading' state property to false to
     * remove a loading spinner if registering the
     * user failed
     */
    const removeSpinner = () => {
        setLoading(false);
    };

    /**
     * Sets the <[e.target.name]> state property to
     * the value of the event target
     *
     * @param {Object} e - event object
     */
    const onChange = (e) => {
        const value = e.target.value;
        switch (e.target.name) {
            case "email":
                setEmail(value);
                break;
            case "name":
                setName(value);
                break;
            case "username":
                setUsername(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "confirmPassword":
                setConfirmPassword(value);
                break;
            default:
                return null;
        }
    };

    /**
     * Sets the 'confirmCode' state property to the
     * value of the event target
     *
     * @param {Object} e - event object
     */
    const onChangeConfirm = (e) => {
        setConfirmCode(e.target.value);
    };

    /**
     *First checks to see if the passwords the user entered
     matched, displays a warning alert if not. Then starts 
     the pre-registration process and sends the user an email
     with a a verification code they can use to complete 
     registration. The original version of the code is 
     stored in local storage temporarily **THIS NEEDS TO BE
     CHANGED SO THAT THE CODE IS STORED IN THE DATABASE**
     * 
     * @param {Object} e - event object
     */
    const onSubmit = async (e) => {
        e.preventDefault();
        displaySpinner();
        if (password !== confirmPassword) {
            props.displayAlert("Passwords do not match", "danger");
            removeSpinner();
        } else {
            const userData = {
                email,
                name,
                username,
                password,
            };
            const verifyStartedReg = await props.startRegistration(userData);
            if (verifyStartedReg) {
                removeSpinner();
                const subject = "Verify your new CoScript account";
                const res = await sendEmail(email, subject, "registration");
                if (res)
                    localStorage.setItem("originalCode", res.data.originalCode);
            } else {
                removeSpinner();
            }
        }
    };

    /**
     * Uses the code stored in local storage to check if the code
     * the user entered is a match. If the code doesn't match, the
     * 'failed' state property is set to true and the 'verifyFailedMsg'
     * state property is set to the value sent back by the server
     *
     * @param {Object} e - event object
     */
    const onSubmitConfirm = async (e) => {
        e.preventDefault();
        const data = {
            originalCode: localStorage.getItem("originalCode"),
            confirmCode: confirmCode,
            token: props.regToken,
        };
        const res = await props.verifyEmail(data);
        if (res) {
            setFailed(true);
            setVerifyFailedMsg(res.msg);
        }
    };

    const { from } = props.location.state || {
        from: { route: "/" },
    };

    const { regUser, regToken } = props;
    const isLoggedIn = regUser ? regUser.isLoggedIn : false;
    const isRegistered = regUser ? regUser.isRegistered : false;

    if (isLoggedIn) {
        return <Redirect to={from} />;
    }

    if (isRegistered && !isLoggedIn) {
        return <Redirect to='/login' />;
    }

    if (!regToken) {
        return (
            <main className='register-body'>
                <NavBar />
                <RegistrationForm
                    email={email}
                    name={name}
                    username={username}
                    password={password}
                    confirmPassword={confirmPassword}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    loading={loading}
                    regToken={props.regToken}
                    emailField={emailRef}
                />
            </main>
        );
    } else {
        return (
            <ConfirmRegistration
                isRegistered={isRegistered}
                onChangeConfirm={onChangeConfirm}
                onSubmitConfirm={onSubmitConfirm}
                verifyFailed={verifyRef}
            />
        );
    }
};

Register.propTypes = {
    user: PropTypes.object,
    regToken: PropTypes.string,
    displayAlert: PropTypes.func.isRequired,
    startRegistration: PropTypes.func.isRequired,
    verifyEmail: PropTypes.func.isRequired,
};

const setProps = (state) => ({
    user: state.auth.user,
    regUser: state.auth.regUser,
    regToken: state.auth.regToken,
});

export default connect(setProps, {
    displayAlert,
    startRegistration,
    verifyEmail,
})(withRouter(Register));
