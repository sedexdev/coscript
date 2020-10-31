import { SHOW_ALERT, DELETE_ALERT } from "../actions/event-types";

const initialState = [];

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SHOW_ALERT:
            return [...state, payload];
        case DELETE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}
