import React, { Fragment } from "react";

import PostButton from "../buttons/PostButton";

import PropTypes from "prop-types";

const VerifyForm = ({ msg, name, placeholder, onSubmit, onChange }) => {
    return (
        <Fragment>
            <p className='verify-text'>{msg}</p>
            <div className='verify-email-container'>
                <form className='verify-email' onSubmit={e => onSubmit(e)}>
                    <input
                        className='v-email'
                        type='text'
                        name={name}
                        placeholder={placeholder}
                        onChange={e => onChange(e)}
                        onBlur={e => (e.target.placeholder = { placeholder })}
                        onFocus={e => (e.target.placeholder = "")}
                    />
                    <PostButton classes='square-btn' value='Submit' />
                </form>
            </div>
        </Fragment>
    );
};

VerifyForm.propTypes = {
    msg: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default VerifyForm;
