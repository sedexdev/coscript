import axios from "axios";

import { logoutUser } from "./auth";
import { displayAlert } from "./alertpopup";

import { ACCOUNT_UPDATE, ACCOUNT_UPDATE_FAILED } from "./event-types";

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

/**
 * Update the Users Email Address in the database
 *
 * @param {String} email - the user's email address
 */
export const updateUserEmail = (email) => async (dispatch) => {
    // Check for an upgrade to the users Gravatar with
    // the new email address
    try {
        const body = JSON.stringify(email);
        const res = await axios.post("/api/account", body, config);
        dispatch({
            type: ACCOUNT_UPDATE,
            payload: res.data,
        });
        dispatch(displayAlert("Email updated", "success"));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => {
                dispatch(displayAlert(error.msg, "danger"));
            });
        }
        dispatch({ type: ACCOUNT_UPDATE_FAILED });
    }
};

/**
 * Update the user's password in the database
 *
 * @param {String} password - user's new password
 */
export const updatePassword = (password) => async (dispatch) => {
    try {
        const body = JSON.stringify({ password });
        const res = await axios.post("/api/changepassword", body, config);
        dispatch({
            type: ACCOUNT_UPDATE,
            payload: res.data,
        });
        dispatch(displayAlert("Password updated, redirecting...", "success"));
        setTimeout(() => {
            dispatch(logoutUser());
        }, 3000);
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => {
                dispatch(displayAlert(error.msg, "danger"));
            });
        }
        dispatch({
            type: ACCOUNT_UPDATE_FAILED,
        });
    }
};
