import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import NavBar from "../NavBar";
import FilePanel from "./FilePanel";
import ChatBot from "./ChatBot";

import { getEditorFunctions, classes, icons, fonts } from "./util/data";
import { playSoundEffect } from "../../redux/auxiliary/typing-sound-effect";

// Redux
import { connect } from "react-redux";
import {
    saveDraft,
    publishProject,
    loadProject,
    getProjectCollaborators,
} from "../../redux/actions/documents";
import { loadFile, updateFile, clearFileData } from "../../redux/actions/files";

import PropTypes from "prop-types";

import "./text-editor.css";

export class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textEditor: null,
            revealFilePanel: false,
            projectForm: false,
            revealFile: false,
            revealFolder: false,
            revealChatBot: false,
            classes: classes,
            icons: icons,
            fonts: fonts,
            revealPublish: false,
            folders: [],
            fileName: "",
            folderName: "",
            loading: false,
            loadingProjects: false,
            messageText: "",
        };
        this.setTextEditor = this.setTextEditor.bind(this);
        this.openFile = this.openFile.bind(this);
        this.openDocument = this.openDocument.bind(this);
        this.editorSetup = this.editorSetup.bind(this);
        this.textEditorInitialSetup = this.textEditorInitialSetup.bind(this);
        this.revealPanel = this.revealPanel.bind(this);
        this.revealProjectForm = this.revealProjectForm.bind(this);
        this.displayFolder = this.displayFolder.bind(this);
        this.removeFolder = this.removeFolder.bind(this);
        this.displayFile = this.displayFile.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.revealProjectForm = this.revealProjectForm.bind(this);
        this.removeProjectForm = this.removeProjectForm.bind(this);
        this.revealPublishWindow = this.revealPublishWindow.bind(this);
        this.cancelPublish = this.cancelPublish.bind(this);
        this.submitPublish = this.submitPublish.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.revealChat = this.revealChat.bind(this);
        this.assignFontStyles = this.assignFontStyles.bind(this);
        this.setFolders = this.setFolders.bind(this);
        this.setFileName = this.setFileName.bind(this);
        this.setFolderName = this.setFolderName.bind(this);
        this.setLoading = this.setLoading.bind(this);
        this.setLoadingProjects = this.setLoadingProjects.bind(this);
        this.setMessageText = this.setMessageText.bind(this);
        this.fontSelect = React.createRef();
        this.textEditor = React.createRef();
    }

    /**
     * Sets the browser tab title and scrolls to
     * the top of the page when the component mounts.about.
     * Also checks the value of the 'fileData' prop to
     * see if the editor should open a file or a project
     */
    async componentDidMount() {
        document.title = "CoScript - Workspace";
        window.scrollTo(0, 0);

        this.assignFontStyles();

        const { fileData } = this.props;

        if (fileData) {
            this.openFile();
        } else {
            this.openDocument("project", true);
        }
    }

    /**
     * Checks to see which collaborators are currently online every
     * time the component updates to dynamically update the UI with
     * active user's Gravatar images
     */
    async componentDidUpdate() {
        const { projectData, getProjectCollaborators } = this.props;
        if (projectData) {
            await getProjectCollaborators(projectData.collaborators);
        }
    }

    /**
     * Set the reference on the iframe ot this.textEditor
     *
     * @param {Object} textEditor - element reference
     */
    setTextEditor(textEditor) {
        this.textEditor = textEditor;
    }

    /**
     * Opens a document in the editor. Firstly checks to see if
     * document type checking should be skipped. If not, it compares
     * the type ("project" or "file") to see what data it needs to
     * load and which content auto-save functions it needs. If type
     * checking is skipped, a project is opened.
     *
     * Then checks if user and document data is present. Also whether
     * the logged-in user's id doesn't match the document users id, and
     * if the this.textEditor ref is not null. If this check passes,
     * the document is opened in read only mode (designMode = "off").
     *
     * If the check fails, a check is done to see if any document data
     * can be loaded into the editor. If it can , the document is loaded,
     * otherwise, the user is shown the workspace welcome message
     *
     * @param {String} type       - type of document to open
     * @param {Boolean} skipCheck - skips conditional checking
     *                              of document data if true
     */
    async openDocument(type, skipCheck = false) {
        const {
            user,
            projectData,
            fileData,
            loadProject,
            loadFile,
            saveDraft,
            updateFile,
            clearFileData,
        } = this.props;

        let data, saveFunction, id;
        if (!skipCheck) {
            data = type === "project" ? projectData : fileData;
            saveFunction =
                type === "project" && fileData.master ? saveDraft : updateFile;
            id = type === "project" ? projectData.user : fileData.userId;
        } else {
            data = projectData;
            saveFunction = saveDraft;
            id = projectData ? projectData.user : "";
        }

        if (
            user &&
            data &&
            user.userId !== id &&
            this.textEditor &&
            this.textEditor.contentWindow
        ) {
            const textEditor = this.textEditor.contentWindow.document;
            textEditor.designMode = "off";
            textEditor.body.innerHTML = data.content;

            textEditor.addEventListener("mousedown", () => {
                this.setState({
                    textEditor,
                    revealFilePanel: false,
                    revealChatBot: false,
                    projectForm: false,
                    revealPublish: false,
                    revealFolder: false,
                    revealFile: false,
                });
            });
        } else {
            if (data && this.textEditor && this.textEditor.contentWindow) {
                if (type === "project") {
                    await loadProject(data);
                    clearFileData();
                } else {
                    await loadFile(data.id);
                }
                const textEditor = this.textEditor.contentWindow.document;
                this.editorSetup(data, textEditor, saveFunction);
            } else if (
                !data &&
                this.textEditor &&
                this.textEditor.contentWindow
            ) {
                const textEditor = this.textEditor.contentWindow.document;
                this.textEditorInitialSetup(textEditor);
            }
        }
    }

    /**
     * Checks the user's profile property 'userProjects' to see
     * if the user has any projects. If they don't and the user
     * landed on the page via the pathname '/editor', the function
     * tries to load a project. Otherwise function attempts to
     * open a file
     */
    async openFile() {
        const {
            user,
            location: { pathname },
        } = this.props;

        if (!user.profile.userProjects.length && pathname === "/editor") {
            this.openDocument("project", true);
            return;
        } else {
            this.openDocument("file");
        }
    }

    /**
     * Sets up the editor so the user can edit the document
     * in the workspace (sets designMode = "on"). Also adds
     * event listeners to the editing canvas that update state
     * on 'keydown' and on 'click' events
     *
     * @param {Object} data    - the document data
     * @param {Ref} textEditor - the textEditor React element
     * @param {Function} save  - the save function used to save
     *                           the documents content
     */
    editorSetup(data, textEditor, save) {
        textEditor.designMode = "on";
        textEditor.body.innerHTML = data.content;
        textEditor.body.focus();

        textEditor.addEventListener("keydown", async () => {
            await save(textEditor.body.innerHTML, data);
            this.setState({
                textEditor,
            });
        });

        textEditor.addEventListener("mousedown", async () => {
            await save(textEditor.body.innerHTML, data);
            this.setState({
                textEditor,
                revealFilePanel: false,
                revealChatBot: false,
                projectForm: false,
                revealPublish: false,
                revealFolder: false,
                revealFile: false,
            });
        });

        this.setState({
            textEditor,
        });
    }

    /**
     * Sets the styles for the textEditor iFrame element when
     * the user opens the workspace and they have no projects
     * or files to edit/read.
     *
     * @param {Ref} textEditor - the textEditor React element
     */
    textEditorInitialSetup(textEditor) {
        textEditor.body.style.wordWrap = "break-word";
        textEditor.body.style.whiteSpace = "normal";
        textEditor.body.style.fontFamily = "Consolas";
        textEditor.body.style.letterSpacing = "1px";
        textEditor.body.style.color = "#222";
        textEditor.body.style.fontSize = "3.4rem";
        textEditor.body.style.textAlign = "center";
        const div = document
            .createElement("div")
            .appendChild(document.createElement("br"));
        textEditor.body.appendChild(div);

        this.printWelcomeMessage(
            textEditor,
            "Welcome to your workspace! Open the file panel on your left to start a new project p.s There is no need to worry about saving, your work is constantly auto-saved as you type :)"
        );
    }

    /**
     * Prints a welcome message to the canvas with the
     * sound of a typewriter
     *
     * @param {Ref} textEditor - the textEditor React element
     * @param {String} message      - welcome message
     */
    printWelcomeMessage(textEditor, message) {
        const msg = setInterval(print, 100);
        playSoundEffect();
        let i = 0;
        function print() {
            if (i === message.length) {
                clearInterval(msg);
            } else {
                textEditor.body.innerHTML += message[i];
                i++;
            }
        }
    }

    /**
     * Reveals the FilePanel. Hides all the
     * FilePanel pop-up windows
     */
    revealPanel() {
        this.setState((state) => ({
            revealFilePanel: !state.revealFilePanel,
            projectForm: false,
            revealPublish: false,
            revealFolder: false,
            revealFile: false,
        }));
    }

    /**
     * Reveals the workspace instant chat service
     */
    revealChat() {
        this.setState((state) => ({
            revealChatBot: !state.revealChatBot,
        }));
    }

    /**
     * Reveals the form used to create new projects.
     * Hides all other FilePanel pop-up windows
     */
    revealProjectForm() {
        this.setState({
            projectForm: true,
            revealPublish: false,
            revealFolder: false,
            revealFile: false,
        });
    }

    /**
     * Hides the FilePanel create new project form
     */
    removeProjectForm() {
        this.setState({
            projectForm: false,
        });
    }

    /**
     * Reveals the form used to create new folder.
     * Hides all other FilePanel pop-up windows
     */
    displayFolder() {
        this.setState({
            projectForm: false,
            revealPublish: false,
            revealFolder: true,
            revealFile: false,
        });
    }

    /**
     * Hides the FilePanel create new folder form
     */
    removeFolder() {
        this.setState({
            revealFolder: false,
        });
    }

    /**
     * Reveals the form used to create new files.
     * Hides all other FilePanel pop-up windows
     */
    displayFile() {
        this.setState({
            projectForm: false,
            revealPublish: false,
            revealFolder: false,
            revealFile: true,
        });
    }

    /**
     * Hides the FilePanel create new file form
     */
    removeFile() {
        this.setState({
            revealFile: false,
        });
    }

    /**
     * Reveals the form used to publish projects.
     * Hides all other FilePanel pop-up windows
     */
    revealPublishWindow() {
        this.setState({
            projectForm: false,
            revealPublish: true,
            revealFolder: false,
            revealFile: false,
        });
    }

    /**
     * Hides the FilePanel publish project form
     */
    cancelPublish() {
        this.setState({
            revealPublish: false,
        });
    }

    /**
     * Set the folders state variable
     */
    setFolders(value) {
        this.setState({
            folders: value,
        });
    }

    /**
     * Sets the fileName state value
     */
    setFileName(value) {
        this.setState({
            fileName: value,
        });
    }

    /**
     * Sets the folderName state value
     */
    setFolderName(value) {
        this.setState({
            folderName: value,
        });
    }

    /**
     * Sets the loading state value
     */
    setLoading(value) {
        this.setState({
            loading: value,
        });
    }

    /**
     * Sets the loadingProjects state value
     */
    setLoadingProjects(value) {
        this.setState({
            loadingProjects: value,
        });
    }

    /**
     * Sets the messageText state variable
     */
    setMessageText(value) {
        this.setState({
            messageText: value,
        });
    }

    /**
     * Submits a project for publishing to the
     * application and redirects the user to the
     * 'Published' section of the application once
     * the project is published
     *
     * @param {Object} e - event object
     */
    async submitPublish(e) {
        e.preventDefault();
        const { user, projectData, publishProject, history } = this.props;
        if (user && projectData && user.userId === projectData.user) {
            await publishProject(projectData);
            history["from"] = "publications";
            history.push("/redirect");
        }
    }

    /**
     * Assigns the font styles to the editor toolbar dropdown
     * menu
     */
    assignFontStyles() {
        if (this.fontSelect.current) {
            const fonts = this.fontSelect.current.children;
            for (let i = 0; i < fonts.length; i++) {
                fonts[i].style.fontFamily = fonts[i].value;
            }
        }
    }

    /**
     * Submits the data to the server for creating a new project
     * in the database
     *
     * @param {Object} data - data used to create a new project
     */
    onSubmit(data) {
        const { history } = this.props;
        history["from"] = "editor";
        history["newProjectData"] = data;
        history.push("/redirect");
    }

    render() {
        const {
            textEditor,
            revealFilePanel,
            projectForm,
            revealFolder,
            revealFile,
            revealPublish,
            revealChatBot,
            classes,
            icons,
            fonts,
            folders,
            fileName,
            folderName,
            loading,
            loadingProjects,
            messageText,
        } = this.state;

        const { user, projectData, collaboratorsArray } = this.props;

        const paletteIcon = require("../../../src/img/icons/palette.svg");
        const highlightIcon = require("../../../src/img/icons/highlighter.svg");

        return (
            <Fragment>
                <NavBar />
                <FilePanel
                    revealFilePanel={revealFilePanel}
                    revealProjectForm={this.revealProjectForm}
                    removeProjectForm={this.removeProjectForm}
                    revealPublishWindow={this.revealPublishWindow}
                    cancelPublish={this.cancelPublish}
                    submitPublish={this.submitPublish}
                    projectForm={projectForm}
                    displayFolder={this.displayFolder}
                    removeFolder={this.removeFolder}
                    displayFile={this.displayFile}
                    removeFile={this.removeFile}
                    revealFolder={revealFolder}
                    revealFile={revealFile}
                    revealPublish={revealPublish}
                    collaborators={collaboratorsArray}
                    onClick={this.revealPanel}
                    onSubmit={this.onSubmit}
                    folders={folders}
                    setFolders={this.setFolders}
                    fileName={fileName}
                    setFileName={this.setFileName}
                    folderName={folderName}
                    setFolderName={this.setFolderName}
                    loading={loading}
                    setLoading={this.setLoading}
                    loadingProjects={loadingProjects}
                    setLoadingProjects={this.setLoadingProjects}
                />
                {projectData && (
                    <ChatBot
                        user={user}
                        projectData={projectData}
                        revealChatBot={revealChatBot}
                        onClick={this.revealChat}
                        messageText={messageText}
                        setMessageText={this.setMessageText}
                    />
                )}
                <main className="text-editor-main">
                    <div className="text-editor-ui-container">
                        <div className="editor-toolbar">
                            <div className="font-menus">
                                <select
                                    className="font-menu"
                                    onChange={(e) =>
                                        textEditor.execCommand(
                                            "FontName",
                                            false,
                                            e.target.value
                                        )
                                    }
                                    ref={this.fontSelect}
                                >
                                    {fonts.map((font, i) => {
                                        return (
                                            <option value={fonts[i]} key={i}>
                                                {font}
                                            </option>
                                        );
                                    })}
                                </select>
                                <select
                                    className="font-menu"
                                    onChange={(e) =>
                                        textEditor.execCommand(
                                            "FontSize",
                                            false,
                                            e.target.value
                                        )
                                    }
                                >
                                    {[...Array(8).keys()].map((size) => {
                                        return (
                                            <option value={size} key={size}>
                                                {size + 8}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <img
                                className="colour-icon"
                                src={`${paletteIcon}`}
                                alt="Palette icon"
                            />
                            <input
                                type="color"
                                id="font-colour"
                                className="colourBtn"
                                title="Change Font Colour"
                                onChange={(e) =>
                                    textEditor.execCommand(
                                        "ForeColor",
                                        false,
                                        e.target.value
                                    )
                                }
                            />
                            <img
                                className="colour-icon"
                                src={`${highlightIcon}`}
                                alt="Highlighter icon"
                            />
                            <input
                                type="color"
                                className="colourBtn"
                                title="Highlight"
                                onChange={(e) =>
                                    textEditor.execCommand(
                                        "BackColor",
                                        false,
                                        e.target.value
                                    )
                                }
                            />
                            {classes.map((el, i) => {
                                return (
                                    <button
                                        className={el}
                                        title={icons[i].title}
                                        key={i}
                                        onClick={
                                            getEditorFunctions(textEditor)[el]
                                        }
                                    >
                                        {/* <i className={`fas ${icons[i]}`}></i> */}
                                        <img
                                            className="icon-img"
                                            src={`${icons[i].icon}`}
                                            alt={`${icons[i].title} icon`}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="text-editor-wrapper">
                        <iframe
                            className="text-editor"
                            id="text-editor"
                            name="text-editor"
                            frameBorder="0"
                            title="Rich editor"
                            ref={this.setTextEditor}
                        ></iframe>
                    </div>
                </main>
            </Fragment>
        );
    }
}

TextEditor.propTypes = {
    user: PropTypes.object,
    projectData: PropTypes.object,
    saveDraft: PropTypes.func.isRequired,
    publishProject: PropTypes.func.isRequired,
    loadProject: PropTypes.func.isRequired,
    getProjectCollaborators: PropTypes.func.isRequired,
    collaboratorsArray: PropTypes.array,
    loadFile: PropTypes.func.isRequired,
    updateFile: PropTypes.func.isRequired,
    clearFileData: PropTypes.func.isRequired,
};

const setProps = (state) => ({
    user: state.auth.user,
    projectData: state.documents.projectData,
    fileData: state.files.fileData,
    collaboratorsArray: state.documents.collaboratorsArray,
});

export default connect(setProps, {
    saveDraft,
    publishProject,
    loadProject,
    getProjectCollaborators,
    loadFile,
    updateFile,
    clearFileData,
})(withRouter(TextEditor));
