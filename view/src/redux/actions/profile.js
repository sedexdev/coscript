import axios from "axios";

import {
    PROFILE_UPDATE,
    PROFILE_UPDATE_FAILED,
    LOADED_USER_PROFILE,
    AUTHENTICATION_ERROR,
} from "./event-types";

import { displayAlert } from "../actions/alertpopup";

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

/**
 * Updates the logged-in user's personal profile
 * information in the database using the data passed
 * in
 *
 * @param {Object} profileData - the new profile data
 */
export const updateUserProfile = (profileData) => async (dispatch) => {
    try {
        const body = JSON.stringify(profileData);
        const res = await axios.post("/api/profile", body, config);
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({ type: PROFILE_UPDATE_FAILED });
    }
};

/**
 * Loads the profile data for the currently logged
 * -in user into the frontend
 *
 * @param {String} userId - id of the logged-in user
 */
export const loadUserProfile = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/${userId}`);
        dispatch({
            type: LOADED_USER_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTHENTICATION_ERROR,
        });
    }
};

/**
 * Sends a personal message to a user's profile
 * messages inbox
 *
 * @param {String} msgText      - the message text
 * @param {String} senderId     - id of the sending user
 * @param {String} projectTitle - title of the project
 * @param {String} projectId    - id of the project
 * @param {String} recipientId  - id of the message recipient
 */
export const sendMessage = (
    msgText,
    senderId,
    projectTitle,
    projectId,
    recipientId
) => async (dispatch) => {
    try {
        const body = JSON.stringify({
            msgText,
            senderId,
            projectTitle,
            projectId,
            recipientId,
        });
        const res = await axios.post("/api/messages", body, config);
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data,
        });
        dispatch(displayAlert("Message sent!", "success"));
        if (res.data.userId) return true;
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => {
                dispatch(displayAlert(error, "danger"));
            });
        }
        dispatch({
            type: PROFILE_UPDATE_FAILED,
        });
        return false;
    }
};

/**
 * Sends a message to a user's profile messages
 * inbox containing a friend request
 *
 * @param {String} msgText  - the message text
 * @param {String} senderId - id of the sending user
 * @param {String} friendId - id of the user they want
 *                            to be friends with
 */
export const sendFriendRequest = (msgText, senderId, friendId) => async (
    dispatch
) => {
    try {
        const body = JSON.stringify({ msgText, senderId, friendId });
        const res = await axios.post("/api/messages/request", body, config);
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data,
        });
        dispatch(displayAlert("Request sent!", "success"));
        if (res.data.userId) return true;
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => {
                dispatch(displayAlert(error, "danger"));
            });
        }
        dispatch({
            type: PROFILE_UPDATE_FAILED,
        });
        return false;
    }
};

/**
 * Updates a profile messages read property to 'read'
 *
 * @param {String} messageId - id of the message to update
 */
export const setMessageRead = (messageId) => async (dispatch) => {
    try {
        const body = JSON.stringify({ messageId });
        const res = await axios.put("api/messages/set-read", body, config);
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_UPDATE_FAILED,
        });
    }
};

/**
 * Adds a user to another user's friend array under their
 * profile property in the database
 *
 * @param {String} userId       - id of the logged-in user
 * @param {String} friendId     - id of the requesting user
 * @param {String} friendName   - name of the requesting user
 * @param {String} projectTitle - title of the project
 */
export const addFriend = (userId, friendId, friendName, projectTitle) => async (
    dispatch
) => {
    try {
        const body = JSON.stringify({ userId, friendId });
        const res = await axios.put("/api/friends/add", body, config);
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data,
        });
        if (res.data.userId) {
            const success = await sendAcceptMsg(userId, friendId, projectTitle);
            if (success) {
                dispatch(
                    displayAlert(
                        `You and ${friendName} are now friends`,
                        "success"
                    )
                );
                return true;
            }
            return false;
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => {
                dispatch(displayAlert(error, "danger"));
            });
        }
        dispatch({
            type: PROFILE_UPDATE_FAILED,
        });
        return false;
    }
};

/**
 * Sends a message to a user's profile messages inbox
 * informing them that a friend request they made has
 * been accepted
 *
 * @param {String} userId       - id of the logged-in user
 * @param {String} friendId     - id of the requesting user
 * @param {String} projectTitle - title of the project
 */
const sendAcceptMsg = async (userId, friendId, projectTitle) => {
    try {
        const msgText = "Your friend request has been accepted";
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
 * Sends a message to a user's profile messages inbox
 * informing them that a friend request they made has
 * been rejected
 *
 * @param {String} userId   - id of the logged-in user
 * @param {String} friendId - id of the requesting user
 */
export const sendDeclineMsg = (userId, friendId) => async (dispatch) => {
    try {
        const msgText = "Sorry, your friend request has been declined";
        const body = JSON.stringify({ msgText, userId, friendId });
        await axios.post("/api/messages/response", body, config);
        dispatch(displayAlert("Message sent!", "success"));
        return true;
    } catch (err) {
        return false;
    }
};

/**
 * Adds a requesting user to a logged-in users blockedUsers
 * array in the logged-in user's profile property in the
 * database
 *
 * @param {String} userId     - id of the logged-in user
 * @param {String} friendId   - id of the requesting user
 * @param {String} friendName - name of the requesting user
 */
export const blockUser = (userId, friendId, friendName) => async (dispatch) => {
    try {
        const body = JSON.stringify({ friendId });
        const res = await axios.put("/api/friends/block", body, config);
        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data,
        });
        if (res.data.userId) {
            const success = await sendBlockMsg(userId, friendId, friendName);
            if (success) {
                dispatch(
                    displayAlert(
                        `Successfully blocked ${friendName}`,
                        "success"
                    )
                );
                return true;
            }
            return false;
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => {
                dispatch(displayAlert(error, "danger"));
            });
        }
        dispatch({
            type: PROFILE_UPDATE_FAILED,
        });
        return false;
    }
};

/**
 * Sends a message to a user's profile messages inbox
 * informing them that a user has blocked them from
 * all contact
 *
 * @param {String} userId   - id of the logged-in user
 * @param {String} friendId - id of the requesting user
 */
const sendBlockMsg = async (userId, friendId) => {
    try {
        const msgText = `You have been blocked from all communication with this user. Unblocking features are yet to be added to the app so you are permanently blocked for the forseeable future`;
        const body = JSON.stringify({ msgText, userId, friendId });
        await axios.post("/api/messages/response", body, config);
        return true;
    } catch (err) {
        return false;
    }
};
