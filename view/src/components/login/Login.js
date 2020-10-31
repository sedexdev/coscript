import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";

import NavBar from "../NavBar";
import LoginForm from "./LoginForm";

// Redux
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/auth";

import PropTypes from "prop-types";

import "./login.css";

export const Login = ({ ...props }) => {
    /**
     * Create a reference to the username field to focus
     * on it when the component mounts
     */
    const usernameRef = useRef();

    /**
     * Set state for this component and its children
     */
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    /**
     * Sets the browser tab title and scrolls to the top
     * of the page whe the component mounts. Also focuses
     * on the 'username' field
     */
    useEffect(() => {
        document.title = "CoScript - Login";
        window.scrollTo(0, 0);
        if (usernameRef.current) usernameRef.current.focus();
    }, []);

    /**
     * Sets the 'loading' state property to true in order
     * to display a loading spinner while checking login
     * credentials
     */
    const showSubmitSpinner = () => {
        setLoading(true);
    };

    /**
     * Sets the 'loading' state property to false in order
     * to remove a loading spinner if login credentials are
     * incorrect
     */
    const removeSubmitSpinner = () => {
        setLoading(false);
    };

    /**
     * Sets the state property <[e.target.name]> to the value
     * of the event target
     *
     * @param {Object} e - event object
     */
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    /**
     * Attempts to log the user into the application. Shows
     * a loading spinner while validating credentials and removes
     * it if the credentials are invalid
     *
     * @param {Object} e -event object
     */
    const onSubmit = async (e) => {
        e.preventDefault();
        showSubmitSpinner();
        const success = await props.loginUser(
            formData.username,
            formData.password
        );
        if (!success) {
            removeSubmitSpinner();
        }
    };

    /**
     * Check the location the user is trying to navigate to
     * where they navigated from. Redirect the user if they
     * are not registered or are trying to access a protected
     * route
     */
    const { user, location, projectData } = props;

    const { from } = (location && location.state) || {
        from: { route: "/" },
    };

    if (user && user.isLoggedIn) {
        if (from.pathname && !projectData) {
            return from.pathname === "/update-credentials" ? (
                <Redirect to='/' />
            ) : (
                <Redirect to={from} />
            );
        }
        return <Redirect to={from} />;
    }

    return (
        <main>
            <NavBar />
            <LoginForm
                username={formData.username}
                password={formData.password}
                loading={loading}
                onChange={onChange}
                onSubmit={onSubmit}
                isLoggedIn={user ? user.isLoggedIn : false}
                usernameField={usernameRef}
            />
        </main>
    );
};

Login.propTypes = {
    user: PropTypes.object,
    projectData: PropTypes.object,
    loginUser: PropTypes.func.isRequired,
};

const setProps = (state) => ({
    user: state.auth.user,
    projectData: state.documents.projectData,
});

export default connect(setProps, { loginUser })(Login);
