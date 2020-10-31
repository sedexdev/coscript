import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import Unauthorised from "./Unauthorised";

describe("Unauthorised component", () => {
    test("renders without crashing", () => {
        global.scrollTo = jest.fn();
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <Unauthorised />
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
                        <Unauthorised />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a amin element with a className of unauthorised-body", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Unauthorised />
                </Router>
            </Provider>
        );
        expect(wrapper.find("main").length).toEqual(1);
        expect(wrapper.find({ className: "unauthorised-body" }).length).toEqual(
            1
        );
    });

    it("should render a section element with a className of unauthorised-container", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Unauthorised />
                </Router>
            </Provider>
        );
        expect(wrapper.find("section").length).toEqual(1);
        expect(
            wrapper.find({ className: "unauthorised-container" }).length
        ).toEqual(1);
    });

    it("should render a h1 element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Unauthorised />
                </Router>
            </Provider>
        );
        expect(wrapper.find("h1").length).toEqual(1);
    });

    it("should render a p element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Unauthorised />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").length).toEqual(1);
    });

    it("should render a div element with a className of ajax-spinner-container", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Unauthorised />
                </Router>
            </Provider>
        );
        expect(wrapper.find("div").length).toEqual(1);
        expect(
            wrapper.find({ className: "ajax-spinner-container" }).length
        ).toEqual(1);
    });

    it("should render an img element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Unauthorised />
                </Router>
            </Provider>
        );
        expect(wrapper.find("img").length).toEqual(1);
    });
});
