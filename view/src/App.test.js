import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { reduxStore } from "./redux/store/reduxStore";

import App from "./App";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <Provider store={reduxStore}>
            <Router>
                <App />
            </Router>
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
