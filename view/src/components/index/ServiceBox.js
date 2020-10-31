import React from "react";
import PropTypes from "prop-types";

const ServiceBox = ({ header, img, alt_text, description }) => {
    return (
        <div className='service-box'>
            <div>
                <h1>{header}</h1>
            </div>
            <div>
                <img className='service-icon' src={img} alt={alt_text} />
            </div>
            <div>
                <p>{description}</p>
            </div>
        </div>
    );
};

ServiceBox.propTypes = {
    header: PropTypes.string.isRequired,
    img: PropTypes.any,
    alt_text: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default ServiceBox;
