import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router, Link } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import MobileNav from "./MobileNav";

describe("MobileNav component", () => {
    test("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <MobileNav />
                </Router>
            </Provider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it("renders correctly", () => {
        const tree = renderer
            .create(
                <Provider store={reduxStore}>
                    <Router>
                        <MobileNav />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Should render a nav element with a className of 'profile-mobile-nav'", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <MobileNav />
                </Router>
            </Provider>
        );
        expect(wrapper.find("nav").length).toEqual(1);
        expect(wrapper.find(".profile-mobile-nav").length).toEqual(1);
    });

    it("Should render a button element with a className of 'profile-dropdown-icon-link'", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <MobileNav />
                </Router>
            </Provider>
        );
        expect(wrapper.find("button").length).toEqual(1);
        expect(wrapper.find(".profile-dropdown-icon-link").length).toEqual(1);
    });

    it("Should render 5 Link components", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <MobileNav />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Link).length).toEqual(5);
    });

    it("Should render 6 a elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <MobileNav />
                </Router>
            </Provider>
        );
        expect(wrapper.find("a").length).toEqual(6);
    });

    it("Should render a div element with an id of 'dropdown-nav'", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <MobileNav />
                </Router>
            </Provider>
        );
        expect(wrapper.find("div").length).toEqual(1);
        expect(wrapper.find("#dropdown-nav").length).toEqual(1);
    });
});
