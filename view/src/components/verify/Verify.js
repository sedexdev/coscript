import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import VerifyForm from "./VerifyForm";

import {
    sendEmail,
    verifyPWCode,
    sendTempCredentialsEmail,
} from "../../redux/auxiliary/sendEmail";

import "./verify.css";

export class Verify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: "",
            submitted: false,
            emailError: false,
            codeError: false,
            confirmCode: "",
            sending: false,
            codeSent: false,
        };
        this.onChange = this.onChange.bind(this);
        this.showEmailError = this.showEmailError.bind(this);
        this.showCodeError = this.showCodeError.bind(this);
        this.showSendingSpinner = this.showSendingSpinner.bind(this);
        this.removeSendingSpinner = this.removeSendingSpinner.bind(this);
        this.showCodeError = this.showCodeError.bind(this);
        this.onSubmitEmail = this.onSubmitEmail.bind(this);
        this.onSubmitCode = this.onSubmitCode.bind(this);
        this.showCodeSentMessage = this.showCodeSentMessage.bind(this);
        this.removeCodeSubmitMessage = this.removeCodeSubmitMessage.bind(this);
    }

    /**
     * Sets the browser tab title and scrolls to the
     * top of the page when the component mounts
     */
    componentDidMount() {
        document.title = "CoScript - Verify email";
        window.scrollTo(0, 0);
    }

    /**
     * Sets the <[e.target.name]> state property to the
     * value of the event target
     *
     * @param {Object} e - event object
     */
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    /**
     * Temporarily displays a message to the user if
     * the email they entered didn't match any records
     * in the database
     */
    showEmailError() {
        this.setState({
            emailError: true,
        });
        setTimeout(() => {
            this.setState({
                emailError: false,
            });
        }, 4000);
    }

    /**
     * Temporarily displays a message to the user if
     * the code they entered didn't match the verification
     * code they were sent in an email
     */
    showCodeError() {
        this.setState({
            codeError: true,
            originalCode: "",
        });
        setTimeout(() => {
            this.setState({
                codeError: false,
            });
        }, 4000);
    }

    /**
     * Sets the 'sending' state property to true to display
     * a loading spinner while an email is sent to the user
     * with a verification code
     */
    showSendingSpinner() {
        this.setState({
            sending: true,
        });
    }

    /**
     * Sets the 'sending' state property to false to remove
     * a loading spinner once an email has been sent to a
     * user with a verification code
     */
    removeSendingSpinner() {
        this.setState({
            sending: false,
        });
    }

    /**
     * Sets the 'codeSent' state property to true to display
     * a 'Please wait...' message to the user while the code
     * is verified
     */
    showCodeSentMessage() {
        this.setState({
            codeSent: true,
        });
    }

    /**
     * Sets the 'codeSent' state property to false to remove
     * a loading spinner once the code has been verified
     */
    removeCodeSubmitMessage() {
        this.setState({
            codeSent: false,
        });
    }

    /**
     * Shows an error message if the user didn't enter a
     * valid email. If the email is valid, the user is then
     * sent an email with a verification code
     *
     * @param {Object} e - event object
     */
    async onSubmitEmail(e) {
        e.preventDefault();
        this.showSendingSpinner();
        const { userEmail } = this.state;
        if (!userEmail) {
            this.showEmailError();
        } else {
            const subject = "User credentials reminder";
            const source = "reset";
            const res = await sendEmail(userEmail, subject, source);
            localStorage.setItem("originalCode", res.data.originalCode);
            this.setState({
                submitted: true,
            });
            this.removeSendingSpinner();
        }
    }

    /**
     * Firstly displays a message to the user confirming
     * the code has been sent to the server. If the code
     * matches, the user is sent an email with a reminder
     * of their username and a temporary password they
     * can log in with **THIS NEEDS REVISING**
     *
     * @param {Object} e - event object
     */
    async onSubmitCode(e) {
        e.preventDefault();
        this.showCodeSentMessage();
        const { userEmail, confirmCode } = this.state;
        const { history } = this.props;
        const originalCode = localStorage.getItem("originalCode");
        const res = await verifyPWCode({
            originalCode,
            confirmCode,
            forgottenDetails: true,
        });
        if (res.success) {
            await sendTempCredentialsEmail(userEmail);
            history["from"] = "verify";
            history.push("/redirect");
        } else {
            this.showCodeError();
            this.removeCodeSubmitMessage();
        }
    }

    render() {
        const { sending, codeSent } = this.state;
        const spinner = require("../../img/loading.svg");

        const { submitted, emailError, codeError } = this.state;
        return (
            <main className='verify-body'>
                <section className='verify-container'>
                    <h1 className='coscript-h1'>CoScript</h1>
                    <VerifyForm
                        msg='Please enter the email address you signed up
                                with:'
                        name='userEmail'
                        placeholder='Email'
                        onSubmit={this.onSubmitEmail}
                        onChange={this.onChange}
                    />
                    {submitted && (
                        <Fragment>
                            <VerifyForm
                                msg='Please enter the code we just sent to your email
                                address:'
                                name='confirmCode'
                                placeholder='Code'
                                onSubmit={this.onSubmitCode}
                                onChange={this.onChange}
                            />
                            {codeSent && (
                                <p className='code-sent-message'>
                                    Please wait...
                                </p>
                            )}
                        </Fragment>
                    )}
                    {emailError && (
                        <p className='verification-error'>
                            Email cannot be blank
                        </p>
                    )}
                    {codeError && (
                        <p className='verification-error'>Codes do not match</p>
                    )}
                    {sending && (
                        <div className='sending-credentials-email-spinner-container'>
                            <img
                                className='sending-credentials-email-spinner'
                                src={spinner}
                                alt='sending'
                            />
                        </div>
                    )}
                    <Link className='home-link' to='/'>
                        Back Home
                    </Link>
                </section>
            </main>
        );
    }
}

export default withRouter(Verify);
