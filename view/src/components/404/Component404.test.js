import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import Component404 from "./Component404";
import Button from "../buttons/Button";

describe("404 component", () => {
    test("renders without crashing", () => {
        global.scrollTo = jest.fn();
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <Component404 />
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
                        <Component404 />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a section element with a className of four0four-body", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Component404 />
                </Router>
            </Provider>
        );

        expect(wrapper.find("section").length).toEqual(1);
        expect(wrapper.find({ className: "four0four-body" }).length).toEqual(1);
    });

    it("should render 1 div element with a className of four0four-container", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Component404 />
                </Router>
            </Provider>
        );

        expect(wrapper.find("div").length).toEqual(1);
        expect(
            wrapper.find({ className: "four0four-container" }).length
        ).toEqual(1);
    });

    it("should render 1 h1 element with a className of four0four-header", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Component404 />
                </Router>
            </Provider>
        );

        expect(wrapper.find("h1").length).toEqual(1);
        expect(wrapper.find({ className: "four0four-header" }).length).toEqual(
            1
        );
    });

    it("should render 1 p element with a className of four0four-text", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Component404 />
                </Router>
            </Provider>
        );

        expect(wrapper.find("p").length).toEqual(1);
        expect(wrapper.find({ className: "four0four-text" }).length).toEqual(1);
    });

    it("should render 1 Button component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Component404 />
                </Router>
            </Provider>
        );

        expect(wrapper.find(Button).length).toEqual(1);
    });
});
