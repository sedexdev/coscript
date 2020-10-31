import {
    CHAT_ROOM_CREATED,
    CHAT_ROOM_FAILED,
    CHAT_LOADED,
    CHAT_LOAD_FAILED,
    CHAT_MESSAGE_SENT,
    CHAT_MESSAGE_FAILED,
} from "../../actions/event-types";
import chatReducer from "../../reducers/chat";

const chatData = require("./data/chat/chat.json");

describe("chat reducer", () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            messages: null,
        };
    });

    it("should return initial state by default", () => {
        const action = {
            type: undefined,
        };
        expect(chatReducer(initialState, action)).toEqual(initialState);
    });

    it("should handle CHAT_ROOM_CREATED action", () => {
        const action = {
            type: CHAT_ROOM_CREATED,
        };
        expect(chatReducer(initialState, action)).toEqual(initialState);
    });

    it("should handle CHAT_ROOM_FAILED action", () => {
        const action = {
            type: CHAT_ROOM_FAILED,
        };
        expect(chatReducer(initialState, action)).toEqual({
            ...initialState,
            messages: null,
        });
    });

    it("should handle CHAT_LOADED action", () => {
        const action = {
            type: CHAT_LOADED,
            payload: chatData,
        };
        expect(chatReducer(initialState, action)).toEqual({
            ...initialState,
            messages: chatData,
        });
    });

    it("should handle CHAT_LOAD_FAILED action", () => {
        const action = {
            type: CHAT_LOAD_FAILED,
        };
        expect(chatReducer(initialState, action)).toEqual({
            ...initialState,
            messages: null,
        });
    });

    it("should handle CHAT_MESSAGE_SENT action", () => {
        const action = {
            type: CHAT_MESSAGE_SENT,
        };
        expect(chatReducer(initialState, action)).toEqual(initialState);
    });

    it("should handle CHAT_MESSAGE_FAILED action", () => {
        const action = {
            type: CHAT_MESSAGE_FAILED,
        };
        expect(chatReducer(initialState, action)).toEqual({
            ...initialState,
            messages: null,
        });
    });
});
