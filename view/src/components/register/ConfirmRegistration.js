import React from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import PostButton from "../buttons/PostButton";

import PropTypes from "prop-types";

const ConfirmRegistration = ({
    isRegistered,
    onChangeConfirm,
    onSubmitConfirm,
    verifyFailed
}) => {
    if (isRegistered) {
        return <Redirect to='/login' />;
    }

    return (
        <main className='confirm-body'>
            <section className='confirm-container'>
                <h1 className='coscript-h1'>CoScript</h1>
                <p className='confirm-text'>
                    Please enter the code we just sent to the email address you
                    signed up with:
                </p>
                <div className='confirm-code-container'>
                    <form
                        className='confirm-code'
                        onSubmit={e => onSubmitConfirm(e)}>
                        <input
                            className='c-code'
                            type='text'
                            name='confirmCode'
                            onChange={e => onChangeConfirm(e)}
                            placeholder='Confirmation code'
                        />
                        <PostButton classes='square-btn' value='Submit' />
                    </form>
                </div>
                <span className='verify-code-failed' ref={verifyFailed}></span>
                <Link to='/'>
                    <p className='home-link'>Back Home</p>
                </Link>
            </section>
        </main>
    );
};

ConfirmRegistration.propTypes = {
    onChangeConfirm: PropTypes.func.isRequired,
    onSubmitConfirm: PropTypes.func.isRequired
};

export default ConfirmRegistration;
