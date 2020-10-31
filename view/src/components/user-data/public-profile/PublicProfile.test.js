import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../../redux/store/reduxStore";

import { PublicProfile } from "./PublicProfile";
import NavBar from "../../NavBar";
import ProjectCard from "../../cards/ProjectCard";

import projectArray from "../../../redux/tests/auxiliary/data/projects.json";

describe("PublicProfile component", () => {
    let props, mockLoadProject, mockSendFriendRequest, mockLoadUserProfile;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        mockSendFriendRequest = jest.fn();
        mockLoadUserProfile = jest.fn();
        props = {
            user: { userId: "654321", profile: { displayName: "Test Name" } },
            userProfile: { avatar: "", name: "Test Name", id: "123456", about: "Test about", authors: [], books: [], projects: null },
            loadProject: jest.fn(),
            sendFriendRequest: mockSendFriendRequest,
            loadUserProfile: mockLoadUserProfile,
            history: {
                from: "",
                push: jest.fn(),
            },
        };
    });

    afterEach(() => {
        props.userProfile.projects = null;
    });

    test("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <PublicProfile {...props} />
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
                        <PublicProfile {...props} />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should call `loadUserProfile()` on mount", () => {
        mount(
            <Provider store={reduxStore}>
                <Router>
                    <PublicProfile {...props} />
                </Router>
            </Provider>
        );
        expect(mockLoadUserProfile).toBeCalled();
    });

    it("should render the NavBar component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <PublicProfile {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(NavBar).length).toEqual(1);
    });

    it("should render a main element with a className of 'public-profile-main'", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <PublicProfile {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("main").length).toEqual(1);
        expect(wrapper.find(".public-profile-main").length).toEqual(1);
    });

    it("should render an img element with a className of 'public-profile-loading-spinner' if 'loading is true'", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <PublicProfile {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("img").length).toEqual(1);
        expect(wrapper.find(".public-profile-loading-spinner").length).toEqual(1);
    });

    describe("'loading is false", () => {
        beforeEach(() => {
            props.userProfile.projects = projectArray.projects;
        });

        it("should render a header element", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <PublicProfile {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find(PublicProfile).setState({ loading: false });
            expect(wrapper.find("header").length).toEqual(1);
        });

        it("should render a button element with a className of 'profile-connect-btn'", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <PublicProfile {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find(PublicProfile).setState({ loading: false });
            expect(wrapper.find("button").length).toEqual(7);
            expect(wrapper.find(".profile-connect-btn").length).toEqual(1);
        });

        it("should render 7 span element", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <PublicProfile {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find(PublicProfile).setState({ loading: false });
            expect(wrapper.find("span").length).toEqual(7);
        });

        it("should render 2 section elements", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <PublicProfile {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find(PublicProfile).setState({ loading: false });
            expect(wrapper.find("section").length).toEqual(2);
        });

        it("should render 33 div elements", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <PublicProfile {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find(PublicProfile).setState({ loading: false });
            expect(wrapper.find("div").length).toEqual(33);
        });

        it("should render 5 h2 elements", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <PublicProfile {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find(PublicProfile).setState({ loading: false });
            expect(wrapper.find("h2").length).toEqual(5);
        });

        it("should render 6 projectCard components", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <PublicProfile {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find(PublicProfile).setState({ loading: false });
            expect(wrapper.find(ProjectCard).length).toEqual(6);
        });

        it("should render 6 projectCard components", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <PublicProfile {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find(PublicProfile).setState({ loading: false });
            expect(wrapper.find(ProjectCard).length).toEqual(6);
        });
    });

    describe("revealRequestWindow is true", () => {
        it("should render a div element with a className of collaborate-box", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <PublicProfile {...props} />
                    </Router>
                </Provider>
            );

            wrapper.find(PublicProfile).setState({ revealRequestWindow: true });
            expect(wrapper.find(".collaborate-box").length).toEqual(1);
        });

        it("should render a form element", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <PublicProfile {...props} />
                    </Router>
                </Provider>
            );

            wrapper.find(PublicProfile).setState({ revealRequestWindow: true });
            expect(wrapper.find("form").length).toEqual(1);
        });

        it("should render a button element", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <PublicProfile {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find(PublicProfile).setState({ revealRequestWindow: true });
            expect(wrapper.find("button").length).toEqual(1);
        });

        it("should render an input element with a className of 'confirm-btn'", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <PublicProfile {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find(PublicProfile).setState({ revealRequestWindow: true });
            expect(wrapper.find(".confirm-btn").length).toEqual(1);
        });

        it("should call `sendFriendRequest()` when the form is submitted", async () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <PublicProfile {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find(PublicProfile).setState({ revealRequestWindow: true });
            wrapper.find("form").simulate("submit", { preventDefault: jest.fn() });
            await expect(mockSendFriendRequest).toBeCalled();
        });
    });
});
