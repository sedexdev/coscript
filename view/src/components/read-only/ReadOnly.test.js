import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import ReadOnly from "./ReadOnly";
import NavBar from "../NavBar";

describe("ReadOnly", () => {
    test("renders without crashing", () => {
        global.scrollTo = jest.fn();
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <ReadOnly />
                </Router>
            </Provider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it("renders correctly", () => {
        global.scrollTo = jest.fn();
        const tree = renderer
            .create(
                <Provider store={reduxStore}>
                    <Router>
                        <ReadOnly />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render the NavBar component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ReadOnly />
                </Router>
            </Provider>
        );
        expect(wrapper.find(NavBar).length).toEqual(1);
    });

    it("should render a main element with a className of read-only-main", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ReadOnly />
                </Router>
            </Provider>
        );
        expect(wrapper.find("main").length).toEqual(1);
        expect(wrapper.find({ className: "read-only-main" }).length).toEqual(1);
    });

    it("should render an iframe element with a className of read-only", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ReadOnly />
                </Router>
            </Provider>
        );
        expect(wrapper.find("iframe").length).toEqual(1);
        expect(wrapper.find({ className: "read-only" }).length).toEqual(1);
    });
});
