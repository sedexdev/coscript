import React from "react";
import { Link, Redirect } from "react-router-dom";
import PostButton from "../buttons/PostButton";
import PropTypes from "prop-types";

import Alert from "../alert/Alert";

const RegistrationFrom = ({
    email,
    name,
    username,
    password,
    confirmPassword,
    onChange,
    onSubmit,
    regToken,
    loading,
    emailField,
}) => {
    // Redirect on registration
    if (regToken) {
        return <Redirect to='/confirm' />;
    }

    const spinner = require("../../img/loading.svg");

    return (
        <section className='form-container'>
            <div className='registration-form'>
                <form onSubmit={(e) => onSubmit(e)}>
                    <h1 className='sign-up-header'>Sign Up</h1>
                    <label className='reg-label' name='register-email'>
                        Email*
                    </label>
                    <input
                        className='reg-input'
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        placeholder='Email...'
                        onFocus={(e) => (e.target.placeholder = "")}
                        onBlur={(e) => (e.target.placeholder = "Email...")}
                        ref={emailField}
                    />
                    <label className='reg-label' name='register-name'>
                        Name*
                    </label>
                    <input
                        className='reg-input'
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => onChange(e)}
                        placeholder='Name...'
                        onFocus={(e) => (e.target.placeholder = "")}
                        onBlur={(e) => (e.target.placeholder = "Name...")}
                    />
                    <label className='reg-label' name='register-username'>
                        Username*
                    </label>
                    <input
                        className='reg-input'
                        type='text'
                        name='username'
                        value={username}
                        onChange={(e) => onChange(e)}
                        placeholder='Username...'
                        onFocus={(e) => (e.target.placeholder = "")}
                        onBlur={(e) => (e.target.placeholder = "Username...")}
                    />
                    <label className='reg-label' name='register-password'>
                        Password*
                    </label>
                    <input
                        className='reg-input'
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => onChange(e)}
                        placeholder='Password...'
                        onFocus={(e) => (e.target.placeholder = "")}
                        onBlur={(e) => (e.target.placeholder = "Password...")}
                    />
                    <label className='reg-label' name='confirm-password'>
                        Confirm password*
                    </label>
                    <input
                        className='reg-input'
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={(e) => onChange(e)}
                        placeholder='Confirm password...'
                        onFocus={(e) => (e.target.placeholder = "")}
                        onBlur={(e) =>
                            (e.target.placeholder = "Confirm password...")
                        }
                    />
                    <br />
                    <Alert />
                    <div className='form-links-container'>
                        <p className='reg-link'>
                            Already registered? Click{" "}
                            <Link to='/login'>
                                <span className='login-link'>here</span>
                            </Link>
                        </p>
                    </div>
                    <div className='register-btn-container'>
                        <PostButton classes='grn-btn' value='Submit' />
                        {loading && (
                            <img
                                className='reg-loading-spinner'
                                src={spinner}
                                alt='loading'
                            />
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
};

RegistrationFrom.propTypes = {
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    preReg: PropTypes.bool,
    loading: PropTypes.bool,
    emailField: PropTypes.object,
};

export default RegistrationFrom;
