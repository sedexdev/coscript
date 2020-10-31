import React, { cloneElement } from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";

import { Provider } from "react-redux";
import { reduxStore } from "../../redux/store/reduxStore";

import { TextEditor } from "./TextEditor";
import { FilePanel } from "./FilePanel";
import ProjectForm from "./ProjectForm";
import { ChatBot } from "./ChatBot";

const projectData = require("./test-data/projectData.json");
const fileData = require("./test-data/fileData.json");
const userData = require("./test-data/user.json");

describe("TextEditor component", () => {
    let props,
        mockLoadProject,
        mockGetProjectCollaborators,
        mockLoadFile,
        mockClearFileData,
        mockTextEditor;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        global.HTMLMediaElement.prototype.play = jest.fn();
        mockLoadProject = jest.fn();
        mockGetProjectCollaborators = jest.fn();
        mockLoadFile = jest.fn();
        mockClearFileData = jest.fn();
        mockTextEditor = function () {
            this.textEditor = {
                contentWindow: {
                    document: {
                        designMode: "",
                        body: {
                            innerHTML: "",
                            focus: jest.fn(),
                            addEventListener: jest.fn(),
                            style: {},
                            appendChild: jest.fn(),
                        },
                        addEventListener: jest.fn(),
                    },
                },
            };
        };
        props = {
            user: userData,
            saveDraft: jest.fn(),
            publishProject: jest.fn(),
            loadProject: mockLoadProject,
            getProjectCollaborators: mockGetProjectCollaborators,
            collaboratorsArray: [],
            loadFile: mockLoadFile,
            updateFile: jest.fn(),
            clearFileData: mockClearFileData,
        };
    });

    afterEach(() => {
        props.projectData = null;
        props.fileData = null;
        props.location = null;
    });

    test("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
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
                        <TextEditor {...props} />
                    </Router>
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render the FilePanel component on mount", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(FilePanel).length).toEqual(1);
    });

    it("should render the ChatBot component on mount if the projectData prop is a valid object", () => {
        props.projectData = projectData;
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find(ChatBot).length).toEqual(1);
    });

    it("should render a main element with a className of text-editor-main", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find({ className: "text-editor-main" }).length).toEqual(
            1
        );
    });

    it("should render 2 select elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("select").length).toEqual(2);
    });

    it("should render 2 input elements with a className of colourBtn", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find({ className: "colourBtn" }).length).toEqual(2);
    });

    it("should render a div elements with a className of editor-toolbar", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find({ className: "editor-toolbar" }).length).toEqual(1);
    });

    it("should render 22 button elements in total", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("button").length).toEqual(22);
    });

    it("should render 19 i elements in total", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("i").length).toEqual(19);
    });

    it("should render an iframe element with a className of text-editor", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("iframe").length).toEqual(1);
        expect(wrapper.find({ className: "text-editor" }).length).toEqual(1);
    });

    it("Should call `loadFile()` action creator if there is some file data", () => {
        props.fileData = fileData;
        props.location = { pathname: null };
        jest.spyOn(TextEditor.prototype, "setTextEditor").mockImplementation(
            mockTextEditor
        );
        mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
                </Router>
            </Provider>
        );
        expect(mockLoadFile).toBeCalled();
    });

    it("Should call `loadProject()` and `clearFileData()` action creators if there is some project data", async () => {
        props.projectData = projectData;
        props.location = { pathname: null };
        jest.spyOn(TextEditor.prototype, "setTextEditor").mockImplementation(
            mockTextEditor
        );
        mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
                </Router>
            </Provider>
        );
        await expect(mockLoadProject).toBeCalled();
        expect(mockClearFileData).toBeCalled();
    });

    it("Should call `getProjectCollaborators()` action creator when component updates", async () => {
        props.projectData = projectData;
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
                </Router>
            </Provider>
        );
        await wrapper.update();
        expect(mockGetProjectCollaborators).toBeCalled();
    });
});

describe("FilePanel component", () => {
    let textEditorProps,
        props,
        mockPublishProject,
        mockGetAllProjects,
        mockCreateNewFolder,
        mockCreateNewFile;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        mockPublishProject = jest.fn();
        mockGetAllProjects = jest.fn();
        mockCreateNewFolder = jest.fn();
        mockCreateNewFile = jest.fn();
        textEditorProps = {
            user: userData,
            saveDraft: jest.fn(),
            publishProject: mockPublishProject,
            loadProject: jest.fn(),
            getProjectCollaborators: jest.fn(),
            collaboratorsArray: [],
            loadFile: jest.fn(),
            updateFile: jest.fn(),
            clearFileData: jest.fn(),
        };
        props = {
            revealFilePanel: true,
            revealProjectForm: jest.fn(),
            revealPublishWindow: jest.fn(),
            cancelPublish: jest.fn(),
            submitPublish: jest.fn(),
            projectForm: false,
            collaborators: [],
            revealPublish: false,
            onClick: jest.fn(),
            onSubmit: jest.fn(),
            loadFile: jest.fn(),
            loadProject: jest.fn(),
            clearFileData: jest.fn(),
            clearProjectData: jest.fn(),
            getAllProjects: mockGetAllProjects,
            createNewFolder: mockCreateNewFolder,
            createNewFile: mockCreateNewFile,
        };
    });

    afterEach(() => {
        props.projectData = null;
    });

    it("should render an aside element with a className of file-panel-container", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <FilePanel {...props} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("aside").length).toEqual(1);
        expect(
            wrapper.find({ className: "file-panel-container" }).length
        ).toEqual(1);
    });

    it("should render with with 5 buttons on mount", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <FilePanel {...props} />
                </Router>
            </Provider>
        );
        const filePanelWrapper = wrapper.find(FilePanel);
        expect(filePanelWrapper.find("button").length).toEqual(5);
    });

    it("should change the 'file-panel' className to 'file-panel reveal' when the reveal button is clicked", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...textEditorProps} />
                </Router>
            </Provider>
        );
        wrapper.find({ className: "panel-btn" }).at(0).simulate("click");

        const filePanelWrapper = wrapper.find(FilePanel);
        expect(
            filePanelWrapper.find({ className: "file-panel reveal" }).length
        ).toEqual(1);
    });

    it("should render the ProjectForm component when the 'Create' button is clicked", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...textEditorProps} />
                </Router>
            </Provider>
        );
        wrapper.find({ className: "panel-btn" }).at(0).simulate("click");

        const filePanelWrapper = wrapper.find(FilePanel);
        filePanelWrapper
            .find({ className: "file-btn new" })
            .at(0)
            .simulate("click");

        expect(wrapper.find(ProjectForm).length).toEqual(1);
    });

    it("should render the publish form when the 'Publish' button is clicked", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...textEditorProps} />
                </Router>
            </Provider>
        );
        wrapper.find({ className: "panel-btn" }).at(0).simulate("click");

        const filePanelWrapper = wrapper.find(FilePanel);
        filePanelWrapper
            .find({ className: "file-btn publish" })
            .at(0)
            .simulate("click");

        expect(
            wrapper.find({ className: "publish-project-container" }).length
        ).toEqual(1);
    });

    it("should render the new folder form when the 'Folder' button is clicked", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...textEditorProps} />
                </Router>
            </Provider>
        );
        wrapper.find({ className: "panel-btn" }).at(0).simulate("click");

        const filePanelWrapper = wrapper.find(FilePanel);
        filePanelWrapper
            .find({ className: "file-btn" })
            .at(0)
            .simulate("click");

        expect(
            wrapper.find({ className: "new-folder-container" }).length
        ).toEqual(1);
    });

    it("should render the new file form when the 'File' button is clicked", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...textEditorProps} />
                </Router>
            </Provider>
        );
        wrapper.find({ className: "panel-btn" }).at(0).simulate("click");

        const filePanelWrapper = wrapper.find(FilePanel);
        filePanelWrapper
            .find({ className: "file-btn" })
            .at(1)
            .simulate("click");

        expect(
            wrapper.find({ className: "new-folder-container" }).length
        ).toEqual(1);
    });

    it("should call publishProject when the publish form is submitted", async () => {
        textEditorProps.user = { userId: projectData.user };
        textEditorProps.projectData = projectData;
        textEditorProps.history = { push: jest.fn() };
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...textEditorProps} />
                </Router>
            </Provider>
        );

        wrapper.find({ className: "panel-btn" }).at(0).simulate("click");
        wrapper.find({ className: "file-btn publish" }).at(0).simulate("click");

        await act(async () => {
            wrapper
                .find({ className: "project-publish-form" })
                .simulate("submit", { preventDefault: jest.fn() });
        });
        expect(mockPublishProject).toBeCalled();
    });
});

describe("ProjectForm component", () => {
    let props;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        props = {
            user: userData,
            saveDraft: jest.fn(),
            publishProject: jest.fn(),
            loadProject: jest.fn(),
            getProjectCollaborators: jest.fn(),
            collaboratorsArray: [],
            loadFile: jest.fn(),
            updateFile: jest.fn(),
            clearFileData: jest.fn(),
        };
    });

    it("should render an aside element (2 in total) with a className of project-form-wrapper", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
                </Router>
            </Provider>
        );
        wrapper.find({ className: "panel-btn" }).at(0).simulate("click");

        const filePanelWrapper = wrapper.find(FilePanel);
        filePanelWrapper
            .find({ className: "file-btn new" })
            .at(0)
            .simulate("click");

        expect(wrapper.find("aside").length).toEqual(2);
        expect(
            wrapper.find({ className: "project-form-wrapper" }).length
        ).toEqual(1);
    });

    it("should render a form element with a className of project-form-wrapper", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
                </Router>
            </Provider>
        );
        wrapper.find({ className: "panel-btn" }).at(0).simulate("click");

        const filePanelWrapper = wrapper.find(FilePanel);
        filePanelWrapper
            .find({ className: "file-btn new" })
            .at(0)
            .simulate("click");

        expect(wrapper.find("form").length).toEqual(1);
        expect(wrapper.find({ className: "project-form" }).length).toEqual(1);
    });

    it("should render 4 label elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
                </Router>
            </Provider>
        );
        wrapper.find({ className: "panel-btn" }).at(0).simulate("click");

        const filePanelWrapper = wrapper.find(FilePanel);
        filePanelWrapper
            .find({ className: "file-btn new" })
            .at(0)
            .simulate("click");

        expect(wrapper.find("label").length).toEqual(4);
    });

    it("should render 5 input elements (7 in total)", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
                </Router>
            </Provider>
        );
        wrapper.find({ className: "panel-btn" }).at(0).simulate("click");

        const filePanelWrapper = wrapper.find(FilePanel);
        filePanelWrapper
            .find({ className: "file-btn new" })
            .at(0)
            .simulate("click");

        expect(wrapper.find("input").length).toEqual(7);
    });

    it("should render 1 textarea element", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...props} />
                </Router>
            </Provider>
        );
        wrapper.find({ className: "panel-btn" }).at(0).simulate("click");

        const filePanelWrapper = wrapper.find(FilePanel);
        filePanelWrapper
            .find({ className: "file-btn new" })
            .at(0)
            .simulate("click");

        expect(wrapper.find("textarea").length).toEqual(1);
    });

    it("should call history.push when the project form is submitted", async () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor
                        {...props}
                        projectData={projectData}
                        history={{ push: jest.fn() }}
                    />
                </Router>
            </Provider>
        );
        wrapper.find({ className: "panel-btn" }).at(0).simulate("click");

        const filePanelWrapper = wrapper.find(FilePanel);
        filePanelWrapper
            .find({ className: "file-btn new" })
            .at(0)
            .simulate("click");

        const fakeEvent = {
            preventDefault: () => {},
        };

        wrapper
            .find({ className: "project-form" })
            .simulate("submit", fakeEvent);

        expect(
            wrapper.props().children.props.children.props.history.push
        ).toBeCalled();
    });
});

describe("ChatBot component", () => {
    let textEditorProps, props, mockGetMessages, mockSendMessage;
    beforeEach(() => {
        global.scrollTo = jest.fn();
        mockGetMessages = jest.fn();
        mockSendMessage = jest.fn();
        textEditorProps = {
            user: userData,
            saveDraft: jest.fn(),
            publishProject: jest.fn(),
            loadProject: jest.fn(),
            getProjectCollaborators: jest.fn(),
            collaboratorsArray: [],
            loadFile: jest.fn(),
            updateFile: jest.fn(),
            clearFileData: jest.fn(),
            projectData: projectData,
        };
        props = {
            user: {},
            projectData: projectData,
            revealChatBot: true,
            onClick: jest.fn(),
            getMessages: mockGetMessages,
            sendMessage: mockSendMessage,
        };
    });

    it("should call getMessages on update", async () => {
        jest.spyOn(ChatBot.prototype, "componentDidUpdate").mockImplementation(
            mockGetMessages()
        );
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <ChatBot {...props} />
                </Router>
            </Provider>
        );
        wrapper.setProps({});
        await expect(mockGetMessages).toBeCalled();
    });

    it("should render an aside element with a className of chat-bot-container", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...textEditorProps} />
                </Router>
            </Provider>
        );

        const chatWrapper = wrapper.find(ChatBot);
        expect(chatWrapper.find("aside").length).toEqual(1);
        expect(
            chatWrapper.find({ className: "chat-bot-container" }).length
        ).toEqual(1);
    });

    it("Should render a div elements with className of chat-window", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...textEditorProps} />
                </Router>
            </Provider>
        );
        expect(wrapper.find({ className: "chat-window" }).length).toEqual(1);
    });

    it("Should render a form elements with className of editor-chat-form", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...textEditorProps} />
                </Router>
            </Provider>
        );
        expect(wrapper.find("form").length).toEqual(1);
        expect(wrapper.find({ className: "editor-chat-form" }).length).toEqual(
            1
        );
    });

    it("Should render 2 button elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...textEditorProps} />
                </Router>
            </Provider>
        );
        const chatWrapper = wrapper.find(ChatBot);
        expect(chatWrapper.find("button").length).toEqual(2);
    });

    it("Should render 2 i elements", () => {
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...textEditorProps} />
                </Router>
            </Provider>
        );

        const chatWrapper = wrapper.find(ChatBot);
        expect(chatWrapper.find("i").length).toEqual(2);
    });

    it("should call sendMessage when the chat form is submitted", async () => {
        jest.spyOn(ChatBot.prototype, "onClickSend").mockImplementation(
            mockSendMessage()
        );
        const wrapper = mount(
            <Provider store={reduxStore}>
                <Router>
                    <TextEditor {...textEditorProps} />
                </Router>
            </Provider>
        );
        await expect(mockSendMessage).toBeCalled();
    });
});
