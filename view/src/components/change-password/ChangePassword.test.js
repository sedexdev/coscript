import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import { Alert } from "../alert/Alert";
import { ChangePassword } from "./ChangePassword";
import PostButton from "../buttons/PostButton";

import * as pwFuncs from "../../redux/auxiliary/password";
import * as accountActions from "../../redux/actions/account";

const originalCheck = pwFuncs.checkCurrentPassword;
const originalCompare = pwFuncs.comparePW;

describe("ChangePassword component", () => {
    let mockUpdatePassword, mockDisplayAlert, props;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        mockUpdatePassword = jest.fn();
        mockDisplayAlert = jest.fn();
        props = {
            updatePassword: mockUpdatePassword,
            displayAlert: mockDisplayAlert,
        };
    });

    afterEach(() => {
        pwFuncs.checkCurrentPassword = originalCheck;
        pwFuncs.comparePW = originalCompare;
    });

    test("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <ChangePassword {...props} />
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
                        <ChangePassword {...props} />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a main element with a className of change-password-main", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ChangePassword {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("main").length).toEqual(1);
        expect(
            wrapper.find({ className: "change-password-main" }).length
        ).toEqual(1);
    });

    it("should render a section element with a className of change-password-section", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ChangePassword {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("section").length).toEqual(1);
        expect(
            wrapper.find({ className: "change-password-section" }).length
        ).toEqual(1);
    });

    it("should render a form element with a className of new-pw-form", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ChangePassword {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("form").length).toEqual(1);
        expect(wrapper.find({ className: "new-pw-form" }).length).toEqual(1);
    });

    it("should render 5 div elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ChangePassword {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("div").length).toEqual(5);
    });

    it("should render 3 label elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ChangePassword {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("label").length).toEqual(3);
    });

    it("should render 4 input elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ChangePassword {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("input").length).toEqual(4);
    });

    it("should render a PostButton component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ChangePassword {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(PostButton).length).toEqual(1);
    });

    it("should render an Alert component if checkCurrentPassword is false", async () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ChangePassword {...props} />
                </Router>
            </Provider>
        );

        pwFuncs.checkCurrentPassword = jest.fn(() => false);

        const fakeEvent = {
            preventDefault: () => {},
        };

        wrapper
            .find("input")
            .at(0)
            .simulate("change", {
                target: { name: "currentPassword", value: null },
            });
        wrapper
            .find("input")
            .at(1)
            .simulate("change", {
                target: { name: "newPassword", value: "password4321" },
            });
        wrapper
            .find("input")
            .at(2)
            .simulate("change", {
                target: { name: "confirmPassword", value: "password4321" },
            });

        await act(async () => {
            wrapper.find("form").simulate("submit", fakeEvent);
        });

        expect(pwFuncs.checkCurrentPassword).toBeCalled();
        expect(wrapper.find(Alert).length).toEqual(1);
    });

    it("should render an Alert component if password and confirmPassword do not match", async () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ChangePassword {...props} />
                </Router>
            </Provider>
        );

        pwFuncs.checkCurrentPassword = jest.fn(() => true);
        pwFuncs.comparePW = jest.fn(() => false);

        const fakeEvent = {
            preventDefault: () => {},
        };

        wrapper
            .find("input")
            .at(0)
            .simulate("change", {
                target: { name: "currentPassword", value: "password1234" },
            });
        wrapper
            .find("input")
            .at(1)
            .simulate("change", {
                target: { name: "newPassword", value: "1234drowssap" },
            });
        wrapper
            .find("input")
            .at(2)
            .simulate("change", {
                target: { name: "confirmPassword", value: "password4321" },
            });

        await act(async () => {
            wrapper.find("form").simulate("submit", fakeEvent);
        });

        expect(pwFuncs.checkCurrentPassword).toBeCalled();
        expect(pwFuncs.comparePW).toBeCalled();
        expect(wrapper.find(Alert).length).toEqual(1);
    });

    it("should render an Alert component if passwordClash is true", async () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ChangePassword {...props} />
                </Router>
            </Provider>
        );

        pwFuncs.checkCurrentPassword = jest.fn(() => true);
        pwFuncs.comparePW = jest.fn(() => true);

        const fakeEvent = {
            preventDefault: () => {},
        };

        wrapper
            .find("input")
            .at(0)
            .simulate("change", {
                target: { name: "currentPassword", value: "password1234" },
            });
        wrapper
            .find("input")
            .at(1)
            .simulate("change", {
                target: { name: "newPassword", value: "password4321" },
            });
        wrapper
            .find("input")
            .at(2)
            .simulate("change", {
                target: { name: "confirmPassword", value: "password4321" },
            });

        await act(async () => {
            wrapper.find("form").simulate("submit", fakeEvent);
        });

        expect(pwFuncs.checkCurrentPassword).toBeCalled();
        expect(pwFuncs.comparePW).toBeCalled();
        expect(wrapper.find(Alert).length).toEqual(1);
    });

    it("should render an Alert component if a new password field is blank", async () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ChangePassword {...props} />
                </Router>
            </Provider>
        );

        pwFuncs.checkCurrentPassword = jest.fn(() => true);
        pwFuncs.comparePW = jest.fn(() => true);

        const fakeEvent = {
            preventDefault: () => {},
        };

        wrapper
            .find("input")
            .at(0)
            .simulate("change", {
                target: { name: "currentPassword", value: "password1234" },
            });
        wrapper
            .find("input")
            .at(1)
            .simulate("change", {
                target: { name: "newPassword", value: "" },
            });
        wrapper
            .find("input")
            .at(2)
            .simulate("change", {
                target: { name: "confirmPassword", value: "password4321" },
            });

        await act(async () => {
            wrapper.find("form").simulate("submit", fakeEvent);
        });

        expect(pwFuncs.checkCurrentPassword).toBeCalled();
        expect(pwFuncs.comparePW).toBeCalled();
        expect(wrapper.find(Alert).length).toEqual(1);
    });

    test("should call `checkCurrentPassword()`, `comparePW()` and `updatePassword()` functions when form is submitted with correct data", async () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ChangePassword {...props} />
                </Router>
            </Provider>
        );

        pwFuncs.checkCurrentPassword = jest.fn(() => true);
        pwFuncs.comparePW = jest.fn(() => false);
        accountActions.updatePassword = jest.fn(() => Promise.resolve(true));

        const fakeEvent = {
            preventDefault: () => {},
        };

        wrapper
            .find("input")
            .at(0)
            .simulate("change", {
                target: { name: "currentPassword", value: "password1234" },
            });
        wrapper
            .find("input")
            .at(1)
            .simulate("change", {
                target: { name: "newPassword", value: "password4321" },
            });
        wrapper
            .find("input")
            .at(2)
            .simulate("change", {
                target: { name: "confirmPassword", value: "password4321" },
            });

        await act(async () => {
            wrapper.find("form").simulate("submit", fakeEvent);
        });

        expect(pwFuncs.checkCurrentPassword).toBeCalled();
        expect(pwFuncs.comparePW).toBeCalled();
        expect(mockUpdatePassword).toBeCalled();
    });
});
