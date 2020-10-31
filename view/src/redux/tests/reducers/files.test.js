import {
    FILE_FAILED,
    FILE_LOADED,
    FILE_LOAD_FAILED,
} from "../../actions/event-types";
import filesReducer from "../../reducers/files";

const fileData = require("./data/files/files.json");

describe("files reducer", () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            fileData: null,
        };
    });

    it("should return initial state by default", () => {
        const action = {
            type: undefined,
        };
        expect(filesReducer(initialState, action)).toEqual(initialState);
    });

    it("should handle FILE_FAILED action", () => {
        const action = {
            type: FILE_FAILED,
        };
        expect(filesReducer(initialState, action)).toEqual({
            ...initialState,
            fileData: null,
        });
    });

    it("should handle FILE_LOAD_FAILED action", () => {
        const action = {
            type: FILE_LOAD_FAILED,
        };
        expect(filesReducer(initialState, action)).toEqual({
            ...initialState,
            fileData: null,
        });
    });

    it("should handle FILE_LOADED action", () => {
        const action = {
            type: FILE_LOADED,
            payload: fileData,
        };
        expect(filesReducer(initialState, action)).toEqual({ fileData });
    });
});
