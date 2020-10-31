import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router, Link } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../redux/store/reduxStore";

import { Footer } from "./Footer";

describe("Footer component", () => {
    let props, mockGetMostRecentProject;
    beforeEach(() => {
        mockGetMostRecentProject = jest.fn();
        props = {
            user: { isLoggedIn: false },
            loading: false,
            getMostRecentProject: mockGetMostRecentProject,
        };
    });

    afterEach(() => {
        props.user.isLoggedIn = false;
    });

    test("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <Footer {...props} />
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
                        <Footer {...props} />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a footer element with a className of 'footer'", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Footer {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("footer").length).toEqual(1);
        expect(wrapper.find(".footer").length).toEqual(1);
    });

    it("should render a h2 element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Footer {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("h2").length).toEqual(1);
    });

    it("should render 10 a elements when user not logged in", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Footer {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("a").length).toEqual(10);
    });

    it("should render 7 div elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Footer {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("div").length).toEqual(7);
    });

    it("should render 3 p elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Footer {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").length).toEqual(3);
    });

    it("should render 3 Link components when user not logged in", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Footer {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Link).length).toEqual(3);
    });

    it("should render 5 Link components when user logged in", () => {
        props.user.isLoggedIn = true;
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Footer {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Link).length).toEqual(5);
    });

    it("should call `getMostRecentProject()` when 'Workspace' link is clicked", () => {
        props.user.isLoggedIn = true;
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Footer {...props} />
                </Router>
            </Provider>
        );
        wrapper.find(Link).at(2).simulate("click");
        expect(mockGetMostRecentProject).toBeCalled();
    });
});
