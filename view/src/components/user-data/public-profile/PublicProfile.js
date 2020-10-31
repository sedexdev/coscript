import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { loadProject } from "../../../redux/actions/documents";
import { sendFriendRequest, loadUserProfile } from "../../../redux/actions/profile";

import ProjectCard from "../../cards/ProjectCard";
import NavBar from "../../NavBar";
import Footer from "../../Footer";
import Alert from "../../alert/Alert";

import PropTypes from "prop-types";

import "./public-profile.css";

export class PublicProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            revealRequestWindow: false,
            submitted: false,
        };
        this.showRequestWindow = this.showRequestWindow.bind(this);
        this.removeRequestWindow = this.removeRequestWindow.bind(this);
        this.showSubmitSpinner = this.showSubmitSpinner.bind(this);
        this.removeSubmitSpinner = this.removeSubmitSpinner.bind(this);
        this.sendFriendRequest = this.sendFriendRequest.bind(this);
    }

    /**
     * Sets the browser tab title and scrolls to the
     * top of the page when the component mounts. Also
     * loads the users personal profile into the
     * frontend
     */
    async componentDidMount() {
        document.title = "CoScript - Public Profile";
        window.scrollTo(0, 0);
        const { userProfile, loadUserProfile } = this.props;
        if (userProfile) {
            await loadUserProfile(userProfile.id);
        }
        setTimeout(() => {
            this.setState({
                loading: false,
            });
        }, 500);
    }

    /**
     * Sets the 'revealRequestWindow' to true to
     * display a window to the user asking them if
     * they want to send a friend request to the
     * owner of the profile
     */
    showRequestWindow() {
        const { user } = this.props;
        if (user) {
            this.setState({
                revealRequestWindow: true,
            });
        }
    }

    /**
     * Sets the 'revealRequestWindow' to false to
     * remove a window tasking a user if they
     * want to send a friend request to the owner
     * of the profile
     */
    removeRequestWindow() {
        this.setState({
            revealRequestWindow: false,
        });
    }

    /**
     * Sets the 'submitted' state property to true
     * to display a loading spinner while the user's
     * profile loads
     */
    showSubmitSpinner() {
        this.setState({
            submitted: true,
        });
    }

    /**
     * Sets the 'submitted' state property to false
     * to remove a loading spinner once the user's
     * profile has loaded
     */
    removeSubmitSpinner() {
        this.setState({
            submitted: false,
        });
    }

    /**
     * Sends a friend request message to the personal
     * profile message inbox of the user who owns this
     * public profile.
     *
     * @param {Object} e - event object
     */
    async sendFriendRequest(e) {
        e.preventDefault();
        this.showSubmitSpinner();
        const { user, userProfile, sendFriendRequest } = this.props;
        const msgText = `${user.profile.displayName} sent you a friend request`;
        const success = await sendFriendRequest(msgText, user.userId, userProfile.id);
        if (success) {
            this.setState({
                revealRequestWindow: false,
            });
            this.removeSubmitSpinner();
        } else {
            setTimeout(() => {
                this.removeRequestWindow();
            }, 1000);
        }
    }

    render() {
        const { loading, revealRequestWindow, submitted } = this.state;
        const { user, userProfile, loadProject, history } = this.props;

        const spinner = require("../../../img/loading-black.svg");
        const sky = require("../../../img/sky-example.jpg");

        return (
            <Fragment>
                <Alert />
                <NavBar />
                {revealRequestWindow && (
                    <div className='collaborate-box'>
                        {" "}
                        <form onSubmit={(e) => this.sendFriendRequest(e)}>
                            <p className='collaborate-heading'>
                                Send <b>{userProfile && userProfile.name}</b> a friend request?
                            </p>
                            <div className='btn-container'>
                                {submitted && <img className='reply-msg-loading-spinner' src={spinner} alt='loading' />}
                                <button className='cancel-btn' onClick={this.removeRequestWindow}>
                                    Cancel
                                </button>
                                <input className='confirm-btn' type='submit' value='Send' />
                            </div>
                        </form>
                    </div>
                )}
                <main className='public-profile-main'>
                    {loading ? (
                        <div className='public-profile-loading-spinner-container'>
                            <img className='public-profile-loading-spinner' src={spinner} alt='loading' />
                        </div>
                    ) : (
                        <Fragment>
                            <header className='public-profile-header'>
                                <img className='public-profile-avatar' src={userProfile && userProfile.avatar} alt='user-avatar' />
                                <div className='profile-contact-form'>
                                    <p className='public-profile-display-name'>{userProfile && userProfile.name} </p>
                                    {user && userProfile && user.userId !== userProfile.id && (
                                        <button
                                            className='profile-connect-btn'
                                            onClick={
                                                user
                                                    ? this.showRequestWindow
                                                    : () => {
                                                          history.push("/login");
                                                      }
                                            }>
                                            <span className='profile-pipe'>|</span> Connect
                                        </button>
                                    )}
                                </div>
                            </header>
                            <section className='public-profile-info-main'>
                                <div className='public-profile-info-container'>
                                    <div className='public-profile-info about'>
                                        <h2 className='public-profile-heading'>About</h2>
                                        <div className='public-profile-about '>
                                            {userProfile && (
                                                <Fragment>
                                                    {userProfile.about
                                                        ? userProfile.about
                                                        : `${userProfile.name} has not added any personal information yet`}
                                                </Fragment>
                                            )}
                                        </div>
                                    </div>
                                    <div className='public-profile-info authors'>
                                        <h2 className='public-profile-heading'>Favourite Authors</h2>
                                        <div>
                                            {userProfile && userProfile.authors.length
                                                ? userProfile.authors.map((author) => {
                                                      return <p key={author}>{author}</p>;
                                                  })
                                                : "None added yet"}
                                        </div>
                                    </div>
                                    <div className='public-profile-info books'>
                                        <h2 className='public-profile-heading'>Favourite Books</h2>
                                        <div>
                                            {userProfile && userProfile.books.length
                                                ? userProfile.books.map((book) => {
                                                      return <p key={book}>{book}</p>;
                                                  })
                                                : "None added yet"}
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className='public-profile-user-projects'>
                                <h2 className='public-profile-heading projects'>Projects</h2>
                                <div className='user-project-cards'>
                                    {userProfile &&
                                        userProfile.projects.map((project) => {
                                            return (
                                                <ProjectCard
                                                    key={project.projectId}
                                                    src={sky}
                                                    img_alt='Project cover image'
                                                    title={project.title}
                                                    project_admin={project.author}
                                                    genres={project.genres}
                                                    projectUrl={project.url}
                                                    onClick={async () => {
                                                        await loadProject(project);
                                                        history.push(`/landing${project.url}`);
                                                    }}
                                                />
                                            );
                                        })}
                                </div>
                            </section>
                        </Fragment>
                    )}
                </main>
                <Footer />
            </Fragment>
        );
    }
}

PublicProfile.propTypes = {
    user: PropTypes.object,
    userProfile: PropTypes.object,
    loadProject: PropTypes.func.isRequired,
    sendFriendRequest: PropTypes.func.isRequired,
    loadUserProfile: PropTypes.func.isRequired,
};

const mapProps = (state) => ({
    user: state.auth.user,
    userProfile: state.auth.userProfile,
});

export default connect(mapProps, {
    loadUserProfile,
    loadProject,
    sendFriendRequest,
})(withRouter(PublicProfile));
