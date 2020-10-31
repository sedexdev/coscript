import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import Agreement from "./Agreement";
import NavBar from "../NavBar";
import Footer from "../Footer";

describe("Agreement component", () => {
    test("renders without crashing", () => {
        global.scrollTo = jest.fn();
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <Agreement />
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
                        <Agreement />
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
                    <Agreement />
                </Router>
            </Provider>
        );
        expect(wrapper.find(NavBar).length).toEqual(1);
    });

    it("should render 1 main element with a className of agreement-main", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Agreement />
                </Router>
            </Provider>
        );
        expect(wrapper.find("main").length).toEqual(1);
        expect(wrapper.find({ className: "agreement-main" }).length).toEqual(1);
    });

    it("should render 1 header element with a className of agreement-header", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Agreement />
                </Router>
            </Provider>
        );
        expect(wrapper.find("header").length).toEqual(1);
        expect(wrapper.find({ className: "agreement-header" }).length).toEqual(
            1
        );
    });

    it("should render 6 p elements with a className of agreement-main", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Agreement />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").length).toEqual(6);
    });

    it("should render 2 img elements with a className of agreement-main", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Agreement />
                </Router>
            </Provider>
        );
        expect(wrapper.find("img").length).toEqual(2);
    });

    it("should render 11 a elements (including NavBar) with a className of agreement-main", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Agreement />
                </Router>
            </Provider>
        );
        expect(wrapper.find("a").length).toEqual(11);
    });

    it("should render the Footer component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Agreement />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Footer).length).toEqual(1);
    });
});
