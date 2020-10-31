import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import ServiceBox from "./ServiceBox";
import CarouselMenu from "./CarouselMenu";
import Footer from "../Footer";

import PropTypes from "prop-types";

import { stopSoundEffect } from "../../redux/auxiliary/typing-sound-effect";
import {
    shuffle,
    segment,
    filterActive,
    filterPublished,
} from "../../redux/auxiliary/projects";

// Redux
import { connect } from "react-redux";
import { clearFileData } from "../../redux/actions/files";
import { loadProject, loadAllProjects } from "../../redux/actions/documents";

import "./index.css";

export const Index = ({ ...props }) => {
    /**
     * Set the state for this functional component and its children
     */
    const [projects, setProjects] = useState(null);
    const [active, setActive] = useState(true);
    const [activeSegment, setActiveSegment] = useState(0);
    const [published, setPublished] = useState(false);
    const [publishedSegment, setPublishedSegment] = useState(0);
    const [activeTab, setActiveTab] = useState(false);

    /**
     * Destructure this components props
     */
    const { clearFileData, loadProject, loadAllProjects, projectArray } = props;

    /**
     * Scrolls back to the top of the page on mount and
     * unmount and loads all projects into the <projectArray>
     * prop. This effect contains an IIFE function to avoid
     * memory leaks in the event that the component unmounts
     * before the <loadAllProjects> async function has completed
     *
     */
    useEffect(() => {
        window.scrollTo(0, 0);
        (async function load() {
            await loadAllProjects();
        })();
    }, [loadAllProjects]);

    /**
     * Sets the browser tab title and scrolls to the
     * top of the page on mount. Also stops the typewriter
     * sound effect if the user navigated to this component
     * from an introductory workspace.
     *
     * A check is also performed on whether or not there
     * is any file data being persisted in Redux, if there
     * is, it is cleared so that the user can be shown the
     * introductory workspace if they have no personal
     * projects, or a recent personal project can be loaded
     * when they go back to the workspace
     */
    useEffect(() => {
        document.title = "CoScript - Writers Network";
        stopSoundEffect();
        clearFileData();
        const projects = projectArray ? projectArray : [];
        shuffle(projects);
        setProjects(
            setCarouselWidth(projects, window.innerWidth, filterActive)
        );
        window.addEventListener("resize", () => {
            setProjects(
                setCarouselWidth(projects, window.innerWidth, filterActive)
            );
        });
    }, [clearFileData, projectArray]);

    /**
     * Sets the carousel menu tabs 'Active' and
     * 'Published'
     */
    const makeActive = () => {
        setActiveTab(!activeTab);
    };

    /**
     * Checks the current width of the browser window
     * and sets the width of the carousel menu so it only
     * displays, 1, 2, 3 or 4 projects at a time. After
     * assigning a width, the <projectArray> is filtered
     * using the <filter> function to display either active
     * or published projects
     *
     * @param {Array} projectArray - an array of projects
     * @param {Number} screenWidth - current browser width
     * @param {Function} filter    - the filter function to use
     */
    function setCarouselWidth(projectArray, screenWidth, filter) {
        const projects = projectArray ? projectArray : [];
        if (projects.length > 0) {
            const filteredArray = filter(projects);
            let width;
            if (screenWidth <= 400) {
                width = 1;
            } else if (screenWidth <= 930) {
                width = 2;
            } else if (screenWidth <= 1100) {
                width = 3;
            } else {
                width = 4;
            }
            return segment(filteredArray, width);
        }
        return [];
    }

    /**
     * Loads all projects into the frontend when 'Active'
     * tab is clicked and shuffles them into a random order.
     * The active projects are then filtered out and displayed
     * to the user. The width of the carousel menu is then
     * set based on the 'window.innerWidth' property
     */
    async function setActiveProjects() {
        await loadAllProjects();
        const projects = projectArray ? projectArray : [];
        shuffle(projects);
        const carouselWidth = setCarouselWidth(
            projects,
            window.innerWidth,
            filterActive
        );
        setActive(true);
        setPublished(false);
        setProjects(carouselWidth);
    }

    /**
     * Loads all projects into the frontend when 'Published'
     * tab is clicked and shuffles them into a random order.
     * The published projects are then filtered out and displayed
     * to the user. The width of the carousel menu is then
     * set based on the 'window.innerWidth' property
     */
    async function setPublishedProjects() {
        await loadAllProjects();
        const projects = projectArray ? projectArray : [];
        shuffle(projects);
        const carouselWidth = setCarouselWidth(
            projects,
            window.innerWidth,
            filterPublished
        );
        setActive(false);
        setPublished(true);
        setProjects(carouselWidth);
    }

    const usersImg = require("../../img/users.svg");
    const collabImg = require("../../img/books.svg");
    const publishImg = require("../../img/archive.svg");

    return (
        <main>
            <NavBar />
            <section className='cover'>
                <div className='index-heading'>
                    <h1>CoScript</h1>
                    <p>Bringing writers together...</p>
                    <a className='down-arrow' href='#dummy'>
                        &darr;
                    </a>
                    <div id='dummy'></div>
                </div>
            </section>
            <section className='services'>
                <div className='services-container'>
                    <ServiceBox
                        header='-CONNECT-'
                        img={usersImg}
                        alt_text='Users icon'
                        description='Search for people and projects and start networking with others to get your project off the ground'
                    />
                    <ServiceBox
                        header='-COLLABORATE-'
                        img={collabImg}
                        alt_text='Book icon'
                        description='Create a workspace for your project with access to a rich text editor and start writing with your new found friends'
                    />
                    <ServiceBox
                        header='-PUBLISH-'
                        img={publishImg}
                        alt_text='Publish icon'
                        description='Upon completion, publish your final piece in the app to be read online and showcased for the world to see'
                    />
                </div>
            </section>
            <section className='home-page-about'>
                <div className='about-container'>
                    <div className='about-text-box'>
                        <h2 className='about-h2'>About CoScript</h2>
                        <div className='about-text'>
                            <p className='lead'>
                                This application aims to serve the writing
                                community, and anyone who is interested in
                                writing, as a meeting place and useful tool for
                                making collaboration on creative writing
                                projects easier than ever before. As a person
                                who has attempted to write a novel and several
                                short stories, but never actually finished any
                                of them, I can appreciate the demand for
                                collaborative spaces that offer help when you
                                need it.
                            </p>
                            <p>
                                The platform allows you to create your own
                                projects and put them out to the community. Once
                                your project is live, others can browse and
                                request to to get involved with the project, the
                                creator has total control over who can join.
                                Credit is given to ALL contributors whose
                                submissions were accepted by the project
                                creator, once a project has been published.
                            </p>
                            <p>
                                All active projects are available from the
                                'Active Projects' page, just browse and find
                                something that you're interested in and then
                                message the creator with a little intro to
                                request to be added to the project. If you've
                                got an idea and are willing to make it a
                                collaborative project then sign up today and
                                start you're journey towards being a published
                                author!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <CarouselMenu
                projects={projects}
                active={active}
                activeSegment={activeSegment}
                setActiveSegment={setActiveSegment}
                published={published}
                publishedSegment={publishedSegment}
                setPublishedSegment={setPublishedSegment}
                activeTab={activeTab}
                activateTab={makeActive}
                setActiveProjects={setActiveProjects}
                setPublishedProjects={setPublishedProjects}
                loadProject={loadProject}
            />
            <Footer />
        </main>
    );
};

Index.propTypes = {
    clearFileData: PropTypes.func,
    loadProject: PropTypes.func,
    loadAllProjects: PropTypes.func,
};

const mapProps = (state) => ({
    projectArray: state.documents.projectArray,
});

export default connect(mapProps, {
    clearFileData,
    loadProject,
    loadAllProjects,
})(Index);
