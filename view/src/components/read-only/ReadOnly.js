import React, { Fragment } from "react";

import NavBar from "../NavBar";

// Redux
import { connect } from "react-redux";

import PropTypes from "prop-types";
import "./read-only.css";

class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doc: null,
        };
        this.textEditor = React.createRef();
    }

    /**
     * Sets the browser tab title and scrolls to the top
     * of the page when the component mounts. Also sets the
     * 'textEditor' state property to the contentWindow
     * of the iFrame, or null if the contentWindow has not
     * yet loaded
     */
    async componentDidMount() {
        document.title = "CoScript - Workspace";
        window.scrollTo(0, 0);
        const textEditor =
            this.textEditor && this.textEditor.contentWindow
                ? this.textEditor.contentWindow.document
                : null;
        this.setState({
            doc: textEditor,
        });
    }

    render() {
        const { projectData } = this.props;
        const { doc } = this.state;

        if (projectData && doc) {
            doc.body.innerHTML = projectData.content;
        }

        return (
            <Fragment>
                <NavBar />
                <main className='read-only-main'>
                    <div className='read-only-wrapper'>
                        <iframe
                            className='read-only'
                            id='text-editor'
                            name='text-editor'
                            frameBorder='0'
                            title='Rich editor'
                            ref={(textEditor) =>
                                (this.textEditor = textEditor)
                            }></iframe>
                    </div>
                </main>
            </Fragment>
        );
    }
}

TextEditor.propTypes = {
    projectData: PropTypes.object,
};

const setProps = (state) => ({
    projectData: state.documents.projectData,
});

export default connect(setProps)(TextEditor);
