import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import { stopSoundEffect } from "../../redux/auxiliary/typing-sound-effect";

// Redux
import { connect } from "react-redux";
import { createNewProject } from "../../redux/actions/documents";
import { logoutUser } from "../../redux/actions/auth";

import PropTypes from "prop-types";

import "./redirect.css";

export class Redirect extends React.Component {
    /**
     * Uses the the custom set 'from' property of the props
     * history object to decide where to redirect the user to
     * and what actions, if any, to perform while redirecting.
     * For example, when redirecting from the '/editor' route
     * to a newly created project url, the project is created
     * while the redirecting is taking place
     */
    async componentDidMount() {
        stopSoundEffect();
        const { history, location, createNewProject, logoutUser } = this.props;

        if (location.state && location.state.passwordChanged) {
            setTimeout(() => {
                history["from"] = "verify";
                this.props.history.push("/login");
            }, 4000);
        } else {
            switch (history.from) {
                case "editor":
                    await createNewProject(history.newProjectData);
                    const { projectData } = this.props;
                    setTimeout(() => {
                        this.props.history.push(`/editor${projectData.url}`);
                    }, 4000);
                    break;
                case "verify":
                    setTimeout(() => {
                        this.props.history.push("/login");
                    }, 4000);
                    break;
                case "publications":
                    setTimeout(() => {
                        this.props.history.push("/publications");
                    }, 4000);
                    break;
                case "logout":
                    await logoutUser();
                    setTimeout(() => {
                        this.props.history.push("/");
                    }, 4000);
                    break;
                default:
                    setTimeout(() => {
                        this.props.history.push("/");
                    }, 4000);
            }
        }
    }

    render() {
        const { history, location } = this.props;
        const spinner = require("../../img/loading.svg");

        let component;

        if (location.state && location.state.passwordChanged) {
            history["from"] = "verify";
        }

        switch (history.from) {
            case "delete":
                component = (
                    <Fragment>
                        <p className='verify-text'>Sorry to see you go :(</p>
                        <p className='verify-text'>Redirecting...</p>
                    </Fragment>
                );
                break;
            case "editor":
                component = (
                    <Fragment>
                        <p className='verify-text'>
                            Creating your new project...
                        </p>
                    </Fragment>
                );
                break;
            case "verify":
                component = (
                    <Fragment>
                        <p className='verify-text'>
                            Taking you back to login...
                        </p>
                    </Fragment>
                );
                break;
            case "publications":
                component = (
                    <Fragment>
                        <p className='verify-text'>
                            Publishing your project! :)
                        </p>
                    </Fragment>
                );
                break;
            default:
                component = (
                    <p className='verify-text'>
                        Logging you out. Redirecting...
                    </p>
                );
        }

        return (
            <main className='redirect-body'>
                <section className='redirect-container'>
                    <h1 className='coscript-h1'>CoScript</h1>
                    {component}
                    <div className='ajax-spinner-container'>
                        <img src={spinner} alt='loading spinner' />
                    </div>
                </section>
            </main>
        );
    }
}

Redirect.propTypes = {
    history: PropTypes.object,
    createNewProject: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
};

const mapProps = (state) => ({
    projectData: state.documents.projectData,
});

export default connect(mapProps, { createNewProject, logoutUser })(
    withRouter(Redirect)
);
