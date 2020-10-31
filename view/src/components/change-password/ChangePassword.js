import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Alert from "../alert/Alert";
import PostButton from "../buttons/PostButton";

// Redux
import { connect } from "react-redux";
import { displayAlert } from "../../redux/actions/alertpopup";
import {
    checkCurrentPassword,
    comparePW,
} from "../../redux/auxiliary/password";
import { updatePassword } from "../../redux/actions/account";

import PropTypes from "prop-types";

import "./change-password.css";

export class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            loading: false,
        };
        this.displayLoading = this.displayLoading.bind(this);
        this.removeLoading = this.removeLoading.bind(this);
    }

    /**
     * Sets the browser tab title and scrolls to
     * the top of the page when the component mounts
     */
    componentDidMount() {
        document.title = "CoScript - Change Password";
        window.scrollTo(0, 0);
    }

    /**
     * Updates the <[e.target.name]> state variable
     * with the text value of the event target
     *
     * @param {Object} e - event object
     */
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    /**
     * Sets the loading state property to true to
     * display a loading spinner to the user while
     * processing
     */
    displayLoading() {
        this.setState({
            loading: true,
        });
    }

    /**
     * Sets the loading state property to false to
     * remove a loading spinner once processing has
     * completed
     */
    removeLoading() {
        this.setState({
            loading: false,
        });
    }

    /**
     * Performs error checking on the form for:
     *  - current password being correct
     *  - the new password clashing with a previously used password
     *  - new password and new password confirmation not matching
     *  - blank form fields
     *
     * If no errors are found, the user's new password is
     * sent to the server to be updated in the database
     *
     * @param {Object} e - event object
     */
    async onSubmit(e) {
        e.preventDefault();
        this.displayLoading();
        const { currentPassword, newPassword, confirmPassword } = this.state;
        const { user, displayAlert, updatePassword } = this.props;
        const checkCurrentPW = await checkCurrentPassword(
            user,
            currentPassword
        );
        const equal = newPassword === confirmPassword;
        const passwordClash = await comparePW(user, newPassword);
        const blank = !newPassword && !confirmPassword;
        if (!checkCurrentPW) {
            displayAlert("Your current password is not correct", "danger");
            this.removeLoading();
            return;
        } else if (!equal) {
            displayAlert("Passwords do not match", "danger");
            this.removeLoading();
            return;
        } else if (passwordClash) {
            displayAlert("That's an old password", "danger");
            this.removeLoading();
            return;
        } else if (blank) {
            displayAlert("Fields cannot be left blank", "danger");
            this.removeLoading();
            return;
        }
        await updatePassword(newPassword);
    }

    render() {
        const { loading } = this.state;
        const spinner = require("../../img/loading.svg");

        return (
            <main className='change-password-main'>
                <section className='change-password-section'>
                    <h1 className='change-password-heading'>CoScript</h1>
                    <h2 className='change-password-subheading'>
                        Update your password
                    </h2>
                    <div className='password-box'>
                        <form
                            className='new-pw-form'
                            onSubmit={(e) => this.onSubmit(e)}>
                            <div className='input-account-container'>
                                <label
                                    className='profile-label'
                                    htmlFor='new-pw'>
                                    Current Password
                                </label>
                                <input
                                    type='password'
                                    name='currentPassword'
                                    className='account-input'
                                    onChange={(e) => this.onChange(e)}
                                    placeholder='Current password...'
                                    onFocus={(e) => (e.target.placeholder = "")}
                                    onBlur={(e) =>
                                        (e.target.placeholder =
                                            "Current password...")
                                    }
                                />
                            </div>
                            <div className='input-account-container'>
                                <label
                                    className='profile-label'
                                    htmlFor='new-pw'>
                                    New Password
                                </label>
                                <input
                                    type='password'
                                    name='newPassword'
                                    className='account-input'
                                    onChange={(e) => this.onChange(e)}
                                    placeholder='New password...'
                                    onFocus={(e) => (e.target.placeholder = "")}
                                    onBlur={(e) =>
                                        (e.target.placeholder =
                                            "New password...")
                                    }
                                />
                            </div>
                            <div className='input-account-container'>
                                <label
                                    className='profile-label'
                                    htmlFor='new-pw-confirm'>
                                    Confirm Password
                                </label>
                                <input
                                    type='password'
                                    name='confirmPassword'
                                    className='account-input'
                                    onChange={(e) => this.onChange(e)}
                                    placeholder='Confirm password...'
                                    onFocus={(e) => (e.target.placeholder = "")}
                                    onBlur={(e) =>
                                        (e.target.placeholder =
                                            "Confirm password...")
                                    }
                                />
                            </div>
                            <Alert />
                            <div className='pw-change-btn-container'>
                                <PostButton
                                    classes='small-btn'
                                    value='Update'
                                />
                                {loading && (
                                    <img
                                        className='password-spinner'
                                        src={spinner}
                                        alt='loading'
                                    />
                                )}
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        );
    }
}

ChangePassword.propTypes = {
    user: PropTypes.object,
    updatePassword: PropTypes.func.isRequired,
    displayAlert: PropTypes.func.isRequired,
};

const setProps = (state) => ({
    user: state.auth.user,
});

export default connect(setProps, {
    updatePassword,
    displayAlert,
})(withRouter(ChangePassword));
