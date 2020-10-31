import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import { Publications } from "./Publications";
import { Heading } from "./Heading";
import NavBar from "../NavBar";
import Footer from "../Footer";

describe("Publications component", () => {
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
                    <Publications {...props} />
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
                        <Publications {...props} />
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
                    <Publications {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("main").length).toEqual(1);
    });

    it("should render the NavBar component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Publications {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(NavBar).length).toEqual(1);
    });

    it("should render the Heading component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Publications {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Heading).length).toEqual(1);
    });

    it("should render the Footer component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Publications {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Footer).length).toEqual(1);
    });

    it("should call `clearFileData()` on mount", () => {
        mount(
            <Provider store={reduxStore}>
                <Router>
                    <Publications {...props} />
                </Router>
            </Provider>
        );
        expect(mockClearFileData).toBeCalled();
    });

    it("should call `loadAllPublications()` on mount", async () => {
        mount(
            <Provider store={reduxStore}>
                <Router>
                    <Publications {...props} />
                </Router>
            </Provider>
        );
        await expect(mockLoadAllProjects).toBeCalled();
    });
});
