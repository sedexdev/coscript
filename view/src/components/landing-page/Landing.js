import React from "react";
import {
    BrowserRouter as Router,
    Route,
    withRouter,
    Link,
} from "react-router-dom";

import NavBar from "../NavBar";
import Contact from "./Contact";

// Redux
import { connect } from "react-redux";
import { sendMessage, loadUserProfile } from "../../redux/actions/profile";

import PropTypes from "prop-types";

import "./landing.css";

export class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerID: 0,
            msgText: "",
            submitted: false,
        };
        this.showSubmitSpinner = this.showSubmitSpinner.bind(this);
        this.removeSubmitSpinner = this.removeSubmitSpinner.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * Sets the browser tab title and scrolls to
     * the top of the page when the component mounts
     */
    componentDidMount() {
        document.title = "CoScript - Project Page";
        window.scrollTo(0, 0);
    }

    /**
     * Sets the 'submitted' state property to
     * true so a loading spinner can be displayed
     */
    showSubmitSpinner() {
        this.setState({
            submitted: true,
        });
    }

    /**
     * Sets the 'submitted' state property to
     * false so a loading spinner can be removed
     */
    removeSubmitSpinner() {
        this.setState({
            submitted: false,
        });
    }

    /**
     * Sets the state property 'msgText' to
     * the value of the event target
     *
     * @param {Object} e - event object
     */
    onChange(e) {
        this.setState({
            msgText: e.target.value,
        });
    }

    /**
     * Sends a message to the project creators personal
     * profile message inbox. Redirects the user to
     * login if there are not logged in
     *
     * @param {Object} e - event object
     */
    async onSubmit(e) {
        e.preventDefault();
        this.showSubmitSpinner();
        const { msgText } = this.state;
        const { user, projectData, sendMessage, history } = this.props;
        if (!user) {
            history.push("/login");
        } else {
            const success = await sendMessage(
                msgText,
                user.userId,
                projectData.title,
                projectData.projectId,
                projectData.user
            );
            if (success) {
                this.removeSubmitSpinner();
            } else {
                setTimeout(() => {
                    this.removeSubmitSpinner();
                }, 1000);
            }
        }
    }

    render() {
        const { submitted } = this.state;
        const { projectData, loadUserProfile, history } = this.props;

        const sky = require("../../img/sky-example.jpg");
        const spinner = require("../../img/loading-black.svg");

        return (
            <main className='project-landing-page'>
                <NavBar />
                <header className='project-banner-container'>
                    <div className='banner-container'>
                        <div className='banner-details'>
                            <h1 className='project-banner-heading'>
                                {projectData ? projectData.title : ""}
                            </h1>
                            <div className='project-gravatar-container'>
                                <div className='project-gravatar'>
                                    <img
                                        className='project-gravatar-img'
                                        src={
                                            projectData
                                                ? projectData.userData.avatar
                                                : spinner
                                        }
                                        alt="User's Gravatar"
                                    />
                                    <button
                                        className='users-name'
                                        onClick={async () => {
                                            if (projectData) {
                                                await loadUserProfile(
                                                    projectData.user
                                                );
                                                const {
                                                    userProfile,
                                                } = this.props;
                                                history.push(
                                                    `/profile/user/${userProfile.id}`
                                                );
                                            }
                                        }}>
                                        {projectData &&
                                            projectData.userData.name}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img
                        className='project-cover-img'
                        src={sky}
                        alt='Project cover'
                    />
                </header>
                <Router>
                    <section className='project-information-container'>
                        <div className='project-tab-bar'>
                            <Link
                                className='landing-page-tab'
                                to={
                                    projectData
                                        ? `/landing${projectData.url}`
                                        : ""
                                }>
                                Description
                            </Link>
                            <p className='tab-divider'>|</p>
                            <Link
                                className='landing-page-tab'
                                to={
                                    projectData
                                        ? `/landing${projectData.url}/contact`
                                        : ""
                                }>
                                Contact
                            </Link>
                        </div>
                        <Route
                            exact
                            path={projectData && `/landing${projectData.url}`}
                            render={() => (
                                <div className='project-description'>
                                    {projectData
                                        ? projectData.description
                                        : "A description has not been provided for this project"}
                                </div>
                            )}
                        />
                        <Route
                            exact
                            path={
                                projectData &&
                                `/landing${projectData.url}/contact`
                            }
                            render={() => (
                                <Contact
                                    onChange={this.onChange}
                                    onSubmit={this.onSubmit}
                                    submitted={submitted}
                                />
                            )}
                        />
                    </section>
                </Router>
            </main>
        );
    }
}

Landing.propTypes = {
    user: PropTypes.object,
    userProfile: PropTypes.object,
    projectData: PropTypes.object,
    projectAvatar: PropTypes.object,
    sendMessage: PropTypes.func.isRequired,
    loadUserProfile: PropTypes.func.isRequired,
};

const mapProps = (state) => ({
    user: state.auth.user,
    userProfile: state.auth.userProfile,
    projectData: state.documents.projectData,
});

export default connect(mapProps, {
    sendMessage,
    loadUserProfile,
})(withRouter(Landing));
