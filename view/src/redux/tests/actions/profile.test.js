import configureMockSore from "redux-mock-store";
import moxios from "moxios";
import thunk from "redux-thunk";
import uuid from "uuid";

import {
    PROFILE_UPDATE,
    PROFILE_UPDATE_FAILED,
    LOADED_USER_PROFILE,
    AUTHENTICATION_ERROR,
    SHOW_ALERT,
} from "../../actions/event-types";

import {
    updateUserProfile,
    loadUserProfile,
    sendMessage,
    sendFriendRequest,
    setMessageRead,
    addFriend,
    blockUser,
} from "../../actions/profile";

const userData = require("./data/auth/user.json");
const profileData = require("./data/profile/profile.json");

const middleware = [thunk];
const mockStore = configureMockSore(middleware);

describe("updateUserProfile action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires PROFILE_UPDATE action type if profile is updated successfully", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: userData,
            });
        });

        const expectedActions = [{ type: PROFILE_UPDATE, payload: userData }];
        const store = mockStore({ payload: {} });

        await store.dispatch(updateUserProfile());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires PROFILE_UPDATE_FAILED action type if profile update failed", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 401,
                response: null,
            });
        });

        const expectedActions = [{ type: PROFILE_UPDATE_FAILED }];
        const store = mockStore();

        await store.dispatch(updateUserProfile());
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("loadUserProfile action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires LOADED_USER_PROFILE action type if profile is loaded successfully", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: profileData,
            });
        });

        const expectedActions = [
            {
                type: LOADED_USER_PROFILE,
                payload: profileData,
            },
        ];
        const store = mockStore({ payload: {} });

        await store.dispatch(loadUserProfile());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires AUTHENTICATION_ERROR action type if profile load failed", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 401,
                response: null,
            });
        });

        const expectedActions = [{ type: AUTHENTICATION_ERROR }];
        const store = mockStore();

        await store.dispatch(loadUserProfile());
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("sendMessage action", () => {
    let messages;
    beforeEach(() => {
        messages = [
            "Message 1",
            "Message 2",
            "Message 3",
            "Message 4",
            "Message 5",
        ];
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires PROFILE_UPDATE action type if message sent successfully", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: messages,
            });
        });

        const id = uuid.v4();

        const expectedActions = [
            {
                type: PROFILE_UPDATE,
                payload: messages,
            },
            {
                type: SHOW_ALERT,
                payload: {
                    alertType: "success",
                    id: id,
                    msg: "Message sent!",
                },
            },
        ];
        const store = mockStore({ payload: {} });

        await store.dispatch(sendMessage());
        store.getActions()[1].payload.id = id;
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires PROFILE_UPDATE_FAILED action type if message failed", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: {
                    errors: ["This user has blocked you from contacting them"],
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
                    msg: "This user has blocked you from contacting them",
                },
            },
            { type: PROFILE_UPDATE_FAILED },
        ];

        const store = mockStore();

        await store.dispatch(sendMessage());
        store.getActions()[0].payload.id = id;
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("sendFriendRequest action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires PROFILE_UPDATE action type if profile is friend request sent successfully", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: userData,
            });
        });

        const id = uuid.v4();

        const expectedActions = [
            {
                type: PROFILE_UPDATE,
                payload: userData,
            },
            {
                type: SHOW_ALERT,
                payload: {
                    alertType: "success",
                    id: id,
                    msg: "Request sent!",
                },
            },
        ];
        const store = mockStore({ payload: {} });

        await store.dispatch(sendFriendRequest());
        store.getActions()[1].payload.id = id;
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires PROFILE_UPDATE_FAILED action type if friend request failed", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: {
                    errors: ["You are already friends with this user"],
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
                    msg: "You are already friends with this user",
                },
            },
            { type: PROFILE_UPDATE_FAILED },
        ];

        const store = mockStore();

        await store.dispatch(sendFriendRequest());
        store.getActions()[0].payload.id = id;
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("setMessageRead action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires PROFILE_UPDATE action type if message set to read successfully", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: userData,
            });
        });

        const expectedActions = [
            {
                type: PROFILE_UPDATE,
                payload: userData,
            },
        ];
        const store = mockStore({ payload: {} });

        await store.dispatch(setMessageRead());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires PROFILE_UPDATE_FAILED action type if set message to read failed", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const expectedActions = [{ type: PROFILE_UPDATE_FAILED }];

        const store = mockStore();

        await store.dispatch(setMessageRead());
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("addFriend action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires PROFILE_UPDATE action type if friend added successfully", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: userData,
            });
        });

        const expectedActions = [
            {
                type: PROFILE_UPDATE,
                payload: userData,
            },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(addFriend());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires PROFILE_UPDATE_FAILED action type if friend adding failed", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: {
                    errors: ["You and this user are already friends"],
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
                    msg: "You and this user are already friends",
                },
            },
            { type: PROFILE_UPDATE_FAILED },
        ];

        const store = mockStore();

        await store.dispatch(addFriend());
        store.getActions()[0].payload.id = id;
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("blockUser action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires PROFILE_UPDATE action type if blocked user successfully", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: userData,
            });
        });

        const expectedActions = [
            {
                type: PROFILE_UPDATE,
                payload: userData,
            },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(blockUser());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires PROFILE_UPDATE_FAILED action type if blocking user failed", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: {
                    errors: ["You cannot block yourself"],
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
                    msg: "You cannot block yourself",
                },
            },
            { type: PROFILE_UPDATE_FAILED },
        ];

        const store = mockStore();

        await store.dispatch(blockUser());
        store.getActions()[0].payload.id = id;
        expect(store.getActions()).toEqual(expectedActions);
    });
});
