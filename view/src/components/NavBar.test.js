import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router, Link } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../redux/store/reduxStore";

import { NavBar } from "./NavBar";
import Button from "./buttons/Button";

describe("NavBar component", () => {
    let props, mockGetMostRecentProject;
    beforeEach(() => {
        mockGetMostRecentProject = jest.fn();
        props = {
            user: {
                isLoggedIn: false,
                avatar: "",
                profile: { displayName: "Test Name" },
            },
            loading: false,
            getMostRecentProject: mockGetMostRecentProject,
            history: {
                from: "",
                push: jest.fn(),
            },
        };
    });

    test("renders without crashing", () => {
        global.scrollTo = jest.fn();
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <NavBar {...props} />
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
                        <NavBar {...props} />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a nav element with a className of 'navbar'", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <NavBar {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("nav").length).toEqual(1);
        expect(wrapper.find(".navbar").length).toEqual(1);
    });

    describe("User not logged in", () => {
        it("should render 9 Link components", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <NavBar {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find(Link).length).toEqual(9);
        });

        it("should render 2 Button components", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <NavBar {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find(Button).length).toEqual(2);
        });

        it("should render 7 div components", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <NavBar {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find("div").length).toEqual(7);
        });
    });

    describe("User is logged in", () => {
        it("should render 8 Link components", () => {
            props.user.isLoggedIn = true;
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <NavBar {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find(Link).length).toEqual(8);
        });

        it("should render 6 div elements", () => {
            props.user.isLoggedIn = true;
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <NavBar {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find("div").length).toEqual(6);
        });

        it("should render 2 img elements", () => {
            props.user.isLoggedIn = true;
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <NavBar {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find("img").length).toEqual(2);
        });

        it("should render 2 button elements", () => {
            props.user.isLoggedIn = true;
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <NavBar {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find("button").length).toEqual(2);
        });

        it("should render a div element with a className of 'avatar-unread-msg-icon' if user has unread messages", () => {
            props.user.isLoggedIn = true;
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <NavBar {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find(NavBar).setState({ unread: true });
            expect(wrapper.find(".avatar-unread-msg-icon").length).toEqual(1);
        });

        it("should call `getMostRecentProject()` when 'Workspace' link is clicked", async () => {
            props.user.isLoggedIn = true;
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <NavBar {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find(Link).at(6).simulate("click");
            await expect(mockGetMostRecentProject).toBeCalled();
        });
    });
});
