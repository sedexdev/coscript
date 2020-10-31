const axios = require("axios");

/**
 * Compares a newly created password against
 * all items in a user's passwordHistory property
 * in the database
 *
 * @param {Object} user     - logged-in user
 * @param {String} password - new password
 */
export const comparePW = async (user, password) => {
    if (!password) return false;
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ user, password });
        const res = await axios.post("/api/changepassword/check", body, config);
        return res.data.clash;
    } catch (err) {
        return true;
    }
};

/**
 * Checks the user's current password to see if it
 * is correct before allowing the user to set a new
 * password
 *
 * @param {Object} user     - logged-in user
 * @param {String} password - user's current password
 */
export const checkCurrentPassword = async (user, password) => {
    if (!password) return false;
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ user, password });
        const res = await axios.post(
            "/api/changepassword/check/current",
            body,
            config
        );
        return res.data.correct;
    } catch (err) {
        return false;
    }
};
