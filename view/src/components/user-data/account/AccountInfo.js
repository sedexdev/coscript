import React from "react";
import Alert from "../../alert/Alert";
import EditAccountData from "./EditAccountData";

import PropTypes from "prop-types";

const AccountInfo = ({
    user,
    displayEmailWindow,
    emailField,
    cancelEdit,
    onChange,
    onSubmit,
    onClick
}) => {
    const editIcon = require("../../../img/edit.svg");
    return (
        <section className='profile-form-container'>
            {displayEmailWindow && (
                <EditAccountData
                    heading='Update email'
                    field={emailField}
                    name='email'
                    cancelEdit={cancelEdit}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    value='Save'
                />
            )}
            <div className='profile-box'>
                <label className='profile-label' htmlFor='user-email'>
                    Email Address:
                </label>
                <div className='input-container'>
                    <div className='account-box'>
                        <p className='users-email'>{user && user.email}</p>
                    </div>
                    <button className='edit-icon-btn' onClick={e => onClick(e)}>
                        <img
                            id='edit-email-btn'
                            className='edit-input-icon'
                            src={editIcon}
                            alt='edit input icon'
                        />
                    </button>
                </div>
                <Alert />
            </div>
        </section>
    );
};

AccountInfo.propTypes = {
    displayEmailWindow: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    emailField: PropTypes.object
};

export default AccountInfo;
