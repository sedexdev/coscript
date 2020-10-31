import axios from "axios";

import { displayAlert } from "../actions/alertpopup";

import {
    CREATE_SUCCESS,
    CREATE_FAILED,
    PROJECT_LOADED,
    LOAD_FAILED,
    PROJECT_ARRAY_LOADED,
    PROJECT_ARRAY_FAILED,
    COLLABORATORS_ARRAY_LOADED,
    COLLABORATORS_ARRAY_FAILED,
    USER_COLLABORATIONS_LOADED,
    USER_COLLABORATIONS_FAILED,
    USER_PROJECT_DELETED,
    COLLABORATOR_PROJECT_DELETED,
    PROJECT_DELETE_FAILED,
    SAVE_DRAFT,
    USER_ADDED,
    ADD_USER_FAILED,
    SAVE_FAILED,
} from "./event-types";

const config = {
    headers: {
        "content-type": "application/json",
    },
};

/**
 * Creates a new Document instance in the database using
 * the details provided
 *
 * @param {Object} param0 - Object containing the details
 *                          for the new project
 */
export const createNewProject = ({
    title,
    genres,
    description,
    image,
}) => async (dispatch) => {
    try {
        const body = JSON.stringify({ title, genres, description, image });
        const res = await axios.post("api/projects", body, config);
        dispatch({
            type: CREATE_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: CREATE_FAILED,
        });
    }
};

/**
 * Loads the user's most recently opened project into
 * the workspace
 */
export const getMostRecentProject = () => async (dispatch) => {
    try {
        const res = await axios.get("api/projects", null, config);
        dispatch({
            type: PROJECT_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: LOAD_FAILED,
        });
    }
};

/**
 * Loads the user's project into the frontend of the
 * application so the details can be displayed
 *
 * @param {Object} project - Object containing the project
 *                           details
 */
export const loadProject = (project) => async (dispatch) => {
    try {
        const body = JSON.stringify({ project });
        const res = await axios.post("/api/projects/loadproject", body, config);
        dispatch({
            type: PROJECT_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: LOAD_FAILED,
        });
    }
};

/**
 * Load all projects in the database into the frontend
 */
export const loadAllProjects = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/projects/loadprojects", null, config);
        dispatch({
            type: PROJECT_ARRAY_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROJECT_ARRAY_FAILED,
        });
    }
};

/**
 * Saves the text entered by the user into the workspace
 * in the correct Document instance in the database
 *
 * @param {String} content     - the project text
 * @param {Object} projectData - the project's data
 */
export const saveDraft = (content, projectData) => async (dispatch) => {
    try {
        const body = JSON.stringify({ content, projectData });
        const res = await axios.put("/api/projects/save", body, config);
        dispatch({
            type: SAVE_DRAFT,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: SAVE_FAILED,
        });
    }
};

/**
 * Update the details of a project from within
 * the user profile section of the application
 *
 * @param {Object} data - the new project details
 */
export const updateProjectDetails = (data) => async (dispatch) => {
    try {
        const body = JSON.stringify({ data });
        const res = await axios.put("/api/projects/update", body, config);
        dispatch({
            type: SAVE_DRAFT,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: SAVE_FAILED,
        });
    }
};

/**
 * Saves the current date in the Document instance
 * in the database to mark this project as the user's
 * most recent project
 *
 * @param {Object} project - the project to update
 */
export const saveDate = (project) => async (dispatch) => {
    try {
        const body = JSON.stringify({ project });
        const res = await axios.put("/api/projects/date", body, config);
        dispatch({
            type: SAVE_DRAFT,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: SAVE_FAILED,
        });
    }
};

/**
 * Publishes a project to the application so it can
 * it is visible in the 'Published' section
 *
 * @param {Object} project - the project to publish
 */
export const publishProject = (project) => async (dispatch) => {
    try {
        const body = JSON.stringify({ project });
        const res = await axios.put("/api/projects/publish", body, config);
        dispatch({
            type: SAVE_DRAFT,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: SAVE_FAILED,
        });
    }
};

/**
 * Adds a user as a collaborator on a given project. Sends a
 * message to the requesting user upon successfully adding
 * the user to the project
 *
 * @param {String} collaboratorId - id of the user to add
 * @param {String} userId         - id of the logged-in user
 * @param {String} sendersName    - name of the user to add
 * @param {String} projectId      - id of the project
 * @param {String} projectTitle   - title of the project
 */
export const addCollaborator = (
    collaboratorId,
    userId,
    sendersName,
    projectId,
    projectTitle
) => async (dispatch) => {
    try {
        const body = JSON.stringify({ collaboratorId, projectId });
        const res = await axios.put("/api/projects/add", body, config);
        dispatch({
            type: USER_ADDED,
            payload: res.data,
        });
        if (res.data.userId) {
            const success = await sendCollaborateMsg(
                userId,
                collaboratorId,
                projectTitle
            );
            if (success) {
                dispatch(
                    displayAlert(
                        `${sendersName} was added to ${projectTitle}`,
                        "success"
                    )
                );
                return true;
            }
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => {
                dispatch(displayAlert(error, "danger"));
            });
        }
        dispatch({
            type: ADD_USER_FAILED,
        });
        return false;
    }
};

/**
 * Sends a message of congratulations to a user who has
 * just successfully been added to a project as a
 * collaborator
 *
 * @param {String} userId       - id of logged-in user
 * @param {String} friendId     - id of collaborator
 * @param {String} projectTitle - title of the project
 */
const sendCollaborateMsg = async (userId, friendId, projectTitle) => {
    try {
        const msgText = `Congratulations! You have been added as a collaborator on ${projectTitle}.\nSo how does collaborating on CoScript work?\nYou will notice that the file panel contains two folders, one called 'Master' and one with your current display name (you can change this if you like).\nYou will not be able to to edit the Master file, for collaborators the file is read only. The current concept is that you can make the edits and drafts you want to see added to the project in files under your own folder. Then you can discuss the proposed drafts with your group and when the project creator is happy, they can add your work to the Master file.\nThis is a work in progress and may be adapted at a later stage, please keep an eye on your emails and messages for future updates.\nHappy CoScripting :)`;
        const body = JSON.stringify({
            msgText,
            userId,
            friendId,
            projectTitle,
        });
        await axios.post("/api/messages/response", body, config);
        return true;
    } catch (err) {
        return false;
    }
};

/**
 * Gets an array containing data on each project collaborator
 * by checking the database for their data using their id
 *
 * @param {Array} collaboratorIds - ids of all project collaborators
 */
export const getProjectCollaborators = (collaboratorIds) => async (
    dispatch
) => {
    try {
        const body = JSON.stringify({ collaboratorIds });
        const res = await axios.post(
            "/api/projects/collaborators",
            body,
            config
        );
        dispatch({
            type: COLLABORATORS_ARRAY_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: COLLABORATORS_ARRAY_FAILED,
        });
    }
};

/**
 * Get all projects that a user collaborates on
 */
export const getUserCollaborations = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/projects/collaborations");
        dispatch({
            type: USER_COLLABORATIONS_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: USER_COLLABORATIONS_FAILED,
        });
    }
};

/**
 * Clear any project data that is currently loaded
 * into Redux
 */
export const clearProjectData = () => (dispatch) => {
    dispatch({
        type: LOAD_FAILED,
    });
};

/**
 * Deletes a project from the database, including the
 * chat room, all files and folders, as well as updating
 * all associated user profiles
 *
 * @param {String} projectId - id of the project
 */
export const deleteProject = (projectId) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/projects/delete/${projectId}`);
        dispatch({
            type: USER_PROJECT_DELETED,
            payload: res.data,
        });
        dispatch(displayAlert("Project deleted", "success"));
        dispatch({
            type: LOAD_FAILED,
        });
        return true;
    } catch (err) {
        dispatch({
            type: PROJECT_DELETE_FAILED,
        });
        return false;
    }
};

/**
 * Removes a user from a project, including the all the
 * user's files and folders, as well as updating the user's
 * profile
 *
 * @param {String} projectId - id of the project
 * @param {String} name      - name of the user
 */
export const deleteCollaborator = (projectId, name) => async (dispatch) => {
    try {
        const res = await axios.delete(
            `/api/projects/delete/${projectId}/collaborator`
        );
        dispatch({
            type: COLLABORATOR_PROJECT_DELETED,
            payload: res.data.userProjects,
        });
        await sendGroupMessage(
            res.data.projectCollaboratorIds,
            projectId,
            name,
            "collaborator_left"
        );
        dispatch(displayAlert("You left the project", "success"));
        return true;
    } catch (err) {
        dispatch({
            type: PROJECT_DELETE_FAILED,
        });
        return false;
    }
};

/**
 * Sends a group message out to all users collaborating
 * on the same project
 *
 * @param {Array} collaboratorIds - all project members
 * @param {Array} projectId       - the project id
 * @param {String} name           - name of the user
 * @param {String} subject        - subject of the message
 */
const sendGroupMessage = async (collaboratorIds, projectId, name, subject) => {
    try {
        const msgText = `${name} has left the project. This means that all the folders and files have been deleted and cannot be recovered at this time. This process will be greatly improved in a near future release of CoScript. Happy scripting :)`;
        const body = JSON.stringify({
            collaboratorIds,
            projectId,
            msgText,
            subject,
        });
        await axios.post("/api/messages/group", body, config);
    } catch (err) {
        console.log(err);
    }
};
