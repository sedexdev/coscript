import axios from "axios";

/**
 * Gets all of a users personal profile messages
 */
export const getUserMessages = async () => {
    try {
        const res = await axios.get("/api/messages");
        return res.data;
    } catch (err) {
        return [];
    }
};

/**
 * Returns whether or not a user is an admin
 * user on this project
 *
 * @param {String} projectId - id of the project
 */
export const isAdmin = async (projectId) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ projectId });
        const res = await axios.post("/api/messages/is-admin", body, config);
        return res.data.admin;
    } catch (err) {
        return false;
    }
};
