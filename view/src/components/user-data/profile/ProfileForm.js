import React from "react";
import EditProfileData from "./EditProfileData";

import PropTypes from "prop-types";

const ProfileForm = ({
    user,
    displayEditWindow,
    editField,
    editName,
    deleteID,
    inputField,
    cancelEdit,
    deleteData,
    onChange,
    onClickName,
    onClick,
    onSubmitAbout,
    onSubmitAuthors,
    onSubmitBooks
}) => {
    const editIcon = require("../../../img/edit.svg");
    return (
        <div className='profile-form-container'>
            {displayEditWindow && (
                <EditProfileData
                    id={editField}
                    editName={editName}
                    deleteID={deleteID}
                    inputField={inputField}
                    cancelEdit={cancelEdit}
                    deleteData={deleteData}
                    onChange={onChange}
                    onSubmitAbout={onSubmitAbout}
                    onSubmitAuthors={onSubmitAuthors}
                    onSubmitBooks={onSubmitBooks}
                />
            )}
            <div className='profile-form'>
                <div className='profile-box'>
                    <p>
                        <b>Publicly visible name:</b>
                    </p>
                    <div className='displayed-name'>
                        <input
                            id='username-radio'
                            type='radio'
                            name='name-radio'
                            onClick={e => onClickName(e)}
                        />
                        <label htmlFor='username'>Username</label>
                        <br />
                        <input
                            id='myname-radio'
                            type='radio'
                            name='name-radio'
                            onClick={e => onClickName(e)}
                        />
                        <label htmlFor='myname'>My name</label>
                    </div>
                </div>
                <div className='profile-box'>
                    <label className='profile-label' htmlFor='user-about'>
                        About Me:
                    </label>
                    <div className='profile-data-container'>
                        <div className='profile-data'>
                            <ul className='data-display'>
                                {user && user.profile.about}
                            </ul>
                        </div>
                        <button className='edit-icon-btn' type='button'>
                            <img
                                className='edit-input-icon'
                                name='about'
                                onClick={e => onClick(e)}
                                src={editIcon}
                                alt='Edit input icon'
                            />
                        </button>
                    </div>
                </div>
                <div className='profile-box'>
                    <label className='profile-label' htmlFor='user-authors'>
                        Favourite Authors:
                    </label>
                    <div className='profile-data-container'>
                        <div className='profile-data'>
                            <ul className='data-display'>
                                {user &&
                                    user.profile.authors &&
                                    user.profile.authors.map(item => (
                                        <li
                                            className='profile-list-item'
                                            key={item}>
                                            {item}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <button className='edit-icon-btn' type='button'>
                            <img
                                className='edit-input-icon'
                                name='authors'
                                onClick={e => onClick(e)}
                                src={editIcon}
                                alt='Edit input icon'
                            />
                        </button>
                    </div>
                </div>
                <div className='profile-box'>
                    <label className='profile-label' htmlFor='user-books'>
                        Favourite Books:
                    </label>
                    <div className='profile-data-container'>
                        <div className='profile-data'>
                            <ul className='data-display'>
                                {user &&
                                    user.profile.books &&
                                    user.profile.books.map(item => (
                                        <li
                                            className='profile-list-item'
                                            key={item}>
                                            {item}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <button className='edit-icon-btn' type='button'>
                            <img
                                className='edit-input-icon'
                                name='books'
                                onClick={e => onClick(e)}
                                src={editIcon}
                                alt='Edit input icon'
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfileForm.propTypes = {
    user: PropTypes.object,
    displayEditWindow: PropTypes.bool.isRequired,
    editField: PropTypes.string.isRequired,
    editName: PropTypes.string.isRequired,
    deleteID: PropTypes.string.isRequired,
    inputField: PropTypes.object.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    deleteData: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onClickName: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onSubmitAbout: PropTypes.func.isRequired,
    onSubmitAuthors: PropTypes.func.isRequired,
    onSubmitBooks: PropTypes.func.isRequired
};

export default ProfileForm;
