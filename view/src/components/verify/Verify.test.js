import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router, Link } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import { Verify } from "./Verify";
import VerifyForm from "./VerifyForm";
import PostButton from "../buttons/PostButton";

import * as auxFuncs from "../../redux/auxiliary/sendEmail";

const originalSendEmail = auxFuncs.sendEmail;
const originalVerifyPWCode = auxFuncs.verifyPWCode;
const originalSendTempEmail = auxFuncs.sendTempCredentialsEmail;

describe("Verify component", () => {
    let props;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        auxFuncs.sendEmail = jest.fn();
        auxFuncs.verifyPWCode = jest.fn(function () {
            return { success: true };
        });
        auxFuncs.sendTempCredentialsEmail = jest.fn();
        props = {
            history: {
                from: "",
                push: jest.fn(),
            },
        };
    });

    afterEach(() => {
        auxFuncs.sendEmail = originalSendEmail;
        auxFuncs.verifyPWCode = originalVerifyPWCode;
        auxFuncs.sendTempCredentialsEmail = originalSendTempEmail;
    });

    test("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <Verify />
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
                        <Verify />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a main element with a className of verify-body", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Verify />
                </Router>
            </Provider>
        );
        expect(wrapper.find("main").length).toEqual(1);
        expect(wrapper.find({ className: "verify-body" }).length).toEqual(1);
    });

    it("should render section element with a className of verify-container", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Verify />
                </Router>
            </Provider>
        );
        expect(wrapper.find("section").length).toEqual(1);
        expect(wrapper.find({ className: "verify-container" }).length).toEqual(
            1
        );
    });

    it("should render the VerifyForm component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Verify />
                </Router>
            </Provider>
        );
        expect(wrapper.find(VerifyForm).length).toEqual(1);
    });

    it("should render a Link component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Verify />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Link).length).toEqual(1);
    });

    it("should call `sendEmail()` when the form is submitted successfully", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Verify />
                </Router>
            </Provider>
        );
        wrapper
            .find("input")
            .at(0)
            .simulate("change", {
                target: { name: "userEmail", value: "test@email.com" },
            });
        wrapper
            .find("form")
            .at(0)
            .simulate("submit", { preventDefault: jest.fn() });
        expect(auxFuncs.sendEmail).toBeCalled();
    });

    it("should call `verifyPWCode()` when the second form is submitted successfully", async () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Verify {...props} />
                </Router>
            </Provider>
        );
        wrapper.find(Verify).setState({ submitted: true });
        wrapper
            .find("input")
            .at(1)
            .simulate("change", {
                target: { name: "confirmCode", value: "123456" },
            });
        wrapper
            .find("form")
            .at(1)
            .simulate("submit", { preventDefault: jest.fn() });
        await expect(auxFuncs.verifyPWCode).toBeCalled();
        expect(auxFuncs.sendTempCredentialsEmail).toBeCalled();
    });
});

describe("VerifyForm component", () => {
    it("should render  a p element with a className of verify-text", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Verify />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").length).toEqual(1);
        expect(wrapper.find({ className: "verify-text" }).length).toEqual(1);
    });

    it("should render a form element with a className of verify-email", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Verify />
                </Router>
            </Provider>
        );
        expect(wrapper.find("form").length).toEqual(1);
        expect(wrapper.find({ className: "verify-email" }).length).toEqual(1);
    });

    it("should render 2 input elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Verify />
                </Router>
            </Provider>
        );
        expect(wrapper.find("input").length).toEqual(2);
    });

    it("should render the PostButton component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Verify />
                </Router>
            </Provider>
        );
        expect(wrapper.find(PostButton).length).toEqual(1);
    });
});
