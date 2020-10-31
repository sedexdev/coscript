import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../../redux/store/reduxStore";

import { Messages } from "./Messages";
import MobileNav from "../MobileNav";
import SidePanel from "../SidePanel";

import * as auxFuncs from "../../../redux/auxiliary/user-messages";

const messageData = require("./test-data/messages.json");
const originalGetUserMessages = auxFuncs.getUserMessages;
const originalIsAdmin = auxFuncs.isAdmin;

describe("Messages component", () => {
    let props, mockSendMessage, mockSetMessageRead, mockAddCollaborator, mockLoadUserProfile;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        mockSendMessage = jest.fn();
        mockSetMessageRead = jest.fn();
        mockAddCollaborator = jest.fn();
        mockLoadUserProfile = jest.fn();
        props = {
            user: { userId: "123456abcdefghijklmnopqrstuvwxyz" },
            userProfile: { id: "123456" },
            sendMessage: mockSendMessage,
            setMessageRead: mockSetMessageRead,
            addCollaborator: mockAddCollaborator,
            loadUserProfile: mockLoadUserProfile,
            addFriend: jest.fn(),
            sendDeclineMsg: jest.fn(),
            blockUser: jest.fn(),
            history: {
                from: "",
                push: jest.fn(),
            },
        };
    });

    afterEach(() => {
        auxFuncs.getUserMessages = originalGetUserMessages;
        auxFuncs.isAdmin = originalIsAdmin;
    });

    test("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <Messages {...props} />
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
                        <Messages {...props} />
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
                    <Messages {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("main").length).toEqual(1);
        expect(wrapper.find(".profile-container").length).toEqual(1);
    });

    it("should render the MobileNav component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Messages {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(MobileNav).length).toEqual(1);
    });

    it("should render the SidePanel component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Messages {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(SidePanel).length).toEqual(1);
    });

    it("should render a div with a className of 'user-info-container'", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Messages {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("div").length).toEqual(3);
        expect(wrapper.find(".user-info-container").length).toEqual(1);
    });

    it("should render 1 h1 element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Messages {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("h1").length).toEqual(1);
    });

    describe("loading", () => {
        it("should render a div element with a className of 'message-spinner-container' if 'loading' is true", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <Messages {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find("div").length).toEqual(3);
            expect(wrapper.find(".message-spinner-container").length).toEqual(1);
        });

        it("should render an img element with a className of 'message-spinner' if 'loading' is true", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <Messages {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find("img").length).toEqual(2);
            expect(wrapper.find(".message-spinner").length).toEqual(1);
        });

        it("should render a p element with a className of ''message-loading-msg' if 'loading' is true", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <Messages {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find("p").length).toEqual(6);
            expect(wrapper.find(".message-loading-msg").length).toEqual(1);
        });
    });

    describe("loaded", () => {
        it("should render a section element with a className of 'profile'", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <Messages {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find(Messages).setState({ loading: false });
            expect(wrapper.find("section").length).toEqual(1);
            expect(wrapper.find(".profile").length).toEqual(1);
        });

        it("should render a div element with a className of 'user-messages'", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <Messages {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find(Messages).setState({ loading: false });
            expect(wrapper.find("div").length).toEqual(3);
            expect(wrapper.find(".user-messages").length).toEqual(1);
        });

        it("should render a p element with a className of 'empty-message'", () => {
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <Messages {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find(Messages).setState({ loading: false });
            expect(wrapper.find("p").length).toEqual(6);
            expect(wrapper.find(".empty-message").length).toEqual(1);
        });

        it("should call `getUserMessages()` on mount", async () => {
            auxFuncs.getUserMessages = jest.fn();
            mount(
                <Provider store={reduxStore}>
                    <Router>
                        <Messages {...props} />
                    </Router>
                </Provider>
            );
            await expect(auxFuncs.getUserMessages).toBeCalled();
        });

        describe("user has messages", () => {
            it("should render div elements with a className of 'user-message-container'", () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({
                    loading: false,
                    messages: messageData.messages,
                });
                expect(wrapper.find(".user-message-container").length).toEqual(2);
            });

            it("should call `setMessageRead()` when the message reveal button is clicked", async () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({
                    loading: false,
                    messages: messageData.messages,
                });
                wrapper.find(".reveal-msg-btn").at(0).simulate("click");
                await expect(mockSetMessageRead).toBeCalled();
            });

            it("should call `loadUserProfile()` when the user profile link is clicked", async () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                const id = messageData.messages[0].id;
                wrapper.find(Messages).setState({
                    loading: false,
                    messages: messageData.messages,
                    messageVisibilities: { [id]: true },
                });
                wrapper.find(".sender-link").at(0).simulate("click");
                await expect(mockLoadUserProfile).toBeCalled();
            });
        });

        describe("revealReplyWindow is true", () => {
            it("should render a div element with a className of 'reply-message-box'", () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({ revealReplyWindow: true });
                expect(wrapper.find(".reply-message-box").length).toEqual(1);
            });

            it("should render a div element with a className of 'reply-message-box'", () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({ revealReplyWindow: true });
                expect(wrapper.find(".reply-message-box").length).toEqual(1);
            });

            it("should render a form element", () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({ revealReplyWindow: true });
                expect(wrapper.find("form").length).toEqual(1);
            });

            it("should render 2 button elements", () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({ revealReplyWindow: true });
                expect(wrapper.find("button").length).toEqual(2);
            });

            it("should call `sendMessage()` when the form is submitted", () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({ revealReplyWindow: true });
                wrapper.find("form").simulate("submit", { preventDefault: jest.fn() });
                expect(mockSendMessage).toBeCalled();
            });
        });

        describe("revealCollaborateWindow is true", () => {
            it("should render a div element with a className of 'collaborate-box'", () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({ revealCollaborateWindow: true });
                expect(wrapper.find(".collaborate-box").length).toEqual(1);
            });

            it("should render a p element with a className of 'collaborate-heading'", () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({ revealCollaborateWindow: true });
                expect(wrapper.find(".collaborate-heading").length).toEqual(1);
            });

            it("should render a form element", () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({ revealCollaborateWindow: true });
                expect(wrapper.find("form").length).toEqual(1);
            });

            it("should render 2 button elements", () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({ revealCollaborateWindow: true });
                expect(wrapper.find("button").length).toEqual(2);
            });

            it("should render an input element", () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({ revealCollaborateWindow: true });
                expect(wrapper.find("input").length).toEqual(1);
            });

            it("should call `addCollaborator()` when the 'Collaborate' button is clicked", () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({ revealCollaborateWindow: true });
                wrapper.find("form").simulate("submit", { preventDefault: jest.fn() });
                expect(mockAddCollaborator).toBeCalled();
            });
        });

        describe("revealFriendWindow is true", () => {
            it("should render a div element with a className of 'collaborate-box'", () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({ revealFriendWindow: true });
                expect(wrapper.find(".collaborate-box").length).toEqual(1);
            });

            it("should render a form element", () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({ revealFriendWindow: true });
                expect(wrapper.find("form").length).toEqual(1);
            });

            it("should render the accept message with the 'accept' actionName", () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({
                    revealFriendWindow: true,
                    actionName: "accept",
                    friendName: "Test Name",
                });

                const first = wrapper.find(".collaborate-heading").prop("children")[1].props.children[0];
                const second = wrapper.find(".collaborate-heading").prop("children")[1].props.children[1];
                expect(wrapper.find(".collaborate-heading").prop("children").toString()).toStrictEqual(
                    [
                        "Accept ",
                        <b>
                            {first}
                            {second}
                        </b>,
                        " request and add as a friend?",
                    ].toString()
                );
            });

            it("should render the decline message with the 'decline' actionName", () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({
                    revealFriendWindow: true,
                    actionName: "decline",
                    friendName: "Test Name",
                });

                const first = wrapper.find(".collaborate-heading").prop("children")[1].props.children[0];
                const second = wrapper.find(".collaborate-heading").prop("children")[1].props.children[1];
                expect(wrapper.find(".collaborate-heading").prop("children").toString()).toStrictEqual(
                    [
                        "Decline ",
                        <b>
                            {first}
                            {second}
                        </b>,
                        " request?",
                    ].toString()
                );
            });

            it("should render the block message with the 'block' actionName", () => {
                const wrapper = mount(
                    <Provider store={reduxStore}>
                        <Router>
                            <Messages {...props} />
                        </Router>
                    </Provider>
                );
                wrapper.find(Messages).setState({
                    revealFriendWindow: true,
                    actionName: "block",
                    friendName: "Test Name",
                });

                const first = wrapper.find(".collaborate-heading").prop("children")[1].props.children[0];
                expect(wrapper.find(".collaborate-heading").prop("children").toString()).toStrictEqual(
                    ["Block ", <b>{first}</b>, "? You will no longer be able to send or receive communications to or from this user."].toString()
                );
            });
        });
    });
});
