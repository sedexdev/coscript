import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../../redux/store/reduxStore";

import { Account } from "./Account";
import MobileNav from "../MobileNav";
import SidePanel from "../SidePanel";
import AccountInfo from "./AccountInfo";
import Password from "./Password";
import DeleteAccount from "./DeleteAccount";
import EditAccountData from "./EditAccountData";
import Button from "../../buttons/Button";

describe("Account component", () => {
    let props, mockUpdateUserEmail, mockDeleteUser;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        mockUpdateUserEmail = jest.fn();
        mockDeleteUser = jest.fn();
        props = {
            user: { email: "test@email.com" },
            updateUserEmail: mockUpdateUserEmail,
            deleteUser: mockDeleteUser,
            history: {
                from: "",
                push: jest.fn(),
            },
        };
    });

    test("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
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
                        <Account {...props} />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a main element with a className of 'profile-container'", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(".profile-container").length).toEqual(1);
    });

    it("should render a div element with a className of 'user-info-container'", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(".user-info-container").length).toEqual(1);
    });

    it("should render 7 section elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("section").length).toEqual(7);
    });

    it("should render a section element with a className of 'account'", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(".account").length).toEqual(1);
    });

    it("should render a section element with a className of 'password'", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(".password").length).toEqual(1);
    });

    it("should render a section element with a className of 'privacy'", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(".privacy").length).toEqual(1);
    });

    it("should render 3 section elements with a className of 'profile-form-container'", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(".profile-form-container").length).toEqual(3);
    });

    it("should render 3 h2 elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("h2").length).toEqual(3);
    });

    it("should render 5 label elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("label").length).toEqual(5);
    });

    it("should render 4 input elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("input").length).toEqual(4);
    });

    it("should render the MobileNav component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(MobileNav).length).toEqual(1);
    });

    it("should render the SidePanel component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(SidePanel).length).toEqual(1);
    });

    it("should render the AccountInfo component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(AccountInfo).length).toEqual(1);
    });

    it("should render the Password component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Password).length).toEqual(1);
    });

    it("should render the DeleteAccount component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(DeleteAccount).length).toEqual(1);
    });

    it("should call `updateUserEmail()` when the email change form is submitted", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
                </Router>
            </Provider>
        );
        wrapper.find(Account).setState({ displayEmailWindow: true });
        wrapper
            .find("input")
            .at(5)
            .simulate("change", {
                target: { name: "email", value: "newemail@test.com" },
            });
        wrapper.find("form").simulate("submit", { preventDefault: jest.fn() });
        expect(mockUpdateUserEmail).toBeCalled();
    });

    it("should call `deleteUser()` when the delete form is submitted", async () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...props} />
                </Router>
            </Provider>
        );
        wrapper.find(Account).setState({
            displayDeleteWindow: true,
            deleteCode: 123456,
            confirmDeleteCode: "123456",
        });
        const deleteWrapper = wrapper.find(DeleteAccount);
        deleteWrapper
            .find("form")
            .at(0)
            .simulate("submit", { preventDefault: jest.fn() });
        await expect(mockDeleteUser).toBeCalled();
    });
});

describe("AccountInfo component", () => {
    let accountProps, props, mockUpdateUserEmail, mockDeleteUser;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        mockUpdateUserEmail = jest.fn();
        mockDeleteUser = jest.fn();
        accountProps = {
            user: { email: "test@email.com" },
            updateUserEmail: mockUpdateUserEmail,
            deleteUser: mockDeleteUser,
            history: {
                from: "",
                push: jest.fn(),
            },
        };
        props = {
            displayEmailWindow: false,
            onSubmit: jest.fn(),
            onClick: jest.fn(),
            cancelEdit: jest.fn(),
            onChange: jest.fn(),
            emailField: {},
        };
    });

    it("should render the EditAccountData component when 'displayEmailWindow' is true", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...accountProps} />
                </Router>
            </Provider>
        );
        wrapper.find(Account).setState({ displayEmailWindow: true });
        const accountInfoWrapper = wrapper.find(AccountInfo);
        expect(accountInfoWrapper.find(EditAccountData).length).toEqual(1);
    });

    it("should render a section element with a className of 'profile-form-container'", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <AccountInfo {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("section").length).toEqual(1);
        expect(wrapper.find(".profile-form-container").length).toEqual(1);
    });

    it("should render 3 div elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <AccountInfo {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("div").length).toEqual(3);
    });

    it("should render a button element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <AccountInfo {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("button").length).toEqual(1);
    });

    it("should render an image element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <AccountInfo {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("img").length).toEqual(1);
    });
});

describe("DeleteAccount component", () => {
    let accountProps, props, mockUpdateUserEmail, mockDeleteUser;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        mockUpdateUserEmail = jest.fn();
        mockDeleteUser = jest.fn();
        accountProps = {
            user: { email: "test@email.com" },
            updateUserEmail: mockUpdateUserEmail,
            deleteUser: mockDeleteUser,
            history: {
                from: "",
                push: jest.fn(),
            },
        };
        props = {
            user: {},
            onClick: jest.fn(),
            onChange: jest.fn(),
            cancelEdit: jest.fn(),
            onDelete: jest.fn(),
            displayDeleteWindow: false,
            deleteField: {},
            deleteCode: 0,
            deleteCodeIncorrect: false,
        };
    });

    it("should render the EditAccountData component when 'displayEmailWindow' is true", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Account {...accountProps} />
                </Router>
            </Provider>
        );
        wrapper.find(Account).setState({ displayEmailWindow: true });
        const deleteAccountWrapper = wrapper.find(AccountInfo);
        expect(deleteAccountWrapper.find(EditAccountData).length).toEqual(1);
    });

    it("should render a h3 element with a className of 'delete-heading'", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <DeleteAccount {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("h3").length).toEqual(1);
        expect(wrapper.find(".delete-heading").length).toEqual(1);
    });

    it("should render 2 p elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <DeleteAccount {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").length).toEqual(2);
    });

    it("should render the Button component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <DeleteAccount {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Button).length).toEqual(1);
    });
});

describe("Password component", () => {
    let props, accountProps;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        accountProps = {
            user: { email: "test@email.com" },
            updateUserEmail: jest.fn(),
            history: {
                from: "",
                push: jest.fn(),
            },
        };
        props = {
            visible: false,
            onChange: jest.fn(),
            sendChangeCode: jest.fn(),
            submitCode: jest.fn(),
            hidePassword: jest.fn(),
            verifyFailed: {},
            failed: false,
            loading: false,
        };
    });

    describe("Form not visible", () => {
        it("should render a section element with a className of 'profile-form-container'", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <Password {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find("section").length).toEqual(1);
            expect(wrapper.find(".profile-form-container").length).toEqual(1);
        });

        it("should render a div element with a className of 'pw-button-container'", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <Password {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find("div").length).toEqual(1);
            expect(wrapper.find(".pw-button-container").length).toEqual(1);
        });

        it("should render 1 Button component", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <Password {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find(Button).length).toEqual(1);
        });
    });

    describe("Form is visible", () => {
        it("should render 2 div elements with a className of 'profile-box'", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <Account {...accountProps} />
                    </Router>
                </Provider>
            );
            wrapper.find(Account).setState({ visible: true });
            const password = wrapper.find(Password);
            expect(password.find(".profile-box").length).toEqual(2);
        });

        it("should render 3 button elements", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <Account {...accountProps} />
                    </Router>
                </Provider>
            );
            wrapper.find(Account).setState({ visible: true });
            const password = wrapper.find(Password);
            expect(password.find("button").length).toEqual(3);
        });

        it("should render a div element with a className of '.pw-code-container'", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <Account {...accountProps} />
                    </Router>
                </Provider>
            );
            wrapper.find(Account).setState({ visible: true });
            const password = wrapper.find(Password);
            expect(password.find(".pw-code-container").length).toEqual(1);
        });

        it("should render an input element with a className of '.pw-code-input'", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <Account {...accountProps} />
                    </Router>
                </Provider>
            );
            wrapper.find(Account).setState({ visible: true });
            const password = wrapper.find(Password);
            expect(password.find(".pw-code-input").length).toEqual(1);
        });

        it("should render an img with a className of '.verify-pw-code-spinner' when 'loading' is true", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <Account {...accountProps} />
                    </Router>
                </Provider>
            );
            wrapper.find(Account).setState({ visible: true, loading: true });
            const password = wrapper.find(Password);
            expect(password.find(".verify-pw-code-spinner").length).toEqual(1);
        });

        it("should render an img with a className of '.pw-code-failed' when 'failed' is true", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <Account {...accountProps} />
                    </Router>
                </Provider>
            );
            wrapper.find(Account).setState({ visible: true, failed: true });
            const password = wrapper.find(Password);
            expect(password.find(".pw-code-failed").length).toEqual(1);
        });
    });
});
