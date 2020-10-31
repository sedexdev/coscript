import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import uuid from "uuid";
import { SHOW_ALERT } from "../../actions/event-types";

import { displayAlert } from "../../actions/alertpopup";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("displayAlert action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires SHOW_ALERT action", () => {
        const id = uuid.v4();
        const alertData = {
            alertType: "success",
            id: id,
            msg: "Alert is being shown...",
        };

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: alertData,
            });
        });

        const expectedActions = [{ type: SHOW_ALERT, payload: alertData }];

        const store = mockStore({ payload: {} });

        store.dispatch(displayAlert(alertData.msg, alertData.alertType));
        store.getActions()[0].payload.id = id;
        expect(store.getActions()).toEqual(expectedActions);
    });
});
