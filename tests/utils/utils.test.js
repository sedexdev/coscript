const user = require("../data/user.json");

const setSessionData = require("../../utils/session-data");

let sessionObj;
beforeEach(() => {
    sessionObj = {
        userId: user.id,
        avatar: user.avatar,
        name: user.name,
        username: user.username,
        passwordHistory: user.passwordHistory,
        email: user.email,
        profile: user.profile,
        isRegistered: user.isRegistered,
        isLoggedIn: true,
        authToken: user.authToken
    };
});

describe("setSessionData", () => {
    it("should return an object populated with the user's data", () => {
        expect(setSessionData(user)).toEqual(sessionObj);
    });
});
