import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import { Index } from "./Index";
import NavBar from "../NavBar";
import ServiceBox from "./ServiceBox";
import { CarouselMenu } from "./CarouselMenu";
import Footer from "../Footer";

import * as projectsActions from "../../redux/auxiliary/projects";

const originalShuffle = projectsActions.shuffle;

describe("Index component", () => {
    let mockClearFileData, mockLoadAllProjects, props;
    beforeEach(() => {
        global.HTMLMediaElement.prototype.pause = jest.fn();
        global.scrollTo = jest.fn();
        mockClearFileData = jest.fn();
        mockLoadAllProjects = jest.fn();
        props = {
            clearFileData: mockClearFileData,
            loadAllProjects: mockLoadAllProjects,
        };
    });

    afterAll(() => {
        projectActions.shuffle = originalShuffle;
    });

    test("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <Index {...props} />
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
                        <Index {...props} />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a main element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Index {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("main").length).toEqual(1);
    });

    it("should render the NavBar component on mount", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Index {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(NavBar).length).toEqual(1);
    });

    it("should render 4 section elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Index {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("section").length).toEqual(4);
    });

    it("should render 3 ServiceBox components on mount", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Index {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(ServiceBox).length).toEqual(3);
    });

    it("should render 11 p tags", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Index {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").length).toEqual(11);
    });

    it("should render the CarouselMenu component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Index {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(CarouselMenu).length).toEqual(1);
    });

    it("should render the Footer component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Index {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Footer).length).toEqual(1);
    });

    it("should call `clearFileData()` on mount", () => {
        mount(
            <Provider store={reduxStore}>
                <Router>
                    <Index {...props} />
                </Router>
            </Provider>
        );
        expect(mockClearFileData).toBeCalled();
    });

    it("should call `mockLoadAllProjects()` on mount", () => {
        mount(
            <Provider store={reduxStore}>
                <Router>
                    <Index {...props} />
                </Router>
            </Provider>
        );
        expect(mockLoadAllProjects).toBeCalled();
    });
});

describe("CarouselMenu component", () => {
    let mockLoadAllProjects, mockLoadProject, props;
    beforeEach(() => {
        global.HTMLMediaElement.prototype.pause = jest.fn();
        global.scrollTo = jest.fn();
        mockLoadProject = jest.fn(() => Promise.resolve());
        mockLoadAllProjects = jest.fn(() => Promise.resolve());
        props = {
            loadProject: mockLoadProject,
            activeTab: true,
            onClick: jest.fn(),
        };
    });

    afterAll(() => {
        projectsActions.shuffle = originalShuffle;
    });

    it("should render a section element with a className of carousel", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <CarouselMenu {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find({ className: "carousel" }).length).toEqual(1);
    });

    it("should render 4 button elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <CarouselMenu {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("button").length).toEqual(4);
    });

    it("should render a div element with a className of carousel-container", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <CarouselMenu {...props} />
                </Router>
            </Provider>
        );
        expect(
            wrapper.find({ className: "carousel-container" }).length
        ).toEqual(1);
    });
});
