import React from "react";
import { withRouter } from "react-router-dom";
import ProjectCard from "../cards/ProjectCard";

import PropTypes from "prop-types";

export const CarouselMenu = ({
    projects,
    active,
    activeSegment,
    setActiveSegment,
    published,
    publishedSegment,
    setPublishedSegment,
    activeTab,
    activateTab,
    setActiveProjects,
    setPublishedProjects,
    loadProject,
    history,
}) => {
    const sky = require("../../img/sky-example.jpg");

    return (
        <section className='carousel'>
            <div className='carousel-container'>
                <div className='tabs-container'>
                    <div className={activeTab ? "tab" : "active tab"}>
                        <button
                            id='projects-tab'
                            className='tab-link'
                            onClick={() => {
                                activateTab();
                                setActiveProjects();
                            }}>
                            Projects
                        </button>
                    </div>
                    <div className={activeTab ? "active tab" : "tab"}>
                        <button
                            id='publications-tab'
                            className='tab-link'
                            onClick={() => {
                                activateTab();
                                setPublishedProjects();
                            }}>
                            Publications
                        </button>
                    </div>
                    <div className='carousel-line'></div>
                </div>
                <div className='carousel-items'>
                    <button
                        className='carousel-btn'
                        type='button'
                        onClick={() => {
                            if (active) {
                                if (activeSegment - 1 >= 0) {
                                    setActiveSegment(activeSegment - 1);
                                }
                            }
                            if (published) {
                                if (publishedSegment - 1 >= 0) {
                                    setPublishedSegment(publishedSegment - 1);
                                }
                            }
                        }}>
                        &lsaquo;
                    </button>
                    {projects && projects.length > 0 ? (
                        active ? (
                            projects[activeSegment].map((project) => {
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
                            })
                        ) : (
                            published &&
                            projects[publishedSegment].map((project) => {
                                return (
                                    <ProjectCard
                                        key={project.projectId}
                                        src={sky}
                                        img_alt='Project cover image'
                                        title={project.title}
                                        project_admin={project.author}
                                        genres={project.genres}
                                        published={true}
                                        onClick={async () => {
                                            await loadProject(project);
                                            history.push(`/read${project.url}`);
                                        }}
                                    />
                                );
                            })
                        )
                    ) : (
                        <p>Projects coming soon...</p>
                    )}
                    <button
                        className='carousel-btn'
                        type='button'
                        onClick={() => {
                            if (active) {
                                if (activeSegment + 1 < projects.length) {
                                    setActiveSegment(activeSegment + 1);
                                }
                            }
                            if (published) {
                                if (publishedSegment + 1 < projects.length) {
                                    setPublishedSegment(publishedSegment + 1);
                                }
                            }
                        }}>
                        &rsaquo;
                    </button>
                </div>
            </div>
        </section>
    );
};

CarouselMenu.propTypes = {
    projects: PropTypes.array,
    active: PropTypes.bool,
    activeSegment: PropTypes.number,
    setActiveSegment: PropTypes.func,
    published: PropTypes.bool,
    publishedSegment: PropTypes.number,
    setPublishedSegment: PropTypes.func,
    activeTab: PropTypes.bool,
    activateTab: PropTypes.func,
    setActiveProjects: PropTypes.func,
    setPublishedProjects: PropTypes.func,
    loadProject: PropTypes.func,
    history: PropTypes.object,
};

export default withRouter(CarouselMenu);
