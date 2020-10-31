import React from "react";
import { withRouter } from "react-router-dom";

import MobileNav from "../MobileNav";
import SidePanel from "../SidePanel";
import UserInfo from "./UserInfo";

// Redux
import { connect } from "react-redux";
import { updateUserProfile } from "../../../redux/actions/profile";
import { clearFileData } from "../../../redux/actions/files";
import {
    loadAllProjects,
    updateProjectDetails,
    getUserCollaborations,
    deleteProject,
    deleteCollaborator,
} from "../../../redux/actions/documents";
import { stopSoundEffect } from "../../../redux/auxiliary/typing-sound-effect";

import PropTypes from "prop-types";

import "./profile.css";

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                about: "",
                authors: "",
                books: "",
                projectId: "",
                projectToEdit: null,
                projectTitle: "",
                projectGenres: "",
                projectDescription: "",
                saving: false,
                savingCollaborate: false,
            },
            displayEditWindow: false,
            editField: "",
            editName: "",
            deleteID: "",
            projects: null,
            userCollaborations: null,
            displayProjectEditWindow: false,
            displayDeleteProjectWindow: false,
            displayCollaborateDeleteWindow: false,
            loading: true,
        };
        this.onChange = this.onChange.bind(this);
        this.setRadioButton = this.setRadioButton.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClickName = this.onClickName.bind(this);
        this.onClickProject = this.onClickProject.bind(this);
        this.onSubmitProject = this.onSubmitProject.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.openDeleteProjectWindow = this.openDeleteProjectWindow.bind(this);
        this.removeDeleteProjectWindow = this.removeDeleteProjectWindow.bind(
            this
        );
        this.openCollaborateDeleteWindow = this.openCollaborateDeleteWindow.bind(
            this
        );
        this.removeCollaborateDeleteWindow = this.removeCollaborateDeleteWindow.bind(
            this
        );
        this.onDeleteProject = this.onDeleteProject.bind(this);
        this.onDeleteCollaborate = this.onDeleteCollaborate.bind(this);
        this.onSubmitAbout = this.onSubmitAbout.bind(this);
        this.onSubmitAuthors = this.onSubmitAuthors.bind(this);
        this.onSubmitBooks = this.onSubmitBooks.bind(this);
        this.inputField = React.createRef();
    }

    /**
     * Sets the browser tab title and scrolls to the top
     * of the page when the component mounts. Also clears
     * any file data from Redux, loads all of a user's
     * personal project links and also loads links to
     * any projects the user is collaborating on
     */
    async componentDidMount() {
        document.title = "CoScript - Profile";
        window.scrollTo(0, 0);
        stopSoundEffect();
        this.props.clearFileData();
        await this.props.loadAllProjects();
        await this.props.getUserCollaborations();
        const { projectArray, userCollaborationsArray } = this.props;
        setTimeout(() => {
            this.setState({
                projects: projectArray,
                userCollaborations: userCollaborationsArray,
                loading: false,
            });
            this.setRadioButton();
        }, 500);
    }

    /**
     * Makes sure that the correct radio button
     * is selected at all times based on the user's
     * choice of display name
     */
    componentDidUpdate() {
        this.setRadioButton();
    }

    /**
     * Set's the user's choice of display name,
     * either their username of their real name
     */
    setRadioButton() {
        const { user } = this.props;
        if (user) {
            const button = document.getElementById(user.profile.buttonID);
            if (button) {
                button.setAttribute("checked", true);
            }
        }
    }

    /**
     * Displays a profile edit window to the user allowing
     * them to either edit their about, authors or books fields
     *
     * @param {Object} e - event object
     */
    onClick(e) {
        const id = `user-${e.target.name}`;
        const name = e.target.name;
        const deleteID = `delete-${e.target.name}`;
        this.setState({
            displayEditWindow: true,
            editField: id,
            editName: name,
            deleteID: deleteID,
        });
        const { user } = this.props;
        setTimeout(() => {
            switch (name) {
                case "about":
                    this.inputField.current.value = user.profile.about;
                    break;
                case "authors":
                    this.inputField.current.value = user.profile.authors.toString();
                    break;
                case "books":
                    this.inputField.current.value = user.profile.books.toString();
                    break;
                default:
                    return undefined;
            }
        }, 500);
    }

    /**
     * Updates the user's profile in the database with
     * the display name they have chosen, either their
     * username or the real name
     *
     * @param {Object} e - event object
     */
    onClickName(e) {
        let { user } = this.props;
        const displayName =
            e.target.id === "username-radio" ? user.username : user.name;
        const newProfileState = {
            profile: {
                ...user.profile,
                buttonID: e.target.id,
                displayName,
            },
        };
        this.props.updateUserProfile(newProfileState);
    }

    /**
     * Opens an edit window allowing the user to update
     * the details of a project they created including
     * the title, genres and description
     *
     * @param {Object} e - event object
     */
    onClickProject(e) {
        const { projects } = this.state;
        let thisProject;
        for (let project of projects) {
            if (project.projectId === e.target.id) {
                thisProject = project;
            }
        }
        this.setState({
            displayProjectEditWindow: true,
            formData: {
                projectToEdit: thisProject,
                projectTitle: thisProject.title,
                projectGenres: thisProject.genres,
                projectDescription: thisProject.description,
            },
        });
    }

    /**
     * Updates the new project details in the database
     * after editing. All projects are loaded back into
     * the front end immediately to reflect the changes
     *
     * @param {Object} e - event object
     */
    async onSubmitProject(e) {
        e.preventDefault();
        const {
            formData: {
                projectToEdit,
                projectTitle,
                projectGenres,
                projectDescription,
            },
        } = this.state;
        const data = {
            projectToEdit,
            projectTitle,
            projectGenres,
            projectDescription,
        };
        this.setState({
            formData: {
                saving: true,
            },
        });
        await this.props.updateProjectDetails(data);
        await this.props.loadAllProjects();
        this.setState({
            projects: this.props.projectArray,
            displayProjectEditWindow: false,
        });
    }

    /**
     * Removes any editing windows from the UI
     */
    cancelEdit() {
        this.setState({
            displayEditWindow: false,
            displayProjectEditWindow: false,
        });
    }

    /**
     * Sets the <[e.target.name]> state property to the
     * value of the event target
     *
     * @param {Object} e - event object
     */
    onChange(e) {
        this.setState({
            formData: {
                ...this.state.formData,
                [e.target.name]: e.target.value,
            },
        });
    }

    /**
     * Updates the 'About' section of the user's profile
     * in the database using the data from the 'formData.about'
     * state property
     */
    onSubmitAbout = (e) => {
        e.preventDefault();
        this.setState({
            displayEditWindow: false,
        });
        const { user, updateUserProfile } = this.props;
        const { about } = this.state.formData;
        const newProfileState = {
            profile: {
                ...user.profile,
                about: about === "" ? user.profile.about : about,
            },
        };
        updateUserProfile(newProfileState);
    };

    /**
     * Updates the 'Authors' section of the user's profile
     * in the database using the data from the 'formData.authors'
     * state property
     */
    onSubmitAuthors = (e) => {
        e.preventDefault();
        this.setState({
            displayEditWindow: false,
        });
        const { user, updateUserProfile } = this.props;
        const { authors } = this.state.formData;
        const newProfileState = {
            profile: {
                ...user.profile,
                authors: authors === "" ? user.profile.authors : authors,
            },
        };
        updateUserProfile(newProfileState);
    };

    /**
     * Updates the 'Books' section of the user's profile
     * in the database using the data from the 'formData.books'
     * state property
     */
    onSubmitBooks = (e) => {
        e.preventDefault();
        this.setState({
            displayEditWindow: false,
        });
        const { user, updateUserProfile } = this.props;
        const { books } = this.state.formData;
        const newProfileState = {
            profile: {
                ...user.profile,
                books: books === "" ? user.profile.books : books,
            },
        };
        updateUserProfile(newProfileState);
    };

    /**
     * Deletes a profile data entry from the database and
     * resets it to its empty base type (E.g. "String" -> ""
     * or [Objects] -> [])
     *
     * @param {Object} e - event object
     */
    deleteData(e) {
        e.preventDefault();
        this.setState({
            displayEditWindow: false,
        });
        const { user, updateUserProfile } = this.props;
        let newProfileState = {};
        switch (e.target.id) {
            case "delete-about":
                newProfileState.profile = {
                    ...user.profile,
                    about: "",
                };
                break;
            case "delete-authors":
                newProfileState.profile = {
                    ...user.profile,
                    authors: [],
                };
                break;
            case "delete-books":
                newProfileState.profile = {
                    ...user.profile,
                    books: [],
                };
                break;
            default:
                newProfileState.profile = {
                    ...user.profile,
                };
        }
        updateUserProfile(newProfileState);
    }

    /**
     * Sets the displayDeleteProjectWindow state property
     * to true in order to display the pop up window that
     * allows the user to remove delete a project
     *
     * @param {Object} e - event object
     */
    openDeleteProjectWindow(e) {
        const { projects } = this.state;
        let thisProject;
        for (let project of projects) {
            if (project.projectId === e.target.id) {
                thisProject = project;
            }
        }
        this.setState({
            displayDeleteProjectWindow: true,
            displayCollaborateDeleteWindow: false,
            formData: {
                projectTitle: thisProject.title,
                projectId: thisProject.projectId,
            },
        });
    }

    /**
     * Sets the displayDeleteProjectWindow state property
     * to false in order to remove the pop up window that
     * allows the user to remove delete a project
     */
    removeDeleteProjectWindow() {
        this.setState({
            formData: {
                projectId: "",
                saving: false,
            },
            displayDeleteProjectWindow: false,
        });
    }

    /**
     * Sets the displayCollaborateDeleteWindow state property
     * to true in order to display the pop up window that
     * allows the user to remove themselves from a project
     * they are collaborating on
     *
     * @param {Object} e - event object
     */
    openCollaborateDeleteWindow(e) {
        const { projects } = this.state;
        let thisProject;
        for (let project of projects) {
            if (project.projectId === e.target.id) {
                thisProject = project;
            }
        }
        this.setState({
            displayCollaborateDeleteWindow: true,
            displayDeleteProjectWindow: false,
            formData: {
                projectId: thisProject.projectId,
            },
        });
    }

    /**
     * Sets the displayCollaborateDeleteWindow state property
     * to false in order to remove the pop up window that
     * allows the user to remove themselves from a project
     * they are collaborating on
     */
    removeCollaborateDeleteWindow() {
        this.setState({
            formData: {
                projectId: "",
                savingCollaborate: false,
            },
            displayCollaborateDeleteWindow: false,
        });
    }

    /**
     * Deletes the selected project from the user's
     * userProject list in the database
     *
     * @param {object} e - the event object
     */
    async onDeleteProject(e) {
        e.preventDefault();
        this.setState({
            formData: {
                saving: true,
            },
        });
        const {
            formData: { projectId },
        } = this.state;
        const res = await this.props.deleteProject(projectId);
        if (res) {
            await this.props.loadAllProjects();
            const { projectArray } = this.props;
            this.setState({
                formData: {
                    saving: false,
                },
                projects: projectArray,
                displayDeleteProjectWindow: false,
            });
        }
    }

    /**
     * Deletes the selected project from the user's
     * collaborations list in the database
     *
     * @param {object} e - the event object
     */
    async onDeleteCollaborate(e) {
        e.preventDefault();
        this.setState({
            formData: {
                savingCollaborate: true,
            },
        });
        const {
            formData: { projectId },
        } = this.state;
        const { user } = this.props;
        const res = await this.props.deleteCollaborator(
            projectId,
            user.profile.displayName
        );
        if (res) {
            await this.props.getUserCollaborations();
            const { userCollaborationsArray } = this.props;
            this.setState({
                formData: {
                    savingCollaborate: false,
                },
                displayCollaborateDeleteWindow: false,
                userCollaborations: userCollaborationsArray,
            });
        }
    }

    render() {
        const { user, history } = this.props;
        const {
            displayEditWindow,
            editField,
            editName,
            deleteID,
            projects,
            userCollaborations,
            formData: {
                projectTitle,
                projectGenres,
                projectDescription,
                saving,
                savingCollaborate,
            },
            displayProjectEditWindow,
            displayDeleteProjectWindow,
            displayCollaborateDeleteWindow,
            loading,
        } = this.state;

        return (
            <main className='profile-container'>
                <MobileNav />
                <SidePanel />
                <UserInfo
                    user={user}
                    displayEditWindow={displayEditWindow}
                    editField={editField}
                    editName={editName}
                    deleteID={deleteID}
                    projects={projects}
                    userCollaborations={userCollaborations}
                    history={history}
                    displayProjectEditWindow={displayProjectEditWindow}
                    displayDeleteProjectWindow={displayDeleteProjectWindow}
                    displayCollaborateDeleteWindow={
                        displayCollaborateDeleteWindow
                    }
                    projectTitle={projectTitle}
                    projectGenres={projectGenres}
                    projectDescription={projectDescription}
                    loading={loading}
                    onClickProject={this.onClickProject}
                    onSubmitProject={this.onSubmitProject}
                    saving={saving}
                    savingCollaborate={savingCollaborate}
                    inputField={this.inputField}
                    onChange={this.onChange}
                    onClick={this.onClick}
                    openDeleteProjectWindow={this.openDeleteProjectWindow}
                    removeDeleteProjectWindow={this.removeDeleteProjectWindow}
                    openCollaborateDeleteWindow={
                        this.openCollaborateDeleteWindow
                    }
                    removeCollaborateDeleteWindow={
                        this.removeCollaborateDeleteWindow
                    }
                    cancelEdit={this.cancelEdit}
                    onDeleteProject={this.onDeleteProject}
                    onDeleteCollaborate={this.onDeleteCollaborate}
                    deleteData={this.deleteData}
                    onClickName={this.onClickName}
                    onSubmitAbout={this.onSubmitAbout}
                    onSubmitAuthors={this.onSubmitAuthors}
                    onSubmitBooks={this.onSubmitBooks}
                />
            </main>
        );
    }
}

Profile.propTypes = {
    user: PropTypes.object,
    projectArray: PropTypes.array,
    userCollaborationsArray: PropTypes.array,
    updateUserProfile: PropTypes.func.isRequired,
    loadAllProjects: PropTypes.func.isRequired,
    updateProjectDetails: PropTypes.func.isRequired,
    getUserCollaborations: PropTypes.func.isRequired,
    clearFileData: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    deleteCollaborator: PropTypes.func.isRequired,
};

const setProps = (state) => ({
    user: state.auth.user,
    projectArray: state.documents.projectArray,
    userCollaborationsArray: state.documents.userCollaborationsArray,
});

export default connect(setProps, {
    updateUserProfile,
    loadAllProjects,
    updateProjectDetails,
    getUserCollaborations,
    clearFileData,
    deleteProject,
    deleteCollaborator,
})(withRouter(Profile));
