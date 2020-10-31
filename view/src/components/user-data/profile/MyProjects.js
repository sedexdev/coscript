import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { saveDate } from "../../../redux/actions/documents";
import { filterUsersProjects } from "../../../redux/auxiliary/projects";

import PropTypes from "prop-types";
import { clearFileData } from "../../../redux/actions/files";
import { clearProjectData } from "../../../redux/actions/documents";

const MyProjects = ({
    user,
    projects,
    projectTitle,
    projectGenres,
    projectDescription,
    displayProjectEditWindow,
    displayDeleteProjectWindow,
    openDeleteProjectWindow,
    removeDeleteProjectWindow,
    onChange,
    cancelEdit,
    onDeleteProject,
    onClickProject,
    onSubmitProject,
    saveDate,
    saving,
    loading,
    ...props
}) => {
    const editIcon = require("../../../img/edit.svg");
    const spinner = require("../../../img/loading-black.svg");

    let userProjects = [];
    if (projects) {
        userProjects = filterUsersProjects(projects, user.userId);
    }

    return (
        <Fragment>
            {displayDeleteProjectWindow && (
                <div className='delete-project-window'>
                    <p className='delete-project-heading'>Delete this project completely?</p>
                    <form className='edit-project-form' onSubmit={(e) => onDeleteProject(e)}>
                        <div className='project-edit-btn-container'>
                            {saving && <img src={spinner} className='update-project-loading-spinner' alt='Loading spinner' />}
                            <button className='cancel-btn' onClick={removeDeleteProjectWindow}>
                                Cancel
                            </button>
                            <input className='confirm-btn' type='submit' value='Delete' />
                        </div>
                    </form>
                </div>
            )}
            {displayProjectEditWindow && (
                <div className='edit-project-details-window'>
                    <p className='edit-project-heading'>Edit '{projectTitle}' details</p>
                    <form className='edit-project-form' onSubmit={(e) => onSubmitProject(e)}>
                        <label className='edit-project-label' htmlFor='profile-project-title'>
                            Title
                        </label>
                        <input
                            className='edit-project-data-input'
                            id='profile-project-title'
                            type='text'
                            name='projectTitle'
                            onChange={(e) => onChange(e)}
                            defaultValue={projectTitle}
                        />
                        <label className='edit-project-label' htmlFor='profile-project-genres'>
                            Genres
                        </label>
                        <input
                            className='edit-project-data-input'
                            id='profile-project-genres'
                            type='text'
                            name='projectGenres'
                            onChange={(e) => onChange(e)}
                            defaultValue={projectGenres}
                        />
                        <label className='edit-project-label' htmlFor='profile-project-description'>
                            Description
                        </label>
                        <textarea
                            className='edit-project-data-textarea'
                            id='profile-project-description'
                            type='text'
                            name='projectDescription'
                            onChange={(e) => onChange(e)}
                            defaultValue={projectDescription}></textarea>
                        <div className='project-edit-btn-container'>
                            {saving && <img src={spinner} className='update-project-loading-spinner' alt='Loading spinner' />}
                            <button className='cancel-btn' onClick={cancelEdit}>
                                Cancel
                            </button>
                            <input className='confirm-btn' type='submit' value='Save' />
                        </div>
                    </form>
                </div>
            )}
            {loading ? (
                <img className='profile-project-loading-spinner' src={spinner} alt='loading' />
            ) : (
                <Fragment>
                    {user && userProjects && userProjects.length ? (
                        <div className='my-projects-list'>
                            {userProjects.map((project) => {
                                return (
                                    <div className='profile-project-list-element-wrapper' key={project.projectId}>
                                        <li
                                            className='profile-project-list-element'
                                            onClick={async () => {
                                                await saveDate(project);
                                                props.history.push(`/editor${project.url}`);
                                            }}>
                                            {project.title}
                                        </li>
                                        <div className='project-options-container'>
                                            <button className='edit-icon-btn' type='button'>
                                                <img
                                                    src={editIcon}
                                                    className='edit-input-icon'
                                                    id={project.projectId}
                                                    onClick={(e) => onClickProject(e)}
                                                    alt='Edit input icon'
                                                />
                                            </button>
                                            <button className='delete-project-btn' onClick={openDeleteProjectWindow}>
                                                <i className='far fa-times-circle' id={project.projectId}></i>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className='projects-warning'>
                            <p>
                                You don't have any active projects at the moment... create one{" "}
                                <Link
                                    to='/editor'
                                    onClick={async () => {
                                        await props.clearProjectData();
                                        await props.clearFileData();
                                    }}>
                                    <span className='profile-link'>here</span>
                                </Link>
                            </p>
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

MyProjects.propTypes = {
    user: PropTypes.object,
    projects: PropTypes.array,
    projectTitle: PropTypes.string,
    projectGenres: PropTypes.string,
    projectDescription: PropTypes.string,
    displayProjectEditWindow: PropTypes.bool.isRequired,
    displayDeleteProjectWindow: PropTypes.bool.isRequired,
    openDeleteProjectWindow: PropTypes.func.isRequired,
    removeDeleteProjectWindow: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    onDeleteProject: PropTypes.func.isRequired,
    onClickProject: PropTypes.func.isRequired,
    onSubmitProject: PropTypes.func.isRequired,
    saveDate: PropTypes.func,
    saving: PropTypes.bool,
    loading: PropTypes.bool,
    clearFileData: PropTypes.func.isRequired,
    clearProjectData: PropTypes.func.isRequired,
};

export default connect(null, { saveDate, clearFileData, clearProjectData })(withRouter(MyProjects));
