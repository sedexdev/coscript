import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import Terms from "./Terms";
import NavBar from "../NavBar";
import Footer from "../Footer";

describe("Terms component", () => {
    test("renders without crashing", () => {
        global.scrollTo = jest.fn();
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <Terms />
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
                        <Terms />
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
                    <Terms />
                </Router>
            </Provider>
        );
        expect(wrapper.find(NavBar).length).toEqual(1);
    });

    it("should render a main element with a className of terms-main", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Terms />
                </Router>
            </Provider>
        );
        expect(wrapper.find("main").length).toEqual(1);
        expect(wrapper.find({ className: "terms-main" }).length).toEqual(1);
    });

    it("should render a header element with a className of terms-header", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Terms />
                </Router>
            </Provider>
        );
        expect(wrapper.find("header").length).toEqual(1);
        expect(wrapper.find({ className: "terms-header" }).length).toEqual(1);
    });

    it("should render 7 p elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Terms />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").length).toEqual(7);
    });

    it("should render a h2 elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Terms />
                </Router>
            </Provider>
        );
        expect(wrapper.find("h2").length).toEqual(1);
    });

    it("should render 8 a elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Terms />
                </Router>
            </Provider>
        );
        expect(wrapper.find("a").length).toEqual(8);
    });

    it("should render a ul element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Terms />
                </Router>
            </Provider>
        );
        expect(wrapper.find("ul").length).toEqual(1);
    });

    it("should render 9 li elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Terms />
                </Router>
            </Provider>
        );
        expect(wrapper.find("li").length).toEqual(9);
    });

    it("should render the Footer component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Terms />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Footer).length).toEqual(1);
    });
});
