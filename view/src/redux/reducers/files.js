import {
    FILE_FAILED,
    FILE_LOADED,
    FILE_LOAD_FAILED
} from "../actions/event-types";

const initialState = {
    fileData: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case FILE_LOADED:
            return {
                ...state,
                fileData: payload
            };
        case FILE_FAILED:
        case FILE_LOAD_FAILED:
            return {
                ...state,
                fileData: null
            };
        default:
            return state;
    }
}
