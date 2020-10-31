import React from "react";

import PropTypes from "prop-types";

const EditAccountData = ({
    heading,
    field,
    name,
    cancelEdit,
    onChange,
    onSubmit,
    value,
    deleteAccount,
    deleteCode,
    deleteCodeIncorrect
}) => {
    return (
        <div className='account-edit-container'>
            <form onSubmit={e => onSubmit(e)}>
                <p className='profile-edit-heading'>{heading}</p>
                {deleteAccount === "true" && (
                    <p className='profile-edit-msg'>
                        Please enter the following code to remove your account{" "}
                        <strong>{String(deleteCode)}</strong>
                    </p>
                )}
                <div className='textarea-container'>
                    <input
                        className='email-edit-input'
                        name={name}
                        type='text'
                        onChange={e => onChange(e)}
                        ref={field}
                    />
                </div>
                {deleteCodeIncorrect && (
                    <span className='delete-error'>Codes do not match</span>
                )}
                <div className='btn-container'>
                    <button className='cancel-btn' onClick={cancelEdit}>
                        Cancel
                    </button>
                    <input
                        className='confirm-btn'
                        type='submit'
                        value={value}
                    />
                </div>
            </form>
        </div>
    );
};

EditAccountData.defaultProps = {
    deleteAccount: "false"
};

EditAccountData.propTypes = {
    heading: PropTypes.string.isRequired,
    field: PropTypes.object,
    name: PropTypes.string.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    deleteAccount: PropTypes.string,
    deleteCode: PropTypes.number,
    deleteCodeIncorrect: PropTypes.bool
};

export default EditAccountData;
