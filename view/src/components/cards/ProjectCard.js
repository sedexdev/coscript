import React from "react";

import Button from "../buttons/Button";

import PropTypes from "prop-types";

import "./project-card.css";

const ProjectCard = ({
    src,
    img_alt,
    title,
    project_admin,
    genres,
    published,
    onClick
}) => {
    return (
        <div className='card-item'>
            <div className='card-box-image-container'>
                <img className='card-box-image' src={src} alt={img_alt} />
            </div>
            <div className='card-item-details'>
                <p>{title}</p>
                <p>{project_admin}</p>
                <p className='genres'>{genres}</p>

                <Button
                    classes='small-btn'
                    value={published ? "Read" : "Details"}
                    onClick={onClick}
                />
            </div>
        </div>
    );
};

ProjectCard.propTypes = {
    src: PropTypes.string,
    img_alt: PropTypes.string,
    title: PropTypes.string,
    project_admin: PropTypes.string,
    genres: PropTypes.string
};

export default ProjectCard;
