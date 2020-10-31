import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";

import {
    CHAT_LOADED,
    CHAT_LOAD_FAILED,
    CHAT_MESSAGE_SENT,
    CHAT_MESSAGE_FAILED,
    CHAT_ROOM_CREATED,
    CHAT_ROOM_FAILED,
} from "../../actions/event-types";

import { getMessages, sendMessage, createChatRoom } from "../../actions/chat";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("getMessages action", () => {
    let messages, projectId;
    beforeEach(() => {
        messages = [
            "Message 1",
            "Message 2",
            "Message 3",
            "Message 4",
            "Message 5",
        ];
        projectId = "5e58667d902d38559c802b13";
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires CHAT_LOADED action type when fetching chat messages", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: messages,
            });
        });

        const expectedActions = [{ type: CHAT_LOADED, payload: messages }];

        const store = mockStore({ payload: {} });

        await store.dispatch(getMessages(projectId));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires CHAT_LOAD_FAILED action type when fetching chat messages failed", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const expectedActions = [{ type: CHAT_LOAD_FAILED }];

        const store = mockStore();

        await store.dispatch(getMessages(null));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("sendMessage action", () => {
    let messageData;
    beforeEach(() => {
        messageData = {
            userId: "5e58667d902d38559c802b13",
            text: "Test text",
            projectId: "5e58667d902d38559c802b13",
        };
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires CHAT_MESSAGE_SENT action type when successfully sending messages", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: { msg: "Message sent" },
            });
        });

        const expectedActions = [{ type: CHAT_MESSAGE_SENT }];

        const store = mockStore();

        await store.dispatch(sendMessage(messageData));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires CHAT_MESSAGE_FAILED action type when sending message fails", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const expectedActions = [{ type: CHAT_MESSAGE_FAILED }];

        const store = mockStore();

        await store.dispatch(sendMessage(null));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("getMessages action", () => {
    let projectId;
    beforeEach(() => {
        projectId = "5e58667d902d38559c802b13";
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires CHAT_ROOM_CREATED action type if chatroom creation is successful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: undefined,
            });
        });

        const expectedActions = [{ type: CHAT_ROOM_CREATED }];

        const store = mockStore();

        await store.dispatch(createChatRoom(projectId));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires CHAT_ROOM_FAILED action type if chatroom creation fails", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const expectedActions = [{ type: CHAT_ROOM_FAILED }];

        const store = mockStore();

        await store.dispatch(createChatRoom(null));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
