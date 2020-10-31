import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router, Link } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import { SidePanel } from "./SidePanel";

describe("SidePanel component", () => {
    let props;
    beforeEach(() => {
        props = {
            auth: {
                user: {
                    avatar: "",
                    username: "test101",
                },
            },
            history: {
                from: "",

                push: jest.fn(),
            },
            location: {
                pathname: "",
            },
        };
    });

    afterEach(() => {
        props.location.pathname = "";
    });

    test("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <SidePanel.WrappedComponent {...props} />
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
                        <SidePanel.WrappedComponent {...props} />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should not render the component body when location.pathname is an empty string", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <SidePanel.WrappedComponent {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("aside").length).toEqual(0);
    });

    it("should render the component body when location.pathname is a valid path", () => {
        props.location.pathname = "/profile";
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <SidePanel.WrappedComponent {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("aside").length).toEqual(1);
    });

    it("should render a div element with a className of 'profile-avatar-container'", () => {
        props.location.pathname = "/profile";
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <SidePanel.WrappedComponent {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(".profile-avatar-container").length).toEqual(1);
    });

    it("should render an img element with a className of 'profile-avatar'", () => {
        props.location.pathname = "/profile";
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <SidePanel.WrappedComponent {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("img").length).toEqual(1);
        expect(wrapper.find(".profile-avatar").length).toEqual(1);
    });

    it("should render an p element with a className of 'avatar-caption'", () => {
        props.location.pathname = "/profile";
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <SidePanel.WrappedComponent {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").length).toEqual(1);
        expect(wrapper.find(".avatar-caption").length).toEqual(1);
    });

    it("should render an ul element with a className of 'profile-option'", () => {
        props.location.pathname = "/profile";
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <SidePanel.WrappedComponent {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("ul").length).toEqual(1);
        expect(wrapper.find(".profile-options").length).toEqual(1);
    });

    describe("profile view", () => {
        it("should render 7 li elements", () => {
            props.location.pathname = "/profile";
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <SidePanel.WrappedComponent {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find("li").length).toEqual(7);
        });

        it("should render 3 Link components", () => {
            props.location.pathname = "/profile";
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <SidePanel.WrappedComponent {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find(Link).length).toEqual(3);
        });

        it("should render 7 a elements", () => {
            props.location.pathname = "/profile";
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <SidePanel.WrappedComponent {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find("a").length).toEqual(7);
        });

        it("should call history.push on logout", () => {
            props.location.pathname = "/profile";
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <SidePanel.WrappedComponent {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find("a").at(6).simulate("click");
            expect(props.history.push).toBeCalled();
        });
    });

    describe("account view", () => {
        it("should render 5 li elements", () => {
            props.location.pathname = "/account";
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <SidePanel.WrappedComponent {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find("li").length).toEqual(5);
        });

        it("should render 2 Link components", () => {
            props.location.pathname = "/account";
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <SidePanel.WrappedComponent {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find(Link).length).toEqual(2);
        });

        it("should render 5 a elements", () => {
            props.location.pathname = "/account";
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <SidePanel.WrappedComponent {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find("a").length).toEqual(5);
        });

        it("should call history.push on logout", () => {
            props.location.pathname = "/account";
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <SidePanel.WrappedComponent {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find("a").at(4).simulate("click");
            expect(props.history.push).toBeCalled();
        });
    });

    describe("messages view", () => {
        it("should render 4 li elements", () => {
            props.location.pathname = "/messages";
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <SidePanel.WrappedComponent {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find("li").length).toEqual(4);
        });

        it("should render 3 Link components", () => {
            props.location.pathname = "/messages";
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <SidePanel.WrappedComponent {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find(Link).length).toEqual(3);
        });

        it("should render 4 a elements", () => {
            props.location.pathname = "/messages";
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <SidePanel.WrappedComponent {...props} />
                    </Router>
                </Provider>
            );
            expect(wrapper.find("a").length).toEqual(4);
        });

        it("should call history.push on logout", () => {
            props.location.pathname = "/messages";
            const wrapper = mount(
                <Provider store={reduxStore}>
                    <Router>
                        <SidePanel.WrappedComponent {...props} />
                    </Router>
                </Provider>
            );
            wrapper.find("a").at(3).simulate("click");
            expect(props.history.push).toBeCalled();
        });
    });
});
