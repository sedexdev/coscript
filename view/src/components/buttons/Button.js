import React from "react";
import PropTypes from "prop-types";

import "./buttons.css";

const Button = ({ onClick, id, classes, value }) => {
    return (
        <button onClick={onClick} id={id} className={classes} type='button'>
            <span className='btn-text'>
                <b>{value}</b>
            </span>
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    classes: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string
};

export default Button;
