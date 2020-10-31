import React from "react";

import PropTypes from "prop-types";

const EditProfileData = ({
    id,
    editName,
    deleteID,
    inputField,
    onChange,
    cancelEdit,
    deleteData,
    onSubmitAbout,
    onSubmitAuthors,
    onSubmitBooks
}) => {
    let editHeading;
    let submitFunc;
    let placeholder;
    switch (id) {
        case "user-about":
            editHeading = "about me";
            submitFunc = onSubmitAbout;
            placeholder = "Write something about yourself...";
            break;
        case "user-authors":
            editHeading = "favourite authors";
            submitFunc = onSubmitAuthors;
            placeholder = "Please separate names with commas...";
            break;
        case "user-books":
            editHeading = "favourite books";
            submitFunc = onSubmitBooks;
            placeholder = "Please separate titles with commas...";
            break;
        default:
            editHeading = "";
    }
    return (
        <div className='profile-edit-container'>
            <form onSubmit={e => submitFunc(e)}>
                <p className='profile-edit-heading'>Edit {editHeading}</p>
                <div className='textarea-container'>
                    <textarea
                        id={id}
                        className='profile-edit-textarea'
                        name={editName}
                        onChange={e => onChange(e)}
                        placeholder={placeholder}
                        ref={inputField}
                    />
                </div>
                <div className='btn-container'>
                    <button className='cancel-btn' onClick={cancelEdit}>
                        Cancel
                    </button>
                    <button
                        id={deleteID}
                        className='delete-btn'
                        onClick={e => deleteData(e)}>
                        Delete
                    </button>
                    <input className='confirm-btn' type='submit' value='Save' />
                </div>
            </form>
        </div>
    );
};

EditProfileData.propTypes = {
    id: PropTypes.string,
    editName: PropTypes.string,
    deleteID: PropTypes.string,
    inputField: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    deleteData: PropTypes.func.isRequired,
    onSubmitAbout: PropTypes.func.isRequired,
    onSubmitAuthors: PropTypes.func.isRequired,
    onSubmitBooks: PropTypes.func.isRequired
};

export default EditProfileData;
