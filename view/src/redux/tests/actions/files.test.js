import configureMockSore from "redux-mock-store";
import moxios from "moxios";
import thunk from "redux-thunk";

import {
    FILE_FAILED,
    FILE_LOADED,
    FILE_LOAD_FAILED,
} from "../../actions/event-types";

import { updateFile, loadFile, clearFileData } from "../../actions/files";

const fileData = require("./data/files/file.json");
const middleware = [thunk];
const mockStore = configureMockSore(middleware);

describe("updateFile action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires FILE_LOADED action type if file is updated successfully", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: fileData,
            });
        });

        const expectedActions = [{ type: FILE_LOADED, payload: fileData }];
        const store = mockStore({ payload: {} });

        await store.dispatch(updateFile());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires FILE_FAILED action type if file update failed", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 401,
                response: null,
            });
        });

        const expectedActions = [{ type: FILE_FAILED }];
        const store = mockStore();

        await store.dispatch(updateFile());
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("loadFile action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires FILE_LOADED action type if file is loaded successfully", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: fileData,
            });
        });

        const expectedActions = [{ type: FILE_LOADED, payload: fileData }];
        const store = mockStore({ payload: {} });

        await store.dispatch(loadFile());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires FILE_LOAD_FAILED action type if file load failed", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 401,
                response: null,
            });
        });

        const expectedActions = [{ type: FILE_LOAD_FAILED }];
        const store = mockStore();

        await store.dispatch(loadFile());
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("clearFileData action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires FILE_FAILED action type if file load failed", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 401,
                response: null,
            });
        });

        const expectedActions = [{ type: FILE_FAILED }];
        const store = mockStore();

        await store.dispatch(clearFileData());
        expect(store.getActions()).toEqual(expectedActions);
    });
});
