import {
    LOGIN_SUCCEEDED,
    LOGIN_FAILED,
    LOGGED_OUT,
    PRE_REGISTER_STARTED,
    REGISTER_SUCCEEDED,
    REGISTER_FAILED,
    PROFILE_UPDATE,
    PROFILE_UPDATE_FAILED,
    ACCOUNT_UPDATE,
    ACCOUNT_UPDATE_FAILED,
    LOADED_USER,
    LOADED_USER_PROFILE,
    AUTHENTICATION_ERROR,
    DELETE_USER,
    DELETE_FAILED,
} from "../actions/event-types";

const initialState = {
    regToken: null,
    loading: true,
    regUser: null,
    user: null,
    userProfile: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case PRE_REGISTER_STARTED:
            return {
                ...state,
                loading: false,
                user: null,
                regToken: payload,
            };
        case REGISTER_SUCCEEDED:
            return {
                ...state,
                loading: false,
                regToken: null,
                regUser: payload,
            };
        case LOGIN_SUCCEEDED:
        case PROFILE_UPDATE:
        case ACCOUNT_UPDATE:
        case LOADED_USER:
            return {
                ...state,
                loading: false,
                regUser: null,
                regToken: null,
                user: payload,
            };
        case LOADED_USER_PROFILE:
            return {
                ...state,
                userProfile: payload,
            };
        case LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                regToken: null,
                user: null,
                userProfile: null,
            };
        case REGISTER_FAILED:
        case AUTHENTICATION_ERROR:
        case DELETE_USER:
            return {
                ...state,
                loading: false,
                user: null,
                userProfile: null,
            };
        case LOGGED_OUT:
            return {
                ...state,
                loading: false,
                regUser: null,
                regToken: null,
                user: null,
                userProfile: null,
            };
        case DELETE_FAILED:
        case PROFILE_UPDATE_FAILED:
        case ACCOUNT_UPDATE_FAILED:
        default:
            return state;
    }
}
