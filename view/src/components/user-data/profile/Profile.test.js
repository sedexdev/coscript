import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import { Provider } from "react-redux";
import { reduxStore } from "../../../redux/store/reduxStore";

import { Profile } from "./Profile";
import MobileNav from "../MobileNav";
import SidePanel from "../SidePanel";
import UserInfo from "./UserInfo";
import ProfileForm from "./ProfileForm";
import MyProjects from "./MyProjects";
import Collaborations from "./Collaborations";
import EditProfileData from "./EditProfileData";

const userData = require("../../../redux/tests/actions/data/auth/user.json");
const projectArray = require("../../../redux/tests/actions/data/documents/projectArray.json");

describe("Profile component", () => {
    let props,
        mockUpdateUserProfile,
        mockLoadAllProjects,
        mockUpdateDetails,
        mockGetCollaborations,
        mockClearFileData,
        mockDeleteProject,
        mockDeleteCollaborator;
    beforeEach(() => {
        global.HTMLMediaElement.prototype.pause = jest.fn();
        global.scrollTo = jest.fn();
        mockUpdateUserProfile = jest.fn();
        mockLoadAllProjects = jest.fn();
        mockUpdateDetails = jest.fn();
        mockGetCollaborations = jest.fn();
        mockClearFileData = jest.fn();
        mockDeleteProject = jest.fn();
        mockDeleteCollaborator = jest.fn();
        props = {
            user: userData,
            projectArray: [],
            userCollaborationsArray: [],
            updateUserProfile: mockUpdateUserProfile,
            loadAllProjects: mockLoadAllProjects,
            updateProjectDetails: mockUpdateDetails,
            getUserCollaborations: mockGetCollaborations,
            clearFileData: mockClearFileData,
            deleteProject: mockDeleteProject,
            deleteCollaborator: mockDeleteCollaborator,
        };
    });

    test("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...props} />
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
                        <Profile {...props} />
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
                    <Profile {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("main").length).toEqual(1);
        expect(wrapper.find(".profile-container").length).toEqual(1);
    });

    it("should render the MobileNave component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(MobileNav).length).toEqual(1);
    });

    it("should render the SidePanel component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(SidePanel).length).toEqual(1);
    });

    it("should render the UserInfo component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(UserInfo).length).toEqual(1);
    });

    it("should call `clearFileData()`, `loadAllProjects()` and `getUserCollaborations()` on mount", async () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...props} />
                </Router>
            </Provider>
        );
        expect(mockClearFileData).toBeCalled();
        await expect(mockLoadAllProjects).toBeCalled();
        expect(mockGetCollaborations).toBeCalled();
    });

    it("should call `updateUserProfile()` when the user updates their displayed name", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...props} />
                </Router>
            </Provider>
        );
        wrapper.find("#username-radio").simulate("click");
        expect(mockUpdateUserProfile).toBeCalled();
    });

    it("should call `loadAllProjects()` and `updateProjectDetails()` when user edits a project's details", async () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...props} />
                </Router>
            </Provider>
        );
        wrapper.find(Profile).setState({ displayProjectEditWindow: true });
        wrapper.find(".edit-project-form").simulate("submit", { preventDefault: jest.fn() });
        await expect(mockLoadAllProjects).toBeCalled();
        expect(mockUpdateDetails).toBeCalled();
    });

    it("should call `deleteCollaborator()`", async () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...props} />
                </Router>
            </Provider>
        );
        wrapper.find(Profile).setState({ displayCollaborateDeleteWindow: true });
        wrapper.find(".edit-project-form").at(0).simulate("submit", { preventDefault: jest.fn() });
        await expect(mockDeleteCollaborator).toBeCalled();
    });

    it("should call `deleteProject()`", async () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...props} />
                </Router>
            </Provider>
        );
        wrapper.find(Profile).setState({ displayDeleteProjectWindow: true });
        wrapper.find(".edit-project-form").at(0).simulate("submit", { preventDefault: jest.fn() });
        await expect(mockDeleteProject).toBeCalled();
    });
});

describe("UserInfo component", () => {
    let props;
    beforeEach(() => {
        props = {
            user: userData,
            displayEditWindow: false,
            editField: "",
            editName: "",
            deleteID: "",
            projects: [],
            userCollaborations: [],
            history: {},
            projectTitle: "",
            projectGenres: "",
            projectDescription: "",
            displayProjectEditWindow: false,
            displayDeleteProjectWindow: false,
            openDeleteProjectWindow: jest.fn(),
            removeDeleteProjectWindow: jest.fn(),
            onDeleteProject: jest.fn(),
            displayCollaborateDeleteWindow: false,
            openCollaborateDeleteWindow: jest.fn(),
            removeCollaborateDeleteWindow: jest.fn(),
            onDeleteCollaborate: jest.fn(),
            onClickProject: jest.fn(),
            onSubmitProject: jest.fn(),
            saving: false,
            loading: false,
            savingCollaborate: false,
            inputField: {},
            onChange: jest.fn(),
            onClick: jest.fn(),
            cancelEdit: jest.fn(),
            deleteData: jest.fn(),
            onClickName: jest.fn(),
            onSubmitAbout: jest.fn(),
            onSubmitAuthors: jest.fn(),
            onSubmitBooks: jest.fn(),
        };
    });

    afterAll(() => {
        props.projects = [];
    });

    it("should render the ProfileForm component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <UserInfo {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(ProfileForm).length).toEqual(1);
    });

    it("should render the MyProjects component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <UserInfo {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(MyProjects).length).toEqual(1);
    });

    it("should render the Collaborations component", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <UserInfo {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(Collaborations).length).toEqual(1);
    });

    it("should render the 4 section elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <UserInfo {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("section").length).toEqual(4);
    });

    it("should render a h1 element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <UserInfo {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("h1").length).toEqual(1);
    });

    it("should render 4 h2 elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <UserInfo {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("h2").length).toEqual(4);
    });
});

describe("ProfileForm component", () => {
    let profileProps, props;
    beforeEach(() => {
        profileProps = {
            user: userData,
            projectArray: [],
            userCollaborationsArray: [],
            updateUserProfile: jest.fn(),
            loadAllProjects: jest.fn(),
            updateProjectDetails: jest.fn(),
            getUserCollaborations: jest.fn(),
            clearFileData: jest.fn(),
            deleteProject: jest.fn(),
            deleteCollaborator: jest.fn(),
        };
        props = {
            user: userData,
            displayEditWindow: false,
            editField: "",
            editName: "",
            deleteID: "",
            inputField: {},
            cancelEdit: jest.fn(),
            deleteData: jest.fn(),
            onChange: jest.fn(),
            onClickName: jest.fn(),
            onClick: jest.fn(),
            onSubmitAbout: jest.fn(),
            onSubmitAuthors: jest.fn(),
            onSubmitBooks: jest.fn(),
        };
    });

    it("should render the EditProfileData component if 'displayEditWindow' is true", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...profileProps} />
                </Router>
            </Provider>
        );
        wrapper.find(Profile).setState({ displayEditWindow: true });
        expect(wrapper.find(EditProfileData).length).toEqual(1);
    });

    it("should render a div with a className of 'profile-form-container'", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...profileProps} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(".profile-form-container").length).toEqual(1);
    });

    it("should render 17 div elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...profileProps} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("div").length).toEqual(17);
    });

    it("should render 6 label elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...profileProps} />
                </Router>
            </Provider>
        );

        expect(wrapper.find("label").length).toEqual(6);
    });

    it("should render 3 input elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...profileProps} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("input").length).toEqual(3);
    });

    it("should render 3 ul elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...profileProps} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("ul").length).toEqual(3);
    });

    it("should render 4 button elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...profileProps} />
                </Router>
            </Provider>
        );

        expect(wrapper.find("button").length).toEqual(4);
    });

    it("should render 7 img elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...profileProps} />
                </Router>
            </Provider>
        );

        expect(wrapper.find("img").length).toEqual(7);
    });
});

describe("MyProjects component", () => {
    let profileProps, props;
    beforeEach(() => {
        profileProps = {
            user: userData,
            projectArray: [],
            userCollaborationsArray: [],
            updateUserProfile: jest.fn(),
            loadAllProjects: jest.fn(),
            updateProjectDetails: jest.fn(),
            getUserCollaborations: jest.fn(),
            clearFileData: jest.fn(),
            deleteProject: jest.fn(),
            deleteCollaborator: jest.fn(),
        };
        props = {
            user: userData,
            projects: [],
            projectTitle: "",
            projectGenres: "",
            projectDescription: "",
            displayProjectEditWindow: false,
            displayDeleteProjectWindow: false,
            openDeleteProjectWindow: jest.fn(),
            removeDeleteProjectWindow: jest.fn(),
            onChange: jest.fn(),
            cancelEdit: jest.fn(),
            onDeleteProject: jest.fn(),
            onClickProject: jest.fn(),
            onSubmitProject: jest.fn(),
            saveDate: jest.fn(),
            saving: false,
            loading: false,
            clearFileData: jest.fn(),
            clearProjectData: jest.fn(),
        };
    });

    it("should render a div element with a className of 'delete-project-window' if 'displayEditWindow' is true", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...profileProps} />
                </Router>
            </Provider>
        );
        wrapper.find(Profile).setState({ displayDeleteProjectWindow: true });
        expect(wrapper.find(".delete-project-window").length).toEqual(1);
    });

    it("should render a div element with a className of 'edit-project-details-window' if 'displayProjectEditWindow' is true", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...profileProps} />
                </Router>
            </Provider>
        );
        wrapper.find(Profile).setState({ displayProjectEditWindow: true });
        expect(wrapper.find(".edit-project-details-window").length).toEqual(1);
    });

    it("should render 2 img elements with a className of 'profile-project-loading-spinner' if 'loading' is true", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...profileProps} />
                </Router>
            </Provider>
        );
        wrapper.find(Profile).setState({ loading: true });
        expect(wrapper.find(".profile-project-loading-spinner").length).toEqual(2);
    });

    it("should render a div with a className of 'projects-warning' if the user has no projects", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <MyProjects {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(".projects-warning").length).toEqual(1);
    });
});

describe("Collaborations component", () => {
    let profileProps, props;
    beforeEach(() => {
        profileProps = {
            user: userData,
            projectArray: [],
            userCollaborationsArray: [],
            updateUserProfile: jest.fn(),
            loadAllProjects: jest.fn(),
            updateProjectDetails: jest.fn(),
            getUserCollaborations: jest.fn(),
            clearFileData: jest.fn(),
            deleteProject: jest.fn(),
            deleteCollaborator: jest.fn(),
        };
        props = {
            user: userData,
            userCollaborations: [],
            openCollaborateDeleteWindow: jest.fn(),
            removeCollaborateDeleteWindow: jest.fn(),
            onDeleteCollaborate: jest.fn(),
            savingCollaborate: false,
            loading: false,
            onChange: jest.fn(),
            loadProject: jest.fn(),
        };
    });

    it("should render a div element with a className of 'delete-project-window' if 'displayCollaborateDeleteWindow' is true", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...profileProps} />
                </Router>
            </Provider>
        );
        wrapper.find(Profile).setState({ displayCollaborateDeleteWindow: true });
        expect(wrapper.find(".delete-project-window").length).toEqual(1);
    });

    it("should render 2 img elements with a className of 'profile-project-loading-spinner' if 'loading' is true", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <Profile {...profileProps} />
                </Router>
            </Provider>
        );
        wrapper.find(Profile).setState({ loading: true });
        expect(wrapper.find(".profile-project-loading-spinner").length).toEqual(2);
    });
});
