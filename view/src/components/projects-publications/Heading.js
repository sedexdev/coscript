import React, { useRef } from "react";
import { withRouter } from "react-router-dom";

import PostButton from "../buttons/PostButton";

import PropTypes from "prop-types";

import { filterByCriteria } from "../../redux/auxiliary/projects";

// Redux
import { connect } from "react-redux";
import { loadAllProjects } from "../../redux/actions/documents";

export const Heading = ({
    banner,
    bannerHeading,
    searchPlaceholder,
    searchCriteria,
    onChange,
    setProjects,
    ...props
}) => {
    const searchBar = useRef(null);

    /**
     * Calls the 'setProjects' function with the appropriate
     * parameters based on the search filter selected by the
     * user. Only projects with any matches to the search
     * criteria are displayed after the search results come
     * back
     *
     * @param {Object} e - event object
     */
    const onSubmit = async (e) => {
        e.preventDefault();
        await props.loadAllProjects();
        const status =
            props.location.pathname === "/projects" ? "active" : "published";
        switch (searchBar.current.value) {
            case "author":
                setProjects(
                    filterByCriteria(
                        props.projectArray,
                        status,
                        searchCriteria,
                        "author"
                    )
                );
                break;
            case "title":
                setProjects(
                    filterByCriteria(
                        props.projectArray,
                        status,
                        searchCriteria,
                        "title"
                    )
                );
                break;
            case "genre":
                setProjects(
                    filterByCriteria(
                        props.projectArray,
                        status,
                        searchCriteria,
                        "genres"
                    )
                );
                break;
            default:
                return;
        }
    };

    return (
        <header className='banner-container'>
            <div id={banner} className='banner-heading-container'>
                <h1 className='banner-heading'>{bannerHeading}</h1>
            </div>
            <div className='search-bar-container'>
                <div className='search-bar'>
                    <form className='search-form' onSubmit={(e) => onSubmit(e)}>
                        <input
                            className='search-input'
                            type='text'
                            name='search-input'
                            onChange={(e) => onChange(e)}
                            placeholder={searchPlaceholder}
                            onFocus={(e) => (e.target.placeholder = "")}
                            onBlur={(e) =>
                                (e.target.placeholder = searchPlaceholder)
                            }
                        />
                        <PostButton classes='square-btn' value='Search' />
                        <select className='sort-by-selector' ref={searchBar}>
                            <option name='author' value='author'>
                                Author
                            </option>
                            <option name='title' value='title'>
                                Title
                            </option>
                            <option name='genre' value='genre'>
                                Genre
                            </option>
                        </select>
                    </form>
                </div>
            </div>
        </header>
    );
};

Heading.propTypes = {
    banner: PropTypes.string.isRequired,
    bannerHeading: PropTypes.string.isRequired,
    searchPlaceholder: PropTypes.string.isRequired,
    searchCriteria: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    setProjects: PropTypes.func.isRequired,
    loadAllProjects: PropTypes.func.isRequired,
    projectArray: PropTypes.array,
};

const mapProps = (state) => ({
    projectArray: state.documents.projectArray,
});

export default connect(mapProps, { loadAllProjects })(withRouter(Heading));
