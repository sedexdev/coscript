import React, { Fragment, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";

import Tree from "@naisutech/react-tree";
import ProjectForm from "./ProjectForm";

import { baseFolderView, userFolderView } from "./util/filterfolders";
import {
    getAllProjectFolders,
    createNewFolder,
    createNewFile,
} from "../../redux/auxiliary/files-folders";

// Redux
import { connect } from "react-redux";
import { loadProject, clearProjectData } from "../../redux/actions/documents";
import { clearFileData } from "../../redux/actions/files";
import { loadFile } from "../../redux/actions/files";

import PropTypes from "prop-types";

export const FilePanel = ({
    revealFilePanel,
    revealProjectForm,
    removeProjectForm,
    revealPublishWindow,
    cancelPublish,
    submitPublish,
    projectForm,
    displayFolder,
    removeFolder,
    displayFile,
    removeFile,
    revealFolder,
    revealFile,
    revealPublish,
    collaborators,
    onClick,
    onSubmit,
    folders,
    setFolders,
    fileName,
    setFileName,
    folderName,
    setFolderName,
    loading,
    setLoading,
    loadingProjects,
    setLoadingProjects,
    ...props
}) => {
    /**
     * Create a reference to the selected folder
     */
    const chosenFolder = useRef(null);

    /**
     * Destructure this components props
     */
    const {
        loadProject,
        clearProjectData,
        clearFileData,
        loadFile,
        user,
        projectData,
        history,
    } = props;

    /**
     *
     */
    useEffect(() => {
        const check = async () => {
            const projectFolders = await getAllProjectFolders(
                projectData.projectId
            );
            setFolders(projectFolders);
            setLoadingProjects(false);
        };
        if (projectData) {
            check();
        } else {
            setLoadingProjects(false);
        }
    }, [projectData, setFolders, setLoadingProjects]);

    /**
     * Decides what action to perform on a selected element in
     * the file tree. If the selected node is a 'Master' project
     * file, the project is loaded into the editor and any File
     * data is cleared from Redux to avoid overlapping files. If
     * selected node is a file, the file data is loaded into the
     * editor and any project data is cleared from Redux (the
     * project is then loaded in again after redirecting so that
     * the file view will still show all the folders associated
     * with the project)
     *
     * @param {React Element} selectedNode - the Tree node being
     *                                       selected
     */
    const onSelect = async (selectedNode) => {
        if (selectedNode.master) {
            await loadProject(projectData);
            await clearFileData();
            history.push(`/editor${projectData.url}`);
        } else {
            if (selectedNode.file) {
                await loadFile(selectedNode.id);
                await clearProjectData();
                history.push(`/editor${selectedNode.url}`);
                await loadProject(projectData);
            }
        }
    };

    /**
     * Creates a new folder in the FilePanel
     *
     * @param {Object} e - event object
     */
    const submitFolder = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (projectData) {
            await createNewFolder(projectData.projectId, folderName);
            const projectFolders = await getAllProjectFolders(
                projectData.projectId
            );
            setFolders(projectFolders);
            setLoading(false);
            removeFolder();
        }
    };

    /**
     * Creates a new file in the FilePanel
     *
     * @param {Object} e - event object
     */
    const submitFile = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (projectData) {
            await createNewFile(chosenFolder.current.value, fileName);
            const projectFolders = await getAllProjectFolders(
                projectData.projectId
            );
            setFolders(projectFolders);
            setLoading(false);
            removeFile();
        }
    };

    const spinner = require("../../img/loading-black.svg");
    const spinnerWhite = require("../../img/loading.svg");

    return (
        <aside className='file-panel-container'>
            {revealPublish && (
                <div className='publish-project-container'>
                    <form
                        className='project-publish-form'
                        onSubmit={(e) => submitPublish(e)}>
                        <h3 className='publish-project-heading'>
                            Congratulations on being ready to publish!
                        </h3>
                        <p className='publish-project-message'>
                            Well done on getting to the stage where you want to
                            publish your work! If this is your first publish,
                            even better! Please continue to enjoy the platform
                            and don't hesitate to start you next project! Good
                            luck
                        </p>
                        <div className='btn-container'>
                            <button
                                className='cancel-btn'
                                onClick={cancelPublish}>
                                Cancel
                            </button>
                            <input
                                className='confirm-btn'
                                type='submit'
                                value='Publish'
                            />
                        </div>
                    </form>
                </div>
            )}
            {revealFolder && (
                <div className='new-folder-container'>
                    <form
                        className='create-project-folder-form'
                        onSubmit={(e) => submitFolder(e)}>
                        <h3 className='new-folder-heading'>
                            Create new folder
                        </h3>
                        <input
                            type='text'
                            className='new-folder-input'
                            name='folderName'
                            placeholder='Folder name....'
                            onChange={(e) => setFolderName(e.target.value)}
                            onFocus={(e) => (e.target.placeholder = "")}
                            onBlur={(e) =>
                                (e.target.placeholder = "Folder name....")
                            }
                        />
                        <div className='btn-container'>
                            <button
                                className='cancel-btn'
                                onClick={removeFolder}>
                                Cancel
                            </button>
                            <input
                                className='confirm-btn'
                                type='submit'
                                value='Create'
                            />
                        </div>
                        {loading && (
                            <img
                                className='folder-file-spinner'
                                src={spinner}
                                alt='loading'
                            />
                        )}
                    </form>
                </div>
            )}
            {revealFile && (
                <div className='new-folder-container'>
                    <form
                        className='create-project-file-form'
                        onSubmit={(e) => submitFile(e)}>
                        <h3 className='new-folder-heading'>Create new file</h3>
                        <input
                            type='text'
                            className='new-file-input'
                            name='fileName'
                            placeholder='File name....'
                            onChange={(e) => setFileName(e.target.value)}
                            onFocus={(e) => (e.target.placeholder = "")}
                            onBlur={(e) =>
                                (e.target.placeholder = "File name....")
                            }
                        />
                        <br />
                        <label
                            htmlFor='folder-selection'
                            className='folder-selection-label'>
                            Folder
                        </label>
                        <select
                            id='folder-selection'
                            className='folder-dropdown-selection'
                            ref={chosenFolder}>
                            {user &&
                            projectData &&
                            user.userId === projectData.user ? (
                                <Fragment>
                                    {folders &&
                                        baseFolderView(
                                            folders,
                                            user.userId
                                        ).map((folder) => {
                                            if (folder[0].label !== "Master") {
                                                return (
                                                    <option
                                                        key={folder[0].id}
                                                        value={folder[0].id}>
                                                        {folder[0].label}
                                                    </option>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {folders &&
                                        userFolderView(
                                            folders,
                                            user.userId
                                        ).map((folder) => {
                                            if (folder[0].label !== "Master") {
                                                return (
                                                    <option
                                                        key={folder[0].id}
                                                        value={folder[0].id}>
                                                        {folder[0].label}
                                                    </option>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                </Fragment>
                            )}
                        </select>
                        <div className='btn-container'>
                            <button className='cancel-btn' onClick={removeFile}>
                                Cancel
                            </button>
                            <input
                                className='confirm-btn'
                                type='submit'
                                value='Create'
                            />
                        </div>
                        {loading && (
                            <img
                                className='folder-file-spinner'
                                src={spinner}
                                alt='loading'
                            />
                        )}
                    </form>
                </div>
            )}
            <div
                className={
                    revealFilePanel ? "file-panel reveal" : "file-panel"
                }>
                {projectData && (
                    <div className='project-title-panel-heading-container'>
                        <p className='project-title-panel-heading'>
                            {projectData.title}
                        </p>
                    </div>
                )}
                <div className='file-menu-container'>
                    {projectForm && (
                        <ProjectForm
                            revealProjectForm={revealProjectForm}
                            removeProjectForm={removeProjectForm}
                            onSubmit={onSubmit}
                        />
                    )}
                    <button
                        className='file-btn new'
                        type='button'
                        onClick={revealProjectForm}>
                        New
                    </button>
                    <button
                        className='file-btn publish'
                        type='button'
                        onClick={revealPublishWindow}>
                        Publish
                    </button>
                    <button
                        className='file-btn'
                        type='button'
                        onClick={displayFolder}>
                        Folder
                    </button>
                    <button
                        className='file-btn'
                        type='button'
                        onClick={displayFile}>
                        File
                    </button>
                </div>
                <div className='panel-title-container'>
                    <h3 className='panel-title panel-text'>My Files</h3>
                </div>
                <div className='files'>
                    {loadingProjects ? (
                        <div className='folder-spinner-container'>
                            <img
                                className='loading-project-folders-spinner'
                                src={spinnerWhite}
                                alt='loading'
                            />
                        </div>
                    ) : (
                        <Fragment>
                            {folders ? (
                                <div className='project-folders-container'>
                                    {user && projectData && (
                                        <Fragment>
                                            {baseFolderView(
                                                folders,
                                                user.userId
                                            ).map((folder) => {
                                                return (
                                                    <Tree
                                                        key={folder[0].id}
                                                        nodes={folder}
                                                        onSelect={onSelect}
                                                        darkMode={true}
                                                        size='Full'
                                                    />
                                                );
                                            })}
                                        </Fragment>
                                    )}
                                </div>
                            ) : (
                                <p className='no-files-message'>
                                    Your files will appear here
                                </p>
                            )}
                        </Fragment>
                    )}
                </div>
                <div className='panel-title-container'>
                    <h3 className='panel-title panel-text'>Friends Online</h3>
                    <Fragment>
                        {collaborators &&
                            collaborators.map((collaborator) => {
                                return (
                                    collaborator.isLoggedIn && (
                                        <div
                                            key={collaborator.id}
                                            className='collaborator-container'>
                                            <img
                                                className='collaborator-avatar'
                                                src={collaborator.avatar}
                                                alt={collaborator.name}
                                            />
                                            <p className='collaborator-name'>
                                                {collaborator.name}
                                            </p>
                                        </div>
                                    )
                                );
                            })}
                    </Fragment>
                </div>
            </div>
            <button
                className={
                    revealFilePanel ? "panel-btn move-arrow" : "panel-btn"
                }
                type='button'
                onClick={onClick}>
                {revealFilePanel ? (
                    <span className='reveal-arrow'>&lsaquo;</span>
                ) : (
                    <span className='reveal-arrow'>&rsaquo;</span>
                )}
            </button>
        </aside>
    );
};

FilePanel.propTypes = {
    user: PropTypes.object,
    projectData: PropTypes.object,
    revealFilePanel: PropTypes.bool.isRequired,
    revealProjectForm: PropTypes.func.isRequired,
    revealPublishWindow: PropTypes.func.isRequired,
    cancelPublish: PropTypes.func.isRequired,
    submitPublish: PropTypes.func.isRequired,
    projectForm: PropTypes.bool.isRequired,
    collaborators: PropTypes.array,
    revealPublish: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loadFile: PropTypes.func.isRequired,
    loadProject: PropTypes.func.isRequired,
    clearFileData: PropTypes.func.isRequired,
    clearProjectData: PropTypes.func.isRequired,
    folders: PropTypes.array,
    setFolders: PropTypes.func,
    fileName: PropTypes.string,
    setFileName: PropTypes.func,
    folderName: PropTypes.string,
    setFolderName: PropTypes.func,
    loading: PropTypes.bool,
    setLoading: PropTypes.func,
    loadingProjects: PropTypes.bool,
    setLoadingProjects: PropTypes.func,
};

const mapProps = (state) => ({
    user: state.auth.user,
    projectData: state.documents.projectData,
});

export default connect(mapProps, {
    loadFile,
    loadProject,
    clearFileData,
    clearProjectData,
})(withRouter(FilePanel));
