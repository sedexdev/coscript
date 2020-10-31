import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import { Redirect } from "./Redirect";

describe("Redirect component", () => {
    let props, mockCreateNewProject, mockLogoutUser;
    beforeEach(() => {
        global.HTMLMediaElement.prototype.pause = jest.fn();
        global.scrollTo = jest.fn();
        mockCreateNewProject = jest.fn();
        mockLogoutUser = jest.fn();
        props = {
            history: {},
            createNewProject: mockCreateNewProject,
            logoutUser: mockLogoutUser,
            location: {
                state: {},
            },
        };
    });

    afterEach(() => {
        props.history.from = null;
    });

    test("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <Redirect {...props} />
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
                        <Redirect {...props} />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a main element with a className of redirect-body", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Redirect {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("main").length).toEqual(1);
        expect(wrapper.find({ className: "redirect-body" }).length).toEqual(1);
    });

    it("should render a section element with a className of redirect-container", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Redirect {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("section").length).toEqual(1);
        expect(
            wrapper.find({ className: "redirect-container" }).length
        ).toEqual(1);
    });

    it("should render an img element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Redirect {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("img").length).toEqual(1);
    });

    it("should render the message 'Sorry to see you go :(' from 'delete'", () => {
        props.history.from = "delete";
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Redirect {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").at(0).instance().innerHTML).toEqual(
            "Sorry to see you go :("
        );
    });

    it("should render the message 'Creating your new project...' from 'editor'", () => {
        props.history.from = "editor";
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Redirect {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").at(0).instance().innerHTML).toEqual(
            "Creating your new project..."
        );
    });

    it("should render the message 'Taking you back to login...' from 'verify'", () => {
        props.history.from = "verify";
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Redirect {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").at(0).instance().innerHTML).toEqual(
            "Taking you back to login..."
        );
    });

    it("should render the message 'Publishing your project! :)' from 'publications'", () => {
        props.history.from = "publications";
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Redirect {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").at(0).instance().innerHTML).toEqual(
            "Publishing your project! :)"
        );
    });

    it("should render the message 'Logging you out. Redirecting...' by default", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Redirect {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").at(0).instance().innerHTML).toEqual(
            "Logging you out. Redirecting..."
        );
    });

    it("should call `createNewProject()` from 'editor'", async () => {
        props.history.from = "editor";
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Redirect {...props} />
                </Router>
            </Provider>
        );
        await expect(mockCreateNewProject).toBeCalled();
    });

    it("should call `logoutUser()` from 'logout'", async () => {
        props.history.from = "logout";
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Redirect {...props} />
                </Router>
            </Provider>
        );
        await expect(mockLogoutUser).toBeCalled();
    });
});
