import React from "react";
import { withRouter } from "react-router-dom";
import MobileNav from "../MobileNav";
import SidePanel from "../SidePanel";
import AccountInfo from "./AccountInfo";
import Password from "./Password";
import DeleteAccount from "./DeleteAccount";

// Redux
import { connect } from "react-redux";
import { displayAlert } from "../../../redux/actions/alertpopup";
import { sendPWEmail, verifyPWCode } from "../../../redux/auxiliary/sendEmail";
import { loadUser, deleteUser } from "../../../redux/actions/auth";
import { updateUserEmail } from "../../../redux/actions/account";

import PropTypes from "prop-types";

import "./account.css";

export class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            confirmCode: "",
            confirmDeleteCode: "",
            deleteCode: NaN,
            deleteCodeIncorrect: false,
            verifyFailedMsg: "",
            visible: false,
            authenticated: false,
            failed: false,
            displayEmailWindow: false,
            displayDeleteWindow: false,
            loading: false,
        };
        this.displaySpinner = this.displaySpinner.bind(this);
        this.removeSpinner = this.removeSpinner.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.hidePassword = this.hidePassword.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.sendChangeCode = this.sendChangeCode.bind(this);
        this.submitCode = this.submitCode.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.emailField = React.createRef();
        this.deleteField = React.createRef();
        this.verifyFailed = React.createRef();
    }

    /**
     * Sets the browser tab title and scrolls to the top
     * of the page when the component mounts
     */
    componentDidMount() {
        document.title = "CoScript - Account";
        window.scrollTo(0, 0);
    }

    /**
     * Checks the 'failed' state property to see if a
     * verification code failed to match and sets the
     * 'verifiedFailed' ref textContext to the value of
     * 'verifyFailedMsg' if it did
     */
    componentDidUpdate() {
        const { failed, verifyFailedMsg } = this.state;
        if (failed) {
            this.verifyFailed.current.textContent = verifyFailedMsg;
        }
    }

    /**
     * Sets the 'loading' state property to true to display
     * a loading spinner to the user while loading
     */
    displaySpinner() {
        this.setState({
            loading: true,
        });
    }

    /**
     * Sets the 'loading' state property to false to remove
     * a loading spinner from the UI
     */
    removeSpinner() {
        this.setState({
            loading: false,
        });
    }

    /**
     * Falsifies all state properties that are associated
     * with displaying UI elements to the user so they can
     * edit their account details
     */
    cancelEdit() {
        this.setState({
            displayEmailWindow: false,
            displayDeleteWindow: false,
            deleteCode: NaN,
            deleteCodeIncorrect: false,
        });
    }

    /**
     * Sets the 'visible' state property to false to hide the
     * password update verification code field. This also clears
     * the generated code out of local storage **THIS NEEDS TO
     * BE REVISED - CODES SHOULD BE STORED IN THE DATABASE**
     */
    hidePassword() {
        this.setState({
            visible: false,
        });
        if (localStorage.getItem("originalCode") !== null) {
            localStorage.removeItem("originalCode");
        }
    }

    /**
     * Displays an edit window to the user so they can
     * either update their email address or choose to
     * delete their account
     *
     * @param {Object} e - event object
     */
    onClick(e) {
        const { user } = this.props;
        switch (e.target.id) {
            case "edit-email-btn":
                this.setState({
                    displayEmailWindow: true,
                });
                setTimeout(() => {
                    this.emailField.current.value = user.email;
                }, 500);
                break;
            case "delete-account-btn":
                this.setState({
                    displayDeleteWindow: true,
                    deleteCode: Math.floor(Math.random() * 1000000) + 423523,
                });
                break;
            default:
                return;
        }
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
     * Updates the user's email address in the database
     *
     * @param {Object} e - event object
     */
    onSubmit(e) {
        e.preventDefault();
        this.setState({
            displayEmailWindow: false,
        });
        const { user, updateUserEmail } = this.props;
        const newAccountState = {
            ...user,
            email: this.state.email,
        };
        updateUserEmail(newAccountState);
    }

    /**
     * Sets the 'visible' state property to true to display
     * the verification code entry field to the user. Also
     * sends an email to the user with the code they have
     * to enter to change their password
     */
    async sendChangeCode() {
        this.setState({
            visible: true,
        });
        const { user } = this.props;
        const res = await sendPWEmail(user.email);
        setTimeout(() => {
            localStorage.setItem("originalCode", res.data.originalCode);
        }, 500);
    }

    /**
     * Checks the verification code the user entered
     * against the original code being stored in
     * local storage. If the codes match, the user is
     * give an auth token and redirected to a protected
     * page where they can update their password. If the
     * codes don't match, the user is shown an error
     * message
     *
     * @param {Object} e - event object
     */
    async submitCode(e) {
        e.preventDefault();
        this.displaySpinner();
        const { confirmCode } = this.state;
        const data = {
            originalCode: localStorage.getItem("originalCode"),
            confirmCode,
            forgottenDetails: false,
        };
        const res = await verifyPWCode(data);
        if (res.success) {
            await this.props.loadUser();
            localStorage.removeItem("originalCode");
            this.setState({
                failed: false,
                authenticated: true,
            });
            this.props.history.push("/update-credentials");
        } else {
            this.setState({
                failed: true,
                verifyFailedMsg: res.msg,
            });
            this.removeSpinner();
        }
    }

    /**
     * Checks to see if the code displayed to the user
     * when the window opens matches the code the user
     * enters into the input field. If it matches, the
     * user's account is deleted and they are redirected
     * to the homepage. If not, an error message is shown
     *
     * @param {Object} e - event object
     */
    onDelete(e) {
        e.preventDefault();
        const { user, history, deleteUser } = this.props;
        const { deleteCode, confirmDeleteCode } = this.state;
        if (deleteCode === Number(confirmDeleteCode)) {
            history["from"] = "delete";
            history.push("/redirect");
            deleteUser(user.email);
        } else {
            this.setState({
                deleteCodeIncorrect: true,
            });
            setTimeout(() => {
                this.setState({
                    deleteCodeIncorrect: false,
                });
            }, 3000);
        }
    }

    render() {
        const {
            displayEmailWindow,
            displayDeleteWindow,
            deleteCode,
            deleteCodeIncorrect,
            visible,
            authenticated,
            failed,
            loading,
        } = this.state;

        return (
            <main className='profile-container'>
                <MobileNav />
                <SidePanel />
                <div className='user-info-container'>
                    <section className='account'>
                        <h2 className='profile-heading' id='account-h2'>
                            My Account
                        </h2>
                        <AccountInfo
                            user={this.props.user}
                            displayEmailWindow={displayEmailWindow}
                            onClick={this.onClick}
                            cancelEdit={this.cancelEdit}
                            onChange={this.onChange}
                            onSubmit={this.onSubmit}
                            emailField={this.emailField}
                        />
                    </section>
                    <section className='password'>
                        <h2 className='profile-heading' id='password-h2'>
                            Password Settings
                        </h2>
                        <Password
                            visible={visible}
                            authenticated={authenticated}
                            displayPasswordChange={this.displayPasswordChange}
                            hidePassword={this.hidePassword}
                            onChange={this.onChange}
                            sendChangeCode={this.sendChangeCode}
                            submitCode={this.submitCode}
                            failed={failed}
                            verifyFailed={this.verifyFailed}
                            loading={loading}
                        />
                    </section>
                    <section className='privacy'>
                        <h2 className='profile-heading' id='privacy-h2'>
                            Privacy
                        </h2>
                        <section className='profile-form-container'>
                            <div className='profile-box'>
                                <p className='profile-label'>
                                    Profile visibility:
                                </p>
                                <div className='profile-visibility'>
                                    <input
                                        type='checkbox'
                                        id='profile-public'
                                        name='profile-public'
                                        defaultChecked
                                    />
                                    <label htmlFor='profile-public'>
                                        Public
                                    </label>
                                    <br />
                                    <input
                                        type='checkbox'
                                        id='profile-private'
                                        name='profile-private'
                                    />
                                    <label htmlFor='profile-private'>
                                        Private
                                    </label>
                                </div>
                            </div>
                            <div className='profile-box'>
                                <p className='profile-label'>
                                    Receive emails from us?
                                </p>
                                <div className='profile-visibility'>
                                    <input
                                        type='checkbox'
                                        id='receive-email-pos'
                                        name='receive-email-pos'
                                        defaultChecked
                                    />
                                    <label htmlFor='receive-email-pos'>
                                        Yes
                                    </label>
                                    <br />
                                    <input
                                        type='checkbox'
                                        id='receive-email-neg'
                                        name='receive-email-neg'
                                    />
                                    <label htmlFor='receive-email-neg'>
                                        No
                                    </label>
                                </div>
                            </div>
                        </section>
                    </section>
                    <section className='delete-account-container'>
                        <DeleteAccount
                            onClick={this.onClick}
                            onChange={this.onChange}
                            cancelEdit={this.cancelEdit}
                            displayDeleteWindow={displayDeleteWindow}
                            deleteField={this.deleteField}
                            onDelete={this.onDelete}
                            deleteCode={deleteCode}
                            deleteCodeIncorrect={deleteCodeIncorrect}
                        />
                    </section>
                </div>
            </main>
        );
    }
}

Account.propTypes = {
    user: PropTypes.object,
    displayAlert: PropTypes.func,
    updateUserEmail: PropTypes.func.isRequired,
    loadUser: PropTypes.func,
    deleteUser: PropTypes.func,
};

const setProps = (state) => ({
    user: state.auth.user,
});

export default connect(setProps, {
    displayAlert,
    updateUserEmail,
    deleteUser,
    loadUser,
})(withRouter(Account));
