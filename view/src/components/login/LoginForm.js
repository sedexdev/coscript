import React from "react";
import { Link, Redirect } from "react-router-dom";
import PostButton from "../buttons/PostButton";
import PropTypes from "prop-types";

import Alert from "../alert/Alert";

const LoginForm = ({
    username,
    password,
    loading,
    onChange,
    onSubmit,
    isLoggedIn,
    usernameField
}) => {
    if (isLoggedIn) {
        return <Redirect to='/' />;
    }

    const spinner = require("../../img/loading.svg");

    return (
        <section className='login-cover'>
            <div className='login-container'>
                <h1 className='login-header'>Login...</h1>
                <div>
                    <div className='login-form'>
                        <form onSubmit={e => onSubmit(e)}>
                            <label htmlFor='username' className='log-label'>
                                Username:
                            </label>
                            <input
                                className='log-input'
                                type='text'
                                name='username'
                                value={username}
                                onChange={e => onChange(e)}
                                placeholder='Username...'
                                onFocus={e => (e.target.placeholder = "")}
                                onBlur={e =>
                                    (e.target.placeholder = "Username...")
                                }
                                ref={usernameField}
                            />
                            <br />
                            <label htmlFor='password' className='log-label'>
                                Password:
                            </label>
                            <input
                                className='log-input'
                                type='password'
                                name='password'
                                value={password}
                                onChange={e => onChange(e)}
                                placeholder='Password...'
                                onFocus={e => (e.target.placeholder = "")}
                                onBlur={e =>
                                    (e.target.placeholder = "Password...")
                                }
                            />
                            <br />
                            <p className='log-link'>
                                Haven't registered? You can do that{" "}
                                <Link to='/register'>
                                    <span className='login-link'>here</span>
                                </Link>
                            </p>
                            <p className='log-link'>
                                Forgotten your username or password?{" "}
                                <Link to='/verify'>
                                    <span className='login-link'>
                                        Click here
                                    </span>
                                </Link>
                            </p>
                            <Alert />
                            <div className='login-submit-container'>
                                <PostButton classes='small-btn' value='Login' />
                                {loading && (
                                    <img
                                        className='login-loading-spinner'
                                        src={spinner}
                                        alt='loading'
                                    />
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool,
    usernameField: PropTypes.object.isRequired
};

export default LoginForm;
