import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import uuid from "uuid";
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
    SHOW_ALERT,
} from "../../actions/event-types";

import * as auth from "../../actions/auth";

const originalCompleteReg = auth.completeRegistration;

const user = require("./data/auth/user.json");
const registeredUser = require("./data/auth/registeredUser.json");
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("loadUser action", () => {
    global.HTMLMediaElement.prototype.pause = jest.fn();

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires LOADED_USER action type if the user was successfully loaded", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: user,
            });
        });

        const expectedActions = [
            {
                type: LOADED_USER,
                payload: user,
            },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(auth.loadUser());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires AUTHENTICATION_ERROR action type if user loading failed", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 401,
                response: "Bad request...",
            });
        });

        const expectedActions = [{ type: AUTHENTICATION_ERROR }];

        const store = mockStore();

        await store.dispatch(auth.loadUser());
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("startRegistration action", () => {
    global.HTMLMediaElement.prototype.pause = jest.fn();

    let userData;
    beforeEach(() => {
        userData = {
            email: "test@email.com",
            name: "Test Name",
            username: "test101",
            password: "password1234",
        };
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires PRE_REGISTER_STARTED action type if user successfully passes pre-registration", async () => {
        const token = "2873yr823rbjqbs21d38ygijnAZ193RY2382E1DSFqd12u1h21u8";
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: token,
            });
        });

        const expectedActions = [
            {
                type: PRE_REGISTER_STARTED,
                payload: token,
            },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(auth.startRegistration(userData));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires REGISTER_FAILED action type if pre-registration failed", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: {
                    errors: [{ msg: "Please enter a valid email address" }],
                },
            });
        });

        const id = uuid.v4();

        const expectedActions = [
            {
                type: SHOW_ALERT,
                payload: {
                    alertType: "danger",
                    id: id,
                    msg: "Please enter a valid email address",
                },
            },
            { type: REGISTER_FAILED },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(
            auth.startRegistration({
                ...userData,
                email: "test@email",
            })
        );
        store.getActions()[0].payload.id = id;
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("verifyEmail action", () => {
    let verifyData;
    beforeEach(() => {
        verifyData = {
            originalCode: "1234546",
            confirmCode: "1234546",
            token: "87618g1u8ojb98k3jb12i3kwdbcjwvbbi92ueg29eubv",
        };
        auth.completeRegistration = jest.fn(auth.completeRegistration);
        moxios.install();
    });

    afterEach(() => {
        auth.completeRegistration = originalCompleteReg;
        moxios.uninstall();
    });

    // it("calls completeRegistration function if successful", () => {
    //     moxios.wait(() => {
    //         const request = moxios.requests.mostRecent();
    //         request.respondWith({
    //             status: 200,
    //             response: { success: true },
    //         });
    //     });

    //     const store = mockStore({ payload: {} });

    //     setTimeout(async () => {
    //         await store.dispatch(auth.verifyEmail(verifyData));
    //         expect(auth.completeRegistration).toBeCalled();
    //     }, 500);
    // });

    it("returns failure message is verification codes did not match", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: { success: false },
            });
        });

        const store = mockStore();

        const result = await store.dispatch(auth.verifyEmail(verifyData));
        expect(result).toEqual({ msg: "Code did not match, please try again" });
    });

    it("fires REGISTER_FAILED event type if falsy values are passed in", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 401,
                response: null,
            });
        });

        verifyData.originalCode = null;
        verifyData.confirmCode = null;
        verifyData.token = null;

        const expectedActions = [{ type: REGISTER_FAILED }];

        const store = mockStore();

        await store.dispatch(auth.verifyEmail(verifyData));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("completeRegistration action", () => {
    let regData;
    beforeEach(() => {
        regData = {
            token: "87618g1u8ojb98k3jb12i3kwdbcjwvbbi92ueg29eubv",
        };
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires REGISTER_SUCCEEDED action type if registration was successful", () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: registeredUser,
            });
        });

        const expectedActions = [
            {
                type: REGISTER_SUCCEEDED,
                payload: registeredUser,
            },
        ];

        const store = mockStore({ payload: {} });

        setTimeout(() => {
            store.dispatch(auth.completeRegistration(regData));
            expect(store.getActions()).toEqual(expectedActions);
        }, 5000);
    });

    it("fires REGISTER_FAILED action type if registration was unsuccessful", () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: null,
            });
        });

        const expectedActions = [
            {
                type: REGISTER_FAILED,
                payload: null,
            },
        ];

        const store = mockStore({ payload: {} });

        setTimeout(() => {
            store.dispatch(auth.completeRegistration(regData));
            expect(store.getActions()).toEqual(expectedActions);
        }, 5000);
    });
});

describe("loginUser action", () => {
    let userData;
    beforeEach(() => {
        userData = {
            username: "user101",
            password: "password1234",
        };
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires LOGIN_SUCCEEDED event type on successful login", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: registeredUser,
            });
        });

        const expectedActions = [
            {
                type: LOGIN_SUCCEEDED,
                payload: registeredUser,
            },
        ];

        const store = mockStore({ payload: {} });

        const returnValue = await store.dispatch(auth.loginUser(userData));
        expect(store.getActions()).toEqual(expectedActions);
        expect(returnValue).toBe(true);
    });

    it("fires LOGIN_FAILED event type if login is unsuccessful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: {
                    errors: [{ msg: "Username is required" }],
                },
            });
        });

        const id = uuid.v4();

        const expectedActions = [
            {
                type: SHOW_ALERT,
                payload: {
                    alertType: "danger",
                    id: id,
                    msg: "Username is required",
                },
            },
            { type: LOGIN_FAILED },
        ];

        const store = mockStore({ payload: {} });

        userData.username = null;

        const returnValue = await store.dispatch(auth.loginUser(userData));
        store.getActions()[0].payload.id = id;
        expect(store.getActions()).toEqual(expectedActions);
        expect(returnValue).toBe(false);
    });
});

describe("deleteUser action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires DELETE_USER action type if successfully deleted user account", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: { msg: "Account deleted" },
            });
        });

        const expectedActions = [
            {
                type: DELETE_USER,
                payload: { msg: "Account deleted" },
            },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(auth.deleteUser("test@email.com"));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires DELETE_FAILED action type if account deletion failed", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const expectedActions = [
            {
                type: DELETE_FAILED,
            },
        ];

        const store = mockStore();

        await store.dispatch(auth.deleteUser("test@email.com"));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("logoutUser action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires LOGGED_OUT action type if users logged out", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: null,
            });
        });

        const expectedActions = [{ type: LOGGED_OUT }];

        const store = mockStore();

        await store.dispatch(auth.logoutUser());
        expect(store.getActions()).toEqual(expectedActions);
    });
});
