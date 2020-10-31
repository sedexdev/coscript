import {
    CHAT_ROOM_CREATED,
    CHAT_ROOM_FAILED,
    CHAT_LOADED,
    CHAT_LOAD_FAILED,
    CHAT_MESSAGE_SENT,
    CHAT_MESSAGE_FAILED
} from "../actions/event-types";

const initialState = {
    messages: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CHAT_LOADED:
            return {
                ...state,
                messages: payload
            };
        case CHAT_ROOM_FAILED:
        case CHAT_LOAD_FAILED:
        case CHAT_MESSAGE_FAILED:
            return {
                ...state,
                messages: null
            };
        case CHAT_ROOM_CREATED:
        case CHAT_MESSAGE_SENT:
        default:
            return state;
    }
}
