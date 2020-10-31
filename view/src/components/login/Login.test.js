import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router, Link } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import { Login } from "./Login";
import LoginForm from "./LoginForm";
import NavBar from "../NavBar";
import PostButton from "../buttons/PostButton";

describe("Login component", () => {
    let props, mockLoginUser;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        mockLoginUser = jest.fn();
        props = {
            user: {},
            projectData: {},
            loginUser: mockLoginUser,
        };
    });

    test("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <Login {...props} />
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
                        <Login {...props} />
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
                    <Login {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(NavBar).length).toEqual(1);
    });

    it("should render the LoginForm component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Login {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(LoginForm).length).toEqual(1);
    });

    it("should render the PostButton component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Login {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(PostButton).length).toEqual(1);
    });

    it("calls `loginUser()` when onSubmit is called", () => {
        jest.spyOn(Login.prototype, "onSubmit").mockImplementation(function () {
            mockLoginUser();
        });
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Login {...props} />
                </Router>
            </Provider>
        );
        wrapper
            .find("input")
            .at(0)
            .simulate("change", {
                target: { name: "username", value: "test101" },
            });
        wrapper
            .find("input")
            .at(1)
            .simulate("change", {
                target: { name: "password", value: "password1234" },
            });
        wrapper.find("form").simulate("submit", { preventDefault: jest.fn() });

        expect(mockLoginUser).toBeCalled();
    });
});

describe("LoginForm component", () => {
    let props, mockLoginUser;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        mockLoginUser = jest.fn();
        props = {
            user: {},
            projectData: {},
            loginUser: mockLoginUser,
        };
    });

    it("should render a section element with a className of login-cover", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Login {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("section").length).toEqual(1);
        expect(wrapper.find({ className: "login-cover" }).length).toEqual(1);
    });

    it("should render a h1 element with a className of login-header", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Login {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("h1").length).toEqual(1);
        expect(wrapper.find({ className: "login-header" }).length).toEqual(1);
    });

    it("should render a from element with a className of login-form", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Login {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("form").length).toEqual(1);
        expect(wrapper.find({ className: "login-form" }).length).toEqual(1);
    });

    it("should render 3 input elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Login {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("input").length).toEqual(3);
    });

    it("should render 2 label elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Login {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("label").length).toEqual(2);
    });

    it("should render 2 p elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Login {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").length).toEqual(2);
    });

    it("should render 2 Link components", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Login {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Link).length).toEqual(2);
    });
});
