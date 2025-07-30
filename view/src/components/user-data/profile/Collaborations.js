import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import timesCircleIcon from "../../../img/icons/times-circle.svg";

// Redux
import { connect } from "react-redux";
import { loadProject } from "../../../redux/actions/documents";

const Collaborations = ({
    user,
    userCollaborations,
    openCollaborateDeleteWindow,
    removeCollaborateDeleteWindow,
    displayCollaborateDeleteWindow,
    onDeleteCollaborate,
    savingCollaborate,
    loading,
    history,
    loadProject,
}) => {
    const spinner = require("../../../img/loading-black.svg");

    return (
        <Fragment>
            {displayCollaborateDeleteWindow && (
                <div className="delete-project-window">
                    <p className="delete-project-heading">
                        Leave this project?
                    </p>
                    <form
                        className="edit-project-form"
                        onSubmit={(e) => onDeleteCollaborate(e)}
                    >
                        <div className="project-edit-btn-container">
                            {savingCollaborate && (
                                <img
                                    src={spinner}
                                    className="update-project-loading-spinner"
                                    alt="Loading spinner"
                                />
                            )}
                            <button
                                className="cancel-btn"
                                onClick={removeCollaborateDeleteWindow}
                            >
                                Cancel
                            </button>
                            <input
                                className="confirm-btn"
                                type="submit"
                                value="Delete"
                            />
                        </div>
                    </form>
                </div>
            )}
            {loading ? (
                <img
                    className="profile-project-loading-spinner"
                    src={spinner}
                    alt="loading"
                />
            ) : (
                <Fragment>
                    {user && userCollaborations && userCollaborations.length ? (
                        <div className="my-projects-list">
                            {userCollaborations.map((project) => {
                                return (
                                    <div
                                        className="profile-collaborations-list-element-wrapper"
                                        key={project.projectId}
                                    >
                                        <li
                                            className="profile-project-list-element"
                                            onClick={async () => {
                                                await loadProject(project);
                                                history.push(
                                                    `/editor${project.url}`
                                                );
                                            }}
                                        >
                                            {project.title}
                                        </li>
                                        <div className="project-options-container">
                                            <button
                                                className="delete-project-btn"
                                                onClick={
                                                    openCollaborateDeleteWindow
                                                }
                                            >
                                                <img
                                                    className="cancel-colab-icon"
                                                    id={project.projectId}
                                                    src={timesCircleIcon}
                                                    alt="cancel icon"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="projects-warning">
                            <p>
                                You aren't collaborating on any projects right
                                now. Find one{" "}
                                <Link to="/projects">
                                    <span className="profile-link">here</span>
                                </Link>
                            </p>
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

Collaborations.propTypes = {
    user: PropTypes.object,
    userCollaborations: PropTypes.array,
    openCollaborateDeleteWindow: PropTypes.func.isRequired,
    removeCollaborateDeleteWindow: PropTypes.func.isRequired,
    onDeleteCollaborate: PropTypes.func.isRequired,
    savingCollaborate: PropTypes.bool,
    loading: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    loadProject: PropTypes.func.isRequired,
};

export default connect(null, { loadProject })(Collaborations);
