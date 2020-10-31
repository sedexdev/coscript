import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router, Link } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import { Register } from "./Register";
import NavBar from "../NavBar";
import ConfirmRegistration from "./ConfirmRegistration";
import PostButton from "../buttons/PostButton";

describe("Register component", () => {
    let props;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        props = {
            user: {},
            regToken: "",
            displayAlert: jest.fn(),
            startRegistration: jest.fn(),
            verifyEmail: jest.fn(),
            displayAlert: jest.fn(),
            location: {
                state: {},
            },
        };
    });

    afterEach(() => {
        props.regToken = "";
    });

    test("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
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
                        <Register {...props} />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a main element with a className of register-body", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("main").length).toEqual(1);
        expect(wrapper.find({ className: "register-body" }).length).toEqual(1);
    });

    it("should render the NavBar component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(NavBar).length).toEqual(1);
    });

    it("should render the ConfirmRegistration component if regToken is truthy", () => {
        props.regToken = "123456789abcdefghijklmnopqrstuvwxyz";
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(ConfirmRegistration).length).toEqual(1);
    });
});

describe("RegistrationForm component", () => {
    let props, mockStartRegistration, mockVerifyEmail, mockDisplayAlert;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        mockStartRegistration = jest.fn();
        mockVerifyEmail = jest.fn();
        mockDisplayAlert = jest.fn();
        props = {
            user: {},
            regToken: "",
            displayAlert: jest.fn(),
            startRegistration: mockStartRegistration,
            verifyEmail: mockVerifyEmail,
            displayAlert: mockDisplayAlert,
            location: {
                state: {},
            },
        };
    });

    afterEach(() => {
        props.regToken = "";
    });

    it("should render a section element with a className of form-container", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("section").length).toEqual(1);
        expect(wrapper.find({ className: "form-container" }).length).toEqual(1);
    });

    it("should render a form element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("form").length).toEqual(1);
    });

    it("should render a h1 element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("h1").length).toEqual(1);
    });

    it("should render 5 label elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("label").length).toEqual(5);
    });

    it("should render 6 input elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("input").length).toEqual(6);
    });

    it("should render a p element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").length).toEqual(1);
    });

    it("should render a Link components", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Link).length).toEqual(1);
    });

    it("should render the PostButton component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(PostButton).length).toEqual(1);
    });

    it("should call `displayAlert()` if passwords do not match", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        wrapper
            .find("input")
            .at(0)
            .simulate("change", {
                target: { name: "email", value: "test@email.com" },
            });
        wrapper
            .find("input")
            .at(1)
            .simulate("change", {
                target: { name: "name", value: "Test Name" },
            });
        wrapper
            .find("input")
            .at(2)
            .simulate("change", {
                target: { name: "username", value: "test101" },
            });
        wrapper
            .find("input")
            .at(3)
            .simulate("change", {
                target: { name: "password", value: "password1234" },
            });
        wrapper
            .find("input")
            .at(4)
            .simulate("change", {
                target: { name: "confirmPassword", value: "password4321" },
            });
        wrapper.find("form").simulate("submit", { preventDefault: jest.fn() });
        expect(mockDisplayAlert).toBeCalled();
    });

    it("should call `startRegistration()` if passwords do match", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        wrapper
            .find("input")
            .at(0)
            .simulate("change", {
                target: { name: "email", value: "test@email.com" },
            });
        wrapper
            .find("input")
            .at(1)
            .simulate("change", {
                target: { name: "name", value: "Test Name" },
            });
        wrapper
            .find("input")
            .at(2)
            .simulate("change", {
                target: { name: "username", value: "test101" },
            });
        wrapper
            .find("input")
            .at(3)
            .simulate("change", {
                target: { name: "password", value: "password1234" },
            });
        wrapper
            .find("input")
            .at(4)
            .simulate("change", {
                target: { name: "confirmPassword", value: "password1234" },
            });
        wrapper.find("form").simulate("submit", { preventDefault: jest.fn() });
        expect(mockStartRegistration).toBeCalled();
    });
});

describe("ConfirmRegistration component", () => {
    let props, mockStartRegistration, mockVerifyEmail, mockDisplayAlert;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        mockStartRegistration = jest.fn();
        mockVerifyEmail = jest.fn();
        mockDisplayAlert = jest.fn();
        props = {
            user: {},
            regToken: "123456789abcdefghijklmnopqrstuvwxyz",
            displayAlert: jest.fn(),
            startRegistration: mockStartRegistration,
            verifyEmail: mockVerifyEmail,
            displayAlert: mockDisplayAlert,
            location: {
                state: {},
            },
        };
    });

    it("should render a main element with a className of confirm-body", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("main").length).toEqual(1);
        expect(wrapper.find({ className: "confirm-body" }).length).toEqual(1);
    });

    it("should render a section element with a classNam of confirm-container", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("section").length).toEqual(1);
        expect(wrapper.find({ className: "confirm-container" }).length).toEqual(
            1
        );
    });

    it("should render 2 p tags", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").length).toEqual(2);
    });

    it("should render a form element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("form").length).toEqual(1);
    });

    it("should render 2 input elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("input").length).toEqual(2);
    });

    it("should render the PostButton component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(PostButton).length).toEqual(1);
    });

    it("should render a Link component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Link).length).toEqual(1);
    });

    it("should call `verifyEmail()` when the form is submitted", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Register {...props} />
                </Router>
            </Provider>
        );
        wrapper
            .find("input")
            .at(0)
            .simulate("change", {
                target: { name: "confirmCode", value: "123456" },
            });
        wrapper.find("form").simulate("submit", { preventDefault: jest.fn() });
        expect(mockVerifyEmail).toBeCalled();
    });
});
