import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import { Projects } from "./Projects";
import { Heading } from "./Heading";
import NavBar from "../NavBar";
import PostButton from "../buttons/PostButton";
import Footer from "../Footer";

describe("Projects component", () => {
    let props, mockClearFileData, mockLoadAllProjects;
    beforeEach(() => {
        global.HTMLMediaElement.prototype.pause = jest.fn();
        global.scrollTo = jest.fn();
        mockClearFileData = jest.fn();
        mockLoadAllProjects = jest.fn();
        props = {
            loadProject: jest.fn(),
            loadAllProjects: mockLoadAllProjects,
            clearFileData: mockClearFileData,
            projectArray: [],
        };
    });

    test("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <Projects {...props} />
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
                        <Projects {...props} />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a main component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Projects {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("main").length).toEqual(1);
    });

    it("should render the NavBar component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Projects {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(NavBar).length).toEqual(1);
    });

    it("should render the Heading component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Projects {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Heading).length).toEqual(1);
    });

    it("should render the Footer component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Projects {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Footer).length).toEqual(1);
    });

    it("should call `clearFileData()` on mount", () => {
        mount(
            <Provider store={reduxStore}>
                <Router>
                    <Projects {...props} />
                </Router>
            </Provider>
        );
        expect(mockClearFileData).toBeCalled();
    });

    it("should call `loadAllProjects()` on mount", async () => {
        mount(
            <Provider store={reduxStore}>
                <Router>
                    <Projects {...props} />
                </Router>
            </Provider>
        );
        await expect(mockLoadAllProjects).toBeCalled();
    });
});

describe("Heading component", () => {
    let props;
    beforeEach(() => {
        props = {
            banner: "",
            bannerHeading: "",
            searchPlaceholder: "",
            searchCriteria: "",
            onChange: jest.fn(),
            setProjects: jest.fn(),
            loadAllProjects: jest.fn(),
            projectArray: [],
        };
    });

    it("should render a header element with a className of banner-container", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Heading {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("header").length).toEqual(1);
        expect(wrapper.find({ className: "banner-container" }).length).toEqual(
            1
        );
    });

    it("should render a form element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Heading {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("form").length).toEqual(1);
    });

    it("should render 2 input elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Heading {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("input").length).toEqual(2);
    });

    it("should render a select element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Heading {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("select").length).toEqual(1);
    });

    it("should render 3 option elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Heading {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("option").length).toEqual(3);
    });

    it("should render the PostButton component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Heading {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(PostButton).length).toEqual(1);
    });
});
