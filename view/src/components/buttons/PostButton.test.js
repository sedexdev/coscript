import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import PostButton from "./PostButton";

describe("PostButton component", () => {
    test("renders without crashing", () => {
        global.scrollTo = jest.fn();
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <PostButton />
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
                        <PostButton />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a single input element with a className that matches the 'classes' prop", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <PostButton
                        onClick={() => {}}
                        classes='test-class'
                        value='Test'
                    />
                </Router>
            </Provider>
        );
        expect(wrapper.find("input").length).toEqual(1);
        expect(wrapper.find({ className: "test-class" }).length).toEqual(1);
    });
});
