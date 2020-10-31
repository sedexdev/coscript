import React from "react";
import PropTypes from "prop-types";

import "./buttons.css";

const PostButton = ({ onClick, classes, value }) => {
    return (
        <input
            onClick={onClick}
            className={classes}
            type='submit'
            value={value}
        />
    );
};

PostButton.defaultProps = {
    value: "Verify"
};

PostButton.propTypes = {
    onClick: PropTypes.func,
    classes: PropTypes.string,
    value: PropTypes.string
};

export default PostButton;
