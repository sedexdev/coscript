import React from "react";

import PropTypes from "prop-types";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            genres: "",
            description: "",
            cover: [],
        };
        this.onChange = this.onChange.bind(this);
    }

    /**
     * Updates the <[name]> state variable
     * with the text value of the event target
     *
     * @param {Object} e - event object
     */
    onChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState((state) => ({
            ...state,
            [name]: value,
        }));
    }

    render() {
        const { title, genres, description, cover } = this.state;
        return (
            <aside className='project-form-wrapper'>
                <div className='project-form-container'>
                    <form
                        className='project-form'
                        onSubmit={() =>
                            this.props.onSubmit({
                                title,
                                genres,
                                description,
                                cover,
                            })
                        }>
                        <p className='project-form-heading'>
                            New Project Details
                        </p>
                        <div className='project-form-fields'>
                            <label
                                className='project-form-label'
                                htmlFor='project-title'>
                                Title
                            </label>
                            <input
                                id='project-title'
                                className='project-form-input'
                                name='title'
                                type='text'
                                placeholder='Title...'
                                onChange={(e) => this.onChange(e)}
                                onFocus={(e) => (e.target.placeholder = "")}
                                onBlur={(e) =>
                                    (e.target.placeholder = "Title...")
                                }
                            />
                            <label
                                className='project-form-label'
                                htmlFor='project-genres'>
                                Genres
                            </label>
                            <input
                                id='project-genres'
                                className='project-form-input'
                                name='genres'
                                type='text'
                                placeholder='Comma separated genres...'
                                onChange={(e) => this.onChange(e)}
                                onFocus={(e) => (e.target.placeholder = "")}
                                onBlur={(e) =>
                                    (e.target.placeholder =
                                        "Comma separated genres......")
                                }
                            />
                            <label
                                className='project-form-label'
                                htmlFor='project-description'>
                                Description
                            </label>
                            <textarea
                                id='project-description'
                                className='project-form-textarea'
                                name='description'
                                type='text'
                                placeholder='Description...'
                                onChange={(e) => this.onChange(e)}
                                onFocus={(e) => (e.target.placeholder = "")}
                                onBlur={(e) =>
                                    (e.target.placeholder = "Description...")
                                }></textarea>
                            <div className='project-cover-image-link'>
                                <p>Upload a </p>
                                <label
                                    className='upload-image-text'
                                    htmlFor='project-cover'>
                                    cover image
                                    <input
                                        className='choose-file'
                                        name='cover'
                                        id='project-cover'
                                        type='file'
                                    />
                                </label>
                            </div>
                            <div className='form-submit-btns'>
                                <input
                                    className='file-btn new'
                                    type='submit'
                                    value='Create'></input>
                                <input
                                    className='file-btn cancel'
                                    type='button'
                                    value='Cancel'
                                    onClick={
                                        this.props.removeProjectForm
                                    }></input>
                            </div>
                        </div>
                    </form>
                </div>
            </aside>
        );
    }
}

ProjectForm.propTypes = {
    revealProjectForm: PropTypes.func.isRequired,
    removeProjectForm: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default ProjectForm;
