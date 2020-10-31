import axios from "axios";

import {
    FILE_FAILED,
    FILE_LOADED,
    FILE_LOAD_FAILED,
} from "../actions/event-types";

/**
 * Saves the content of a file being edited in the
 * workspace by a user
 *
 * @param {String} content  - the new content
 * @param {Object} fileData - the file to update
 */
export const updateFile = (content, fileData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ content, fileData });
        const res = await axios.post("/api/files/save", body, config);
        dispatch({
            type: FILE_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: FILE_FAILED,
        });
    }
};

/**
 * Loads a file into the workspace so it can be
 * edited by the user
 *
 * @param {String} fileId - id of the file to load
 */
export const loadFile = (fileId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/files/${fileId}`);
        dispatch({
            type: FILE_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: FILE_LOAD_FAILED,
        });
    }
};

/**
 * Clears any file data out of Redux
 */
export const clearFileData = () => (dispatch) => {
    dispatch({
        type: FILE_FAILED,
    });
};
