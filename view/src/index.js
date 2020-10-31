import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";

// Redux
import { Provider } from "react-redux";
import { reduxStore } from "./redux/store/reduxStore";

import App from "./App";

ReactDOM.render(
    <Provider store={reduxStore}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);
