import React, { Fragment } from "react";
import Button from "../../buttons/Button";

import PropTypes from "prop-types";

const Password = ({
    visible,
    hidePassword,
    verifyFailed,
    failed,
    onChange,
    sendChangeCode,
    submitCode,
    loading,
}) => {
    const spinner = require("../../../img/loading-black.svg");

    return (
        <section className='profile-form-container'>
            <div className='pw-button-container'>
                <Button
                    onClick={sendChangeCode}
                    classes='small-btn'
                    value='Change Password'
                />
            </div>

            {visible && (
                <Fragment>
                    <div className='profile-box'>
                        <button
                            className='pw-hide-btn'
                            type='button'
                            onClick={hidePassword}>
                            Close
                        </button>
                        <p className='prompt-text'>
                            Please check your inbox at your registered email and
                            enter the code we just sent you below:
                        </p>
                    </div>
                    <div className='profile-box'>
                        <div className='pw-code-container'>
                            <div className='input-container'>
                                <input
                                    type='text'
                                    name='confirmCode'
                                    className='pw-code-input'
                                    onChange={(e) => onChange(e)}
                                    placeholder='6 digit code...'
                                />
                            </div>
                            <Button
                                onClick={(e) => submitCode(e)}
                                classes='square-btn'
                                value='Verify'
                            />
                            {loading && (
                                <img
                                    className='verify-pw-code-spinner'
                                    src={spinner}
                                    alt='loading'
                                />
                            )}
                        </div>
                        {failed && (
                            <span
                                className='pw-code-failed'
                                ref={verifyFailed}></span>
                        )}
                    </div>
                </Fragment>
            )}
        </section>
    );
};

Password.propTypes = {
    visible: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    sendChangeCode: PropTypes.func.isRequired,
    submitCode: PropTypes.func.isRequired,
    hidePassword: PropTypes.func.isRequired,
    verifyFailed: PropTypes.object.isRequired,
    failed: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default Password;
