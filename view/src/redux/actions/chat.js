import {
    CHAT_LOADED,
    CHAT_LOAD_FAILED,
    CHAT_MESSAGE_SENT,
    CHAT_MESSAGE_FAILED,
    CHAT_ROOM_CREATED,
    CHAT_ROOM_FAILED,
} from "../actions/event-types";

import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

/**
 * Gets all the chat messages for a project chat room
 *
 * @param {String} projectId - the id for the project the chat
 *                             room belongs to
 */
export const getMessages = (projectId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/chat/${projectId}`);
        dispatch({
            type: CHAT_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: CHAT_LOAD_FAILED,
        });
    }
};

/**
 * Sends a message to all other project collaborators
 * over the instant chat service in the workspace
 *
 * @param {String} userId     - logged-in user's id
 * @param {String} text       - the message text
 * @param {String} projectId  - the id of the project
 */
export const sendMessage = (userId, text, projectId) => async (dispatch) => {
    try {
        const body = JSON.stringify({ userId, text, projectId });
        await axios.post("/api/chat", body, config);
        dispatch({
            type: CHAT_MESSAGE_SENT,
        });
    } catch (err) {
        dispatch({
            type: CHAT_MESSAGE_FAILED,
        });
    }
};

/**
 * Creates a new ChatRoom instance in the database and
 * associates it with this project
 *
 * @param {String} projectId - the id of the project
 */
export const createChatRoom = (projectId) => async (dispatch) => {
    try {
        const body = JSON.stringify({ projectId });
        await axios.post("/api/chat/create", body, config);
        dispatch({
            type: CHAT_ROOM_CREATED,
        });
    } catch (err) {
        dispatch({
            type: CHAT_ROOM_FAILED,
        });
    }
};
