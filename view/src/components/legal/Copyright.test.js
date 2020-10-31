import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import Copyright from "./Copyright";
import NavBar from "../NavBar";
import Footer from "../Footer";

describe("Copyright component", () => {
    test("renders without crashing", () => {
        global.HTMLMediaElement.prototype.pause = jest.fn();
        global.scrollTo = jest.fn();
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <Copyright />
                </Router>
            </Provider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it("renders correctly", () => {
        global.HTMLMediaElement.prototype.pause = jest.fn();
        global.scrollTo = jest.fn();
        const tree = renderer
            .create(
                <Provider store={reduxStore}>
                    <Router>
                        <Copyright />
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
                    <Copyright />
                </Router>
            </Provider>
        );
        expect(wrapper.find(NavBar).length).toEqual(1);
    });

    it("should render a main element with a className of copyright-main", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Copyright />
                </Router>
            </Provider>
        );
        expect(wrapper.find("main").length).toEqual(1);
        expect(wrapper.find({ className: "copyright-main" }).length).toEqual(1);
    });

    it("should render a header element with a className of copyright-header", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Copyright />
                </Router>
            </Provider>
        );
        expect(wrapper.find("header").length).toEqual(1);
        expect(wrapper.find({ className: "copyright-header" }).length).toEqual(
            1
        );
    });

    it("should render 8 p elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Copyright />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").length).toEqual(8);
    });

    it("should render 4 h2 elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Copyright />
                </Router>
            </Provider>
        );
        expect(wrapper.find("h2").length).toEqual(4);
    });

    it("should render 14 a elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Copyright />
                </Router>
            </Provider>
        );
        expect(wrapper.find("a").length).toEqual(14);
    });

    it("should render 3 img elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Copyright />
                </Router>
            </Provider>
        );
        expect(wrapper.find("img").length).toEqual(3);
    });

    it("should render the Footer component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Copyright />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Footer).length).toEqual(1);
    });
});
