import React, { Fragment } from "react";

import Alert from "../../alert/Alert";
import ProfileForm from "./ProfileForm";
import MyProjects from "./MyProjects";
import Collaborations from "./Collaborations";

import PropTypes from "prop-types";

const UserInfo = ({
    user,
    displayEditWindow,
    editField,
    editName,
    deleteID,
    projects,
    userCollaborations,
    history,
    projectTitle,
    projectGenres,
    projectDescription,
    displayProjectEditWindow,
    displayDeleteProjectWindow,
    openDeleteProjectWindow,
    removeDeleteProjectWindow,
    displayCollaborateDeleteWindow,
    openCollaborateDeleteWindow,
    removeCollaborateDeleteWindow,
    onDeleteProject,
    onDeleteCollaborate,
    onClickProject,
    onSubmitProject,
    saving,
    savingCollaborate,
    loading,
    inputField,
    onChange,
    onClick,
    cancelEdit,
    deleteData,
    onClickName,
    onSubmitAbout,
    onSubmitAuthors,
    onSubmitBooks,
}) => {
    const userImage = require("../../../img/user.svg");
    return (
        <Fragment>
            <Alert />
            <div className='user-info-container'>
                <h1 className='profile-h1'>My Profile</h1>
                <section className='profile'>
                    <h2 className='profile-heading' id='profile-h2'>
                        Profile
                    </h2>
                    <ProfileForm
                        user={user}
                        displayEditWindow={displayEditWindow}
                        editField={editField}
                        editName={editName}
                        deleteID={deleteID}
                        inputField={inputField}
                        onChange={onChange}
                        onClick={onClick}
                        cancelEdit={cancelEdit}
                        deleteData={deleteData}
                        onClickName={onClickName}
                        onSubmitAbout={onSubmitAbout}
                        onSubmitAuthors={onSubmitAuthors}
                        onSubmitBooks={onSubmitBooks}
                    />
                </section>
                <section className='photo'>
                    <h2 className='profile-heading' id='photo-h2'>
                        Photo
                    </h2>
                    <div className='change-avatar-container'>
                        <img
                            className='avatar'
                            src={user ? user.avatar : userImage}
                            alt='Users profile avatar'
                        />
                        <div className='profile-image-text-container'>
                            <p>Want a different image?</p>
                            <label
                                className='profile-image-text'
                                htmlFor='profile-image-upload'>
                                Click here
                                <input
                                    className='choose-file'
                                    id='profile-image-upload'
                                    type='file'
                                />
                            </label>
                            <p> to upload a new one</p>
                        </div>
                        <br />
                    </div>
                </section>
                <section className='my-projects'>
                    <h2 className='profile-heading' id='projects-h2'>
                        My Projects
                    </h2>
                    <MyProjects
                        user={user}
                        projects={projects}
                        projectTitle={projectTitle}
                        projectGenres={projectGenres}
                        projectDescription={projectDescription}
                        displayProjectEditWindow={displayProjectEditWindow}
                        displayDeleteProjectWindow={displayDeleteProjectWindow}
                        openDeleteProjectWindow={openDeleteProjectWindow}
                        removeDeleteProjectWindow={removeDeleteProjectWindow}
                        onChange={onChange}
                        cancelEdit={cancelEdit}
                        onDeleteProject={onDeleteProject}
                        onClickProject={onClickProject}
                        onSubmitProject={onSubmitProject}
                        saving={saving}
                        loading={loading}
                    />
                </section>
                <section className='starred-projects'>
                    <h2 className='profile-heading' id='starred-projects-h2'>
                        Collaborations
                    </h2>
                    <Collaborations
                        user={user}
                        userCollaborations={userCollaborations}
                        displayCollaborateDeleteWindow={
                            displayCollaborateDeleteWindow
                        }
                        openCollaborateDeleteWindow={
                            openCollaborateDeleteWindow
                        }
                        removeCollaborateDeleteWindow={
                            removeCollaborateDeleteWindow
                        }
                        onDeleteCollaborate={onDeleteCollaborate}
                        savingCollaborate={savingCollaborate}
                        onChange={onChange}
                        history={history}
                        loading={loading}
                    />
                </section>
            </div>
        </Fragment>
    );
};

UserInfo.propTypes = {
    user: PropTypes.object,
    displayEditWindow: PropTypes.bool.isRequired,
    editField: PropTypes.string.isRequired,
    editName: PropTypes.string.isRequired,
    deleteID: PropTypes.string.isRequired,
    projects: PropTypes.array,
    userCollaborations: PropTypes.array,
    history: PropTypes.object,
    projectTitle: PropTypes.string,
    projectGenres: PropTypes.string,
    projectDescription: PropTypes.string,
    displayProjectEditWindow: PropTypes.bool.isRequired,
    displayDeleteProjectWindow: PropTypes.bool.isRequired,
    openDeleteProjectWindow: PropTypes.func.isRequired,
    removeDeleteProjectWindow: PropTypes.func.isRequired,
    onDeleteProject: PropTypes.func.isRequired,
    displayCollaborateDeleteWindow: PropTypes.bool.isRequired,
    openCollaborateDeleteWindow: PropTypes.func.isRequired,
    removeCollaborateDeleteWindow: PropTypes.func.isRequired,
    onDeleteCollaborate: PropTypes.func.isRequired,
    onClickProject: PropTypes.func.isRequired,
    onSubmitProject: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    loading: PropTypes.bool,
    savingCollaborate: PropTypes.bool,
    inputField: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    deleteData: PropTypes.func.isRequired,
    onClickName: PropTypes.func.isRequired,
    onSubmitAbout: PropTypes.func.isRequired,
    onSubmitAuthors: PropTypes.func.isRequired,
    onSubmitBooks: PropTypes.func.isRequired,
};

export default UserInfo;
