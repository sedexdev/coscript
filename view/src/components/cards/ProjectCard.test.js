import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import ProjectCard from "./ProjectCard";
import Button from "../buttons/Button";

describe("ProjectCard component", () => {
    test("renders without crashing", () => {
        global.scrollTo = jest.fn();
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <ProjectCard />
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
                        <ProjectCard />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a div element with a className of card-item", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ProjectCard />
                </Router>
            </Provider>
        );
        expect(wrapper.find({ className: "card-item" }).length).toEqual(1);
    });

    it("should render a div element with a className of card-box-image-container", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ProjectCard />
                </Router>
            </Provider>
        );
        expect(
            wrapper.find({ className: "card-box-image-container" }).length
        ).toEqual(1);
    });

    it("should render a div element with a className of card-item-details", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ProjectCard />
                </Router>
            </Provider>
        );
        expect(wrapper.find({ className: "card-item-details" }).length).toEqual(
            1
        );
    });

    it("should render 3 p elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ProjectCard />
                </Router>
            </Provider>
        );
        expect(wrapper.find("p").length).toEqual(3);
    });

    it("should render a Button component on mount", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ProjectCard />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Button).length).toEqual(1);
    });
});
