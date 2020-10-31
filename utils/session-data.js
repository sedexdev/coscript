/**
 * Extracts the data from the user object and
 * creates a new object that represents the session
 * data for the current user. The session data is
 * then ready to be stored in the database
 *
 * @param {Object} user - currently logged-in user's details
 */
const setSessionData = (user) => {
    return {
        userId: user.id,
        avatar: user.avatar,
        name: user.name,
        username: user.username,
        passwordHistory: user.passwordHistory,
        email: user.email,
        profile: user.profile,
        isRegistered: user.isRegistered,
        isLoggedIn: true,
        authToken: user.authToken,
    };
};

module.exports = setSessionData;
