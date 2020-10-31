import {
    CREATE_SUCCESS,
    CREATE_FAILED,
    PROJECT_LOADED,
    LOAD_FAILED,
    PROJECT_ARRAY_LOADED,
    PROJECT_ARRAY_FAILED,
    COLLABORATORS_ARRAY_LOADED,
    COLLABORATORS_ARRAY_FAILED,
    USER_COLLABORATIONS_LOADED,
    USER_COLLABORATIONS_FAILED,
    SAVE_DRAFT,
    USER_ADDED,
    ADD_USER_FAILED,
    SAVE_FAILED,
} from "../../actions/event-types";
import documentsReducer from "../../reducers/documents";

const collaboratorsArrayData = require("./data/documents/collaboratorsArray.json");
const userCollaborationsArrayData = require("./data/documents/userCollaborationsArray.json");
const projectsArrayData = require("./data/documents/projectsArray.json");
const projectData = require("./data/documents/project.json");

describe("documents reducer", () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            loading: true,
            projectData: null,
            projectArray: null,
            collaboratorsArray: null,
            userCollaborationsArray: null,
        };
    });

    it("should return initial state by default", () => {
        const action = {
            type: undefined,
        };
        expect(documentsReducer(initialState, action)).toEqual(initialState);
    });

    it("should handle CREATE_SUCCESS action", () => {
        const action = {
            type: CREATE_SUCCESS,
            payload: projectData,
        };
        expect(documentsReducer(initialState, action)).toEqual({
            ...initialState,
            projectData: projectData,
        });
    });

    it("should handle CREATE_FAILED action", () => {
        const action = { type: CREATE_FAILED };
        expect(documentsReducer(initialState, action)).toEqual({
            ...initialState,
            projectData: null,
            projectArray: null,
            collaboratorsArray: null,
            userCollaborationsArray: null,
        });
    });

    it("should handle PROJECT_LOADED action", () => {
        const action = {
            type: PROJECT_LOADED,
            payload: projectData,
        };
        expect(documentsReducer(initialState, action)).toEqual({
            ...initialState,
            loading: false,
            projectData: projectData,
        });
    });

    it("should handle LOAD_FAILED action", () => {
        const action = { type: LOAD_FAILED };
        expect(documentsReducer(initialState, action)).toEqual({
            ...initialState,
            projectData: null,
            projectArray: null,
            collaboratorsArray: null,
            userCollaborationsArray: null,
        });
    });

    it("should handle PROJECT_ARRAY_LOADED action", () => {
        const action = {
            type: PROJECT_ARRAY_LOADED,
            payload: projectsArrayData,
        };
        expect(documentsReducer(initialState, action)).toEqual({
            ...initialState,
            projectArray: projectsArrayData,
        });
    });

    it("should handle PROJECT_ARRAY_FAILED action", () => {
        const action = { type: PROJECT_ARRAY_FAILED };
        expect(documentsReducer(initialState, action)).toEqual({
            ...initialState,
            projectData: null,
            projectArray: null,
            collaboratorsArray: null,
            userCollaborationsArray: null,
        });
    });

    it("should handle COLLABORATORS_ARRAY_LOADED action", () => {
        const action = {
            type: COLLABORATORS_ARRAY_LOADED,
            payload: collaboratorsArrayData,
        };
        expect(documentsReducer(initialState, action)).toEqual({
            ...initialState,
            collaboratorsArray: collaboratorsArrayData,
        });
    });

    it("should handle COLLABORATORS_ARRAY_FAILED action", () => {
        const action = { type: COLLABORATORS_ARRAY_FAILED };
        expect(documentsReducer(initialState, action)).toEqual({
            ...initialState,
            projectData: null,
            projectArray: null,
            collaboratorsArray: null,
            userCollaborationsArray: null,
        });
    });

    it("should handle USER_COLLABORATIONS_LOADED action", () => {
        const action = {
            type: USER_COLLABORATIONS_LOADED,
            payload: userCollaborationsArrayData,
        };
        expect(documentsReducer(initialState, action)).toEqual({
            ...initialState,
            userCollaborationsArray: userCollaborationsArrayData,
        });
    });

    it("should handle USER_COLLABORATIONS_FAILED action", () => {
        const action = { type: USER_COLLABORATIONS_FAILED };
        expect(documentsReducer(initialState, action)).toEqual({
            ...initialState,
            projectData: null,
            projectArray: null,
            collaboratorsArray: null,
            userCollaborationsArray: null,
        });
    });

    it("should handle SAVE_DRAFT action", () => {
        const action = {
            type: SAVE_DRAFT,
            payload: projectData,
        };
        expect(documentsReducer(initialState, action)).toEqual({
            ...initialState,
            projectData: projectData,
        });
    });

    it("should handle USER_ADDED action", () => {
        const action = { type: USER_ADDED };
        expect(documentsReducer(initialState, action)).toEqual(initialState);
    });

    it("should handle ADD_USER_FAILED action", () => {
        const action = { type: ADD_USER_FAILED };
        expect(documentsReducer(initialState, action)).toEqual({
            ...initialState,
            projectData: null,
            projectArray: null,
            collaboratorsArray: null,
            userCollaborationsArray: null,
        });
    });

    it("should handle SAVE_FAILED action", () => {
        const action = { type: SAVE_FAILED };
        expect(documentsReducer(initialState, action)).toEqual({
            ...initialState,
            projectData: null,
            projectArray: null,
            collaboratorsArray: null,
            userCollaborationsArray: null,
        });
    });
});
