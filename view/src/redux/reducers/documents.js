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
    USER_PROJECT_DELETED,
    COLLABORATOR_PROJECT_DELETED,
    PROJECT_DELETE_FAILED,
    SAVE_DRAFT,
    USER_ADDED,
    ADD_USER_FAILED,
    SAVE_FAILED,
} from "../actions/event-types";

const initialState = {
    loading: true,
    projectData: null,
    projectArray: null,
    collaboratorsArray: null,
    userCollaborationsArray: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case PROJECT_LOADED:
            return {
                ...state,
                loading: false,
                projectData: payload,
            };
        case PROJECT_ARRAY_LOADED:
        case USER_PROJECT_DELETED:
            return {
                ...state,
                projectArray: payload,
            };
        case COLLABORATORS_ARRAY_LOADED:
            return {
                ...state,
                collaboratorsArray: payload,
            };
        case COLLABORATOR_PROJECT_DELETED:
        case USER_COLLABORATIONS_LOADED:
            return {
                ...state,
                userCollaborationsArray: payload,
            };
        case CREATE_SUCCESS:
        case SAVE_DRAFT:
            return {
                ...state,
                projectData: payload,
            };
        case CREATE_FAILED:
        case LOAD_FAILED:
        case PROJECT_ARRAY_FAILED:
        case COLLABORATORS_ARRAY_FAILED:
        case ADD_USER_FAILED:
        case SAVE_FAILED:
        case USER_COLLABORATIONS_FAILED:
            return {
                ...state,
                projectData: null,
                projectArray: null,
                collaboratorsArray: null,
                userCollaborationsArray: null,
            };
        case PROJECT_DELETE_FAILED:
        case USER_ADDED:
        default:
            return state;
    }
}
