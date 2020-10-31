import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import { Landing } from "./Landing";

const projectData = require("../../redux/tests/actions/data/documents/project.json");
const userData = require("../../redux/tests/actions/data/auth/user.json");

describe("Landing component", () => {
    let props, mockLoadUserProfile;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        mockLoadUserProfile = jest.fn();
        props = {
            user: userData,
            userProfile: userData.profile,
            projectData: projectData,
            projectAvatar: {},
            sendMessage: jest.fn(),
            loadUserProfile: mockLoadUserProfile,
            history: { push: jest.fn() },
        };
    });

    test("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <Landing {...props} />
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
                        <Landing {...props} />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a main element with a className of project-landing-page", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Landing {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("main").length).toEqual(1);
        expect(
            wrapper.find({ className: "project-landing-page" }).length
        ).toEqual(1);
    });

    it("should render a button elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Landing {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("button").length).toEqual(1);
    });

    it("should render 2 img elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Landing {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("img").length).toEqual(2);
    });

    it("should render a section element with a className of project-information-container", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Landing {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("section").length).toEqual(1);
        expect(
            wrapper.find({ className: "project-information-container" }).length
        ).toEqual(1);
    });

    it("should call `loadUsersProfile()` when the profile link is clicked", async () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Landing {...props} />
                </Router>
            </Provider>
        );
        wrapper.find("button").at(0).simulate("click");
        await expect(mockLoadUserProfile).toBeCalled();
    });
});
