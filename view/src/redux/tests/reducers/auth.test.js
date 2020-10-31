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
} from "../../actions/event-types";
import authReducer from "../../reducers/auth";

const userData = require("./data/auth/user.json");
const userProfileData = require("./data/auth/userProfile.json");
const regUserData = require("./data/auth/regUser.json");

describe("auth reducer", () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            regToken: null,
            loading: true,
            regUser: null,
            user: null,
            userProfile: null,
        };
    });

    it("should return initial state by default", () => {
        const action = {
            type: undefined,
        };
        expect(authReducer(initialState, action)).toEqual(initialState);
    });

    it("should handle LOGIN_SUCCEEDED action", () => {
        const action = {
            type: LOGIN_SUCCEEDED,
            payload: userData,
        };
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            loading: false,
            regUser: null,
            regToken: null,
            user: userData,
        });
    });

    it("should handle LOGIN_FAILED action", () => {
        const action = { type: LOGIN_FAILED };
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            loading: false,
            regToken: null,
            user: null,
            userProfile: null,
        });
    });

    it("should handle LOGGED_OUT action", () => {
        const action = { type: LOGGED_OUT };
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            loading: false,
            regUser: null,
            regToken: null,
            user: null,
            userProfile: null,
        });
    });

    it("should handle PRE_REGISTER_STARTED action", () => {
        const token = "8237818y1gd713yg8y23i231iu8ug8uhkaj987dhicb";
        const action = {
            type: PRE_REGISTER_STARTED,
            payload: token,
        };
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            loading: false,
            user: null,
            regToken: token,
        });
    });

    it("should handle REGISTER_SUCCEEDED action", () => {
        const action = {
            type: REGISTER_SUCCEEDED,
            payload: regUserData,
        };
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            loading: false,
            regToken: null,
            regUser: regUserData,
        });
    });

    it("should handle REGISTER_FAILED action", () => {
        const action = { type: REGISTER_FAILED };
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            loading: false,
            user: null,
            userProfile: null,
        });
    });

    it("should handle PROFILE_UPDATE action", () => {
        const action = {
            type: PROFILE_UPDATE,
            payload: userData,
        };
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            loading: false,
            regUser: null,
            regToken: null,
            user: userData,
        });
    });

    it("should handle PROFILE_UPDATE_FAILED action", () => {
        const action = { type: PROFILE_UPDATE_FAILED };
        expect(authReducer(initialState, action)).toEqual(initialState);
    });

    it("should handle ACCOUNT_UPDATE action", () => {
        const action = {
            type: ACCOUNT_UPDATE,
            payload: userData,
        };
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            loading: false,
            regUser: null,
            regToken: null,
            user: userData,
        });
    });

    it("should handle ACCOUNT_UPDATE_FAILED action", () => {
        const action = { type: ACCOUNT_UPDATE_FAILED };
        expect(authReducer(initialState, action)).toEqual(initialState);
    });

    it("should handle LOADED_USER action", () => {
        const action = {
            type: LOADED_USER,
            payload: userData,
        };
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            loading: false,
            regUser: null,
            regToken: null,
            user: userData,
        });
    });

    it("should handle LOADED_USER_PROFILE action", () => {
        const action = {
            type: LOADED_USER_PROFILE,
            payload: userProfileData,
        };
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            userProfile: userProfileData,
        });
    });

    it("should handle AUTHENTICATION_ERROR action", () => {
        const action = { type: AUTHENTICATION_ERROR };
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            loading: false,
            user: null,
            userProfile: null,
        });
    });

    it("should handle DELETE_USER action", () => {
        const action = { type: DELETE_USER };
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            loading: false,
            user: null,
            userProfile: null,
        });
    });

    it("should handle DELETE_FAILED action", () => {
        const action = { type: DELETE_FAILED };
        expect(authReducer(initialState, action)).toEqual(initialState);
    });
});
