import React, { Fragment } from "react";
import PostButton from "../buttons/PostButton";
import Alert from "../../components/alert/Alert";

import PropTypes from "prop-types";

export const Contact = ({ onChange, onSubmit, submitted }) => {
    const spinner = require("../../img/loading-black.svg");
    return (
        <Fragment>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className='message-container'>
                    <label className='message-label' htmlFor='application-msg'>
                        Say something about yourself...
                    </label>
                    <textarea
                        className='application-message'
                        id='application-msg'
                        placeholder='Hi, I love the sound of your project and would like to get involved...'
                        onFocus={(e) => (e.target.placeholder = "")}
                        onBlur={(e) =>
                            (e.target.placeholder =
                                "Hi, I love the sound of your project and would like to get involved...")
                        }
                        onChange={(e) => onChange(e)}></textarea>
                    <Alert />
                    <div className='contact-btn-container'>
                        <PostButton
                            classes='small-btn'
                            value='Contact Author'
                        />
                        {submitted && (
                            <img
                                className='contact-spinner'
                                src={spinner}
                                alt='loading'
                            />
                        )}
                    </div>
                </div>
            </form>
        </Fragment>
    );
};

Contact.propTypes = {
    user: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitted: PropTypes.bool.isRequired,
};

export default Contact;
