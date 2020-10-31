import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import NavBar from "../NavBar";
import Heading from "./Heading";
import Footer from "../Footer";
import ProjectCard from "../cards/ProjectCard";

// Redux
import { connect } from "react-redux";
import { loadProject, loadAllProjects } from "../../redux/actions/documents";
import { clearFileData } from "../../redux/actions/files";
import { filterActive } from "../../redux/auxiliary/projects";
import { stopSoundEffect } from "../../redux/auxiliary/typing-sound-effect";

import PropTypes from "prop-types";

import "./pro-pub.css";

export const Projects = ({ ...props }) => {
    /**
     * Set state for this component and its children
     */
    const [projects, setProjects] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchCriteria, setSearchCriteria] = useState("");
    const [searching, setSearching] = useState(false);

    /**
     * Destructure this components props
     */
    const {
        loadProject,
        loadAllProjects,
        clearFileData,
        projectArray,
        history,
    } = props;

    /**
     * Scroll to the top of the
     * page on mount. Also load all project data into
     * application level state inside an async IIFE function
     * to avoid memory leaks if the component unmounts before
     * the API call can complete
     */
    useEffect(() => {
        window.scrollTo(0, 0);
        (async function load() {
            await loadAllProjects();
        })();
    }, [loadAllProjects]);

    /**
     * Sets the browser tab title and scrolls to the top
     * of the page when the component mounts. Also stops
     * playing te type writer sound effect if the user
     * navigated to this page from the introductory
     * workspace.
     *
     * A check is also performed on whether or not there
     * is any file data being persisted in Redux, if there
     * is, it is cleared so that the user can be shown the
     * introductory workspace if they have no personal
     * projects, or a recent personal project can be loaded
     * when they go back to the workspace
     *
     * All projects are then loaded into the frontend and
     * all active projects are filtered out and displayed
     */
    useEffect(() => {
        document.title = "CoScript - Active Projects";
        stopSoundEffect();
        clearFileData();
        const projects = projectArray ? projectArray : [];
        if (!searching) {
            setProjects(filterActive(projects));
        }
        setLoading(false);
    }, [clearFileData, projectArray, searching]);

    /**
     * Sets the 'searchCriteria' state property to the
     * value of the event target
     *
     * @param {Object} e - event object
     */
    const onChange = (e) => {
        setSearchCriteria(e.target.value);
    };

    /**
     * Sets the 'projects' state property to the
     * <projectArray> and also sets the 'searching'
     * state property to true
     *
     * @param {Array} searchResults - an array of projects
     */
    const updateProjects = (searchResults) => {
        setSearching(true);
        setProjects(searchResults);
    };

    const sky = require("../../img/sky-example.jpg");
    const spinner = require("../../img/loading-black.svg");

    return (
        <main>
            <NavBar />
            <Heading
                banner='projects-banner'
                bannerHeading='Active Projects'
                searchPlaceholder='Search for projects...'
                searchCriteria={searchCriteria}
                onChange={onChange}
                setProjects={updateProjects}
            />
            {loading ? (
                <div className='project-publication-spinner'>
                    <img
                        className='project-publication-spinner'
                        src={spinner}
                        alt='loading'
                    />
                </div>
            ) : (
                <Fragment>
                    {projects && projects.length ? (
                        <div className='project-cards-container'>
                            {projects.map((project) => {
                                return (
                                    <ProjectCard
                                        key={project.projectId}
                                        src={sky}
                                        img_alt='Project cover image'
                                        title={project.title}
                                        project_admin={project.author}
                                        genres={project.genres}
                                        onClick={async () => {
                                            await loadProject(project);
                                            history.push(
                                                `/landing${project.url}`
                                            );
                                        }}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <Fragment>
                            {searching ? (
                                <h2 className='no-projects-msg'>
                                    No matches found
                                </h2>
                            ) : (
                                <h2 className='no-projects-msg'>
                                    There are currently no active projects
                                </h2>
                            )}
                        </Fragment>
                    )}
                </Fragment>
            )}
            <Footer />
        </main>
    );
};

Projects.propTypes = {
    loadProject: PropTypes.func.isRequired,
    loadAllProjects: PropTypes.func.isRequired,
    clearFileData: PropTypes.func.isRequired,
    projectArray: PropTypes.array,
};

const mapProps = (state) => ({
    projectArray: state.documents.projectArray,
});

export default connect(mapProps, {
    loadProject,
    loadAllProjects,
    clearFileData,
})(withRouter(Projects));
