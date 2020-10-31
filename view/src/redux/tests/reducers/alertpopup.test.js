import { SHOW_ALERT, DELETE_ALERT } from "../../actions/event-types";
import alertReducer from "../../reducers/alertpopup";

const alertData = require("./data/alerts/mockAlert.json");

describe("alertPopUp reducer", () => {
    let initialState;
    beforeEach(() => {
        initialState = [];
    });

    it("should return initial state by default", () => {
        const action = {
            type: undefined,
        };
        expect(alertReducer(initialState, action)).toEqual(initialState);
    });

    it("should handle SHOW_ALERT action", () => {
        const action = {
            type: SHOW_ALERT,
            payload: alertData,
        };
        expect(alertReducer(initialState, action)).toEqual([
            ...initialState,
            alertData,
        ]);
    });

    it("should handle DELETE_ALERT action", () => {
        const action = {
            type: DELETE_ALERT,
            payload: alertData.id,
        };
        initialState.push(alertData);
        expect(alertReducer(initialState, action)).toEqual([]);
    });
});
