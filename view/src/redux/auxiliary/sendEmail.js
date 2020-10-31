const axios = require("axios");

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

/**
 * Sends an email to a user
 *
 * @param {String} email - user's email
 * @param {String} subject - the email subject
 * @param {String} source - process that initiated
 *                          the email being sent
 */
export const sendEmail = async (email, subject, source) => {
    let data;
    await axios
        .post(
            "/api/email/send",
            JSON.stringify({ email, subject, source }),
            config
        )
        .then((result) => (data = result))
        .catch((error) => console.log(error));
    return data;
};

/**
 * Send the user an email with a code they can use to
 * access a section of their account where they can
 * change their password
 *
 * @param {String} email - user's email
 */
export const sendPWEmail = async (email) => {
    let data;
    await axios
        .post("/api/email/send/changepw", JSON.stringify({ email }), config)
        .then((result) => (data = result))
        .catch((error) => console.log(error));
    return data;
};

/**
 * Verify the code a user has entered in order to
 * be granted access to the section of the application
 * that let's them change their password
 *
 * @param {Object} param0 - object containing the codes
 *                          needed to start changing a
 *                          user's password
 */
export const verifyPWCode = async ({
    originalCode,
    confirmCode,
    forgottenDetails,
}) => {
    const res = await axios.post(
        "/api/email/verify",
        JSON.stringify({ originalCode, confirmCode, forgottenDetails }),
        config
    );
    if (res.data.success) {
        return { success: true, msg: "" };
    }
    return { success: false, msg: "Code does not match" };
};

/**
 * Sends a username reminder and a temporary
 * password to a user who has forgotten their
 * login credentials. This email is only sent
 * after they have correctly entered the code
 * sent to them when they requested to change
 * their password
 *
 * @param {String} email -user's email
 */
export const sendTempCredentialsEmail = async (email) => {
    const res = await axios.post(
        "/api/email/send/reset",
        JSON.stringify({ email }),
        config
    );
    return res.data.success;
};
