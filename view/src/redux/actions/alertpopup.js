import uuid from "uuid";
import { SHOW_ALERT, DELETE_ALERT } from "./event-types";

/**
 * Displays an alert in the UI based on an action
 * that the user has just taken
 *
 * @param {String} msg
 * @param {String} alertType
 */
export const displayAlert = (msg, alertType) => (dispatch) => {
    const id = uuid.v4();
    dispatch({
        type: SHOW_ALERT,
        payload: { msg, alertType, id },
    });

    setTimeout(() => dispatch({ type: DELETE_ALERT, payload: id }), 4000);
};
