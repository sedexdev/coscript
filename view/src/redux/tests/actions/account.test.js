import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import uuid from "uuid";
import {
    ACCOUNT_UPDATE,
    ACCOUNT_UPDATE_FAILED,
    SHOW_ALERT,
} from "../../actions/event-types";
import { updateUserEmail, updatePassword } from "../../actions/account";

const sessionUser = require("./data/account/sessionUser.json");
const passwordUpdateSessionUser = require("./data/account/passwordUpdateSessionUser.json");
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("updateUserEmail action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires ACCOUNT_UPDATE action type after successfully updating the account", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: sessionUser,
            });
        });

        const id = uuid.v4();

        const expectedActions = [
            { type: ACCOUNT_UPDATE, payload: sessionUser },
            {
                type: SHOW_ALERT,
                payload: {
                    alertType: "success",
                    id: id,
                    msg: "Email updated",
                },
            },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(updateUserEmail());
        store.getActions()[1].payload.id = id;
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires ACCOUNT_UPDATE_FAILED after failing to update the account", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: { errors: [{ msg: "Please enter a valid email" }] },
            });
        });

        const id = uuid.v4();

        const expectedActions = [
            {
                type: SHOW_ALERT,
                payload: {
                    alertType: "danger",
                    id: id,
                    msg: "Please enter a valid email",
                },
            },
            { type: ACCOUNT_UPDATE_FAILED },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(updateUserEmail());
        store.getActions()[0].payload.id = id;
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("updatePassword action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires ACCOUNT_UPDATE when the password is successfully updated", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: passwordUpdateSessionUser,
            });
        });

        const id = uuid.v4();

        const expectedActions = [
            { type: ACCOUNT_UPDATE, payload: passwordUpdateSessionUser },
            {
                type: SHOW_ALERT,
                payload: {
                    alertType: "success",
                    id: id,
                    msg: "Password updated, redirecting...",
                },
            },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(updatePassword());
        store.getActions()[1].payload.id = id;
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires ACCOUNT_UPDATE_FAILED after failing to update the account", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: {
                    errors: [{ msg: "Password must be 8 or more characters" }],
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
                    msg: "Password must be 8 or more characters",
                },
            },
            { type: ACCOUNT_UPDATE_FAILED },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(updateUserEmail());
        store.getActions()[0].payload.id = id;
        expect(store.getActions()).toEqual(expectedActions);
    });
});
