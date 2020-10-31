import axios from "axios";

import { displayAlert } from "./alertpopup";
import { reduxStore } from "../store/reduxStore";

import { stopSoundEffect } from "../auxiliary/typing-sound-effect";

import {
    LOGIN_SUCCEEDED,
    LOGIN_FAILED,
    LOGGED_OUT,
    PRE_REGISTER_STARTED,
    REGISTER_SUCCEEDED,
    REGISTER_FAILED,
    LOADED_USER,
    AUTHENTICATION_ERROR,
    DELETE_USER,
    DELETE_FAILED,
} from "./event-types";

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

/**
 * Remove the initial registration code from
 * local storage once the user has successfully
 * completed registration
 */
const clearStorage = () => {
    localStorage.removeItem("originalCode");
};

/**
 * Load the current user into the frontend of
 * the application so their data can be used to
 * personalise the application
 */
export const loadUser = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/user");
        dispatch({
            type: LOADED_USER,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: AUTHENTICATION_ERROR,
        });
    }
};

/**
 * Pre-registration saves the user's signup data in the
 * database. While in pre-registration, the user can still
 * browse the app as long as the token they receive is
 * valid
 *
 * @param {Object} param0 - object containing the user's
 *                          registration data
 */
export const startRegistration = ({
    email,
    name,
    username,
    password,
}) => async (dispatch) => {
    try {
        const body = JSON.stringify({
            email,
            name,
            username,
            password,
        });
        const res = await axios.post(
            "/api/register/pre-register",
            body,
            config
        );
        dispatch({
            type: PRE_REGISTER_STARTED,
            payload: res.data,
        });
        return true;
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => {
                dispatch(displayAlert(error.msg, "danger"));
            });
        }
        dispatch({
            type: REGISTER_FAILED,
        });
        return false;
    }
};

/**
 * Verifies the user by comparing a code generated at pre-registration
 * with a code the user enters. The codes and the user's pre-registration
 * auth token are sent to the server to be compared. If the codes match,
 * the user registration is completed
 *
 * @param {Object} param0 - object containing the verification codes
 *                          and the user's auth token
 */
export const verifyEmail = ({ originalCode, confirmCode, token }) => async (
    dispatch
) => {
    try {
        const body = JSON.stringify({
            originalCode,
            confirmCode,
            registering: true,
        });
        const verified = await axios.post("/api/email/verify", body, config);
        if (verified.data.success) {
            completeRegistration(token);
        } else {
            return { msg: "Code did not match, please try again" };
        }
    } catch (err) {
        dispatch({
            type: REGISTER_FAILED,
        });
    }
};

/**
 * Register's a new User instance in the database using
 * the user's pre-registration data. Requires auth token
 * in order to be successful
 *
 * @param {String} token - user's registration auth token
 */
export const completeRegistration = async (token) => {
    try {
        const body = JSON.stringify({
            token,
        });
        const res = await axios.post("/api/register", body, config);
        reduxStore.dispatch({
            type: REGISTER_SUCCEEDED,
            payload: res.data,
        });
        clearStorage();
    } catch (err) {
        reduxStore.dispatch({
            type: REGISTER_FAILED,
        });
    }
};

/**
 * Checks the user's login credentials against
 * the database and logs the user into the
 * application if there is a match
 *
 * @param {String} username - user's username
 * @param {String} password - user's password
 */
export const loginUser = (username, password) => async (dispatch) => {
    const body = JSON.stringify({ username, password });
    try {
        const res = await axios.post("/api/login", body, config);
        dispatch({
            type: LOGIN_SUCCEEDED,
            payload: res.data,
        });
        dispatch(loadUser());
        return true;
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => {
                dispatch(displayAlert(error.msg, "danger"));
            });
        }
        dispatch({ type: LOGIN_FAILED });
        return false;
    }
};

/**
 * Deletes a user's entire account and all
 * associated data from the database
 *
 * @param {String} email - logged-in user's email
 */
export const deleteUser = (email) => async (dispatch) => {
    try {
        const res = await axios.delete("/api/account", {
            data: { email: email },
        });
        dispatch({
            type: DELETE_USER,
            payload: res.data,
        });
    } catch (err) {
        dispatch({ type: DELETE_FAILED });
    }
};

/**
 * Logs a user out of the application. Stops
 * playing the typewriter sound effect if the
 * user logged out while it was playing
 */
export const logoutUser = () => async (dispatch) => {
    stopSoundEffect();
    await axios.delete("/api/logout");
    dispatch({ type: LOGGED_OUT });
};
