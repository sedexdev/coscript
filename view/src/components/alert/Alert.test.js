import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import uuid from "uuid";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import Alert from "./Alert";

const profileData = require("../../redux/tests/actions/data/profile/profile.json");
const projectData = require("../../redux/tests/actions/data/documents/project.json");

describe("Alert component", () => {
    let propData;
    beforeEach(() => {
        propData = {
            alerts: [
                { alertType: "success", msg: "Test alert", id: uuid.v4() },
            ],
            userProfile: profileData,
            projectData: projectData,
        };
    });

    test("renders without crashing", () => {
        global.scrollTo = jest.fn();
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <Alert />
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
                        <Alert />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a div with a className of 'login-alert' when the pathname is /login", () => {
        const props = { location: { pathname: "/login" } };
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Alert.WrappedComponent
                        alerts={propData.alerts}
                        userProfile={propData.userProfile}
                        projectData={propData.projectData}
                        {...props}
                    />
                </Router>
            </Provider>
        );
        expect(
            wrapper.find({ className: "login-alert alert-success" }).length
        ).toEqual(1);
    });

    it("should render a div with a className of 'account-alert' when the pathname is /account", () => {
        const props = { location: { pathname: "/account" } };
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Alert.WrappedComponent
                        alerts={propData.alerts}
                        userProfile={propData.userProfile}
                        projectData={propData.projectData}
                        {...props}
                    />
                </Router>
            </Provider>
        );
        expect(
            wrapper.find({ className: "account-alert alert-success" }).length
        ).toEqual(1);
    });

    it("should render a div with a className of 'update-alert' when the pathname is /update-credentials", () => {
        const props = { location: { pathname: "/update-credentials" } };
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Alert.WrappedComponent
                        alerts={propData.alerts}
                        userProfile={propData.userProfile}
                        projectData={propData.projectData}
                        {...props}
                    />
                </Router>
            </Provider>
        );
        expect(
            wrapper.find({ className: "update-alert alert-success" }).length
        ).toEqual(1);
    });

    it("should render a div with a className of 'contact-alert' when the pathname is /landing/projectData.url/contact", () => {
        const props = {
            location: { pathname: `/landing${projectData.url}/contact` },
        };
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Alert.WrappedComponent
                        alerts={propData.alerts}
                        userProfile={propData.userProfile}
                        projectData={propData.projectData}
                        {...props}
                    />
                </Router>
            </Provider>
        );
        expect(
            wrapper.find({ className: "contact-alert alert-success" }).length
        ).toEqual(1);
    });

    it("should render a div with a className of 'message-alert' when the pathname is /messages", () => {
        const props = { location: { pathname: "/messages" } };
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Alert.WrappedComponent
                        alerts={propData.alerts}
                        userProfile={propData.userProfile}
                        projectData={propData.projectData}
                        {...props}
                    />
                </Router>
            </Provider>
        );
        expect(
            wrapper.find({ className: "message-alert alert-success" }).length
        ).toEqual(1);
    });

    it("should render a div with a className of 'message-alert' when the pathname is /public-profile", () => {
        const props = { location: { pathname: "/public-profile" } };
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Alert.WrappedComponent
                        alerts={propData.alerts}
                        userProfile={propData.userProfile}
                        projectData={propData.projectData}
                        {...props}
                    />
                </Router>
            </Provider>
        );
        expect(
            wrapper.find({ className: "message-alert alert-success" }).length
        ).toEqual(1);
    });

    it("should render a div with a className of 'request-alert' when the pathname is /profile/user/userProfile.id", () => {
        propData.userProfile.id = "5e58667d902d38559c802b13";
        const props = {
            location: { pathname: `/profile/user/${propData.userProfile.id}` },
        };
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Alert.WrappedComponent
                        alerts={propData.alerts}
                        userProfile={propData.userProfile}
                        projectData={propData.projectData}
                        {...props}
                    />
                </Router>
            </Provider>
        );
        expect(
            wrapper.find({ className: "request-alert alert-success" }).length
        ).toEqual(1);
    });

    it("should render a div with a className of 'alert' when the pathname is not specified", () => {
        const props = { location: { pathname: null } };
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Alert.WrappedComponent
                        alerts={propData.alerts}
                        userProfile={propData.userProfile}
                        projectData={propData.projectData}
                        {...props}
                    />
                </Router>
            </Provider>
        );
        expect(
            wrapper.find({ className: "alert alert-success" }).length
        ).toEqual(1);
    });
});
