import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "./buttons/Button";

import { getUserMessages } from "../redux/auxiliary/user-messages";

// Redux
import { connect } from "react-redux";
import { getMostRecentProject } from "../redux/actions/documents";

import PropTypes from "prop-types";

import "./navbar.css";

export class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            unread: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Checks to see if the user has any unread messages
     * in their personal profile message inbox and sets
     * the 'unread' state property to true if they have.
     * This displays a small icon to the user to indicate
     * they have unread messages
     */
    async componentDidMount() {
        const userMessages = await getUserMessages();
        for (let message of userMessages) {
            if (!message.read) {
                this.setState({
                    unread: true,
                });
            }
        }
    }

    /**
     * Sets the 'visible' state property so that the
     * dropdown menu can be revealed and hidden by
     * clicking the link
     */
    handleClick() {
        this.setState((state) => ({
            visible: !state.visible,
        }));
    }

    render() {
        const { unread } = this.state;
        const { user, loading, history } = this.props;

        const menuIcon = require("../img/menu.svg");
        const spinner = require("../img/loading.svg");
        const isLoggedIn = user && user.isLoggedIn | false;

        const loggedIn = (
            <Fragment>
                <div className='header'>
                    <div className='logo-container'>
                        <Link to='/'>
                            <p className='logo'>CoScript</p>
                        </Link>
                    </div>
                    <div className='nav-links'>
                        <Link to='/projects'>Active Projects</Link>
                        <Link to='/publications'>Publications</Link>
                        <Link
                            to='#'
                            onClick={async () => {
                                await this.props.getMostRecentProject();
                                const { projectData } = this.props;
                                projectData
                                    ? history.push(`/editor${projectData.url}`)
                                    : history.push("/editor");
                            }}>
                            Workspace
                        </Link>
                    </div>
                </div>
                <div className='nav-btns'>
                    {user && !loading ? (
                        <div className='logged-in-user-container'>
                            <p className='user-username'>
                                {user.profile.displayName}
                            </p>
                            <button
                                className='desktop-icon-link'
                                onClick={this.handleClick}>
                                {unread ? (
                                    <div className='avatar-unread-msg-container'>
                                        <div className='avatar-unread-msg-icon'></div>
                                        <img
                                            className='user-gravatar'
                                            src={user.avatar}
                                            alt='user gravatar'
                                        />
                                    </div>
                                ) : (
                                    <img
                                        className='user-gravatar'
                                        src={user.avatar}
                                        alt='user gravatar'
                                    />
                                )}
                            </button>
                        </div>
                    ) : (
                        <img
                            className='user-spinner'
                            src={spinner}
                            alt='loading spinner icon'
                        />
                    )}
                </div>
                <button
                    className='dropdown-icon-link'
                    onClick={this.handleClick}>
                    <img
                        className='dropdown-icon'
                        src={menuIcon}
                        alt='Burger menu icon'
                    />
                </button>
                <div
                    id='dropdown-nav'
                    className={
                        this.state.visible
                            ? "dropdown-menu dropdown-content display"
                            : "dropdown-menu dropdown-content"
                    }>
                    <Link to='/projects'>
                        <p className='dropdown-link'>Active Projects</p>
                    </Link>
                    <Link to='/publications'>
                        <p className='dropdown-link'>Publications</p>
                    </Link>
                    <Link
                        to='#'
                        onClick={async () => {
                            await this.props.getMostRecentProject();
                            const { projectData } = this.props;
                            projectData
                                ? history.push(`/editor${projectData.url}`)
                                : history.push("/editor");
                        }}>
                        <p className='dropdown-link'>Workspace</p>
                    </Link>
                    <Link to='/profile'>
                        <p className='dropdown-link'>My Profile</p>
                    </Link>
                    <a
                        onClick={() => {
                            history["from"] = "logout";
                            history.push("/redirect");
                        }}
                        href=' '>
                        <p className='dropdown-link'>Logout</p>
                    </a>
                </div>
            </Fragment>
        );

        const visiting = (
            <Fragment>
                <div className='header'>
                    <div className='logo-container'>
                        <Link to='/'>
                            <p className='logo'>CoScript</p>
                        </Link>
                    </div>
                    <div className='nav-links'>
                        <Link to='/projects'>Active Projects</Link>
                        <Link to='/publications'>Publications</Link>
                    </div>
                </div>
                <div className='nav-btns'>
                    <div>
                        <Link to='/register'>
                            <Button classes='btn' value='Register' />
                        </Link>
                    </div>
                    <div>
                        <Link to='/login'>
                            <Button classes='grn-btn' value='Login' />
                        </Link>
                    </div>
                </div>
                <button
                    className='dropdown-icon-link'
                    onClick={this.handleClick}>
                    <img
                        className='dropdown-icon'
                        src={menuIcon}
                        alt='Burger menu icon'
                    />
                </button>
                <div
                    id='dropdown-nav'
                    className={
                        this.state.visible
                            ? "dropdown-menu dropdown-content display"
                            : "dropdown-menu dropdown-content"
                    }>
                    <Link to='/register'>
                        <p className='dropdown-link'>Register</p>
                    </Link>
                    <Link to='/login'>
                        <p className='dropdown-link'>Login</p>
                    </Link>
                    <Link to='/projects'>
                        <p className='dropdown-link'>Active Projects</p>
                    </Link>
                    <Link to='/publications'>
                        <p className='dropdown-link'>Publications</p>
                    </Link>
                </div>
            </Fragment>
        );

        return (
            <nav className='navbar'>
                {!loading && (
                    <Fragment>{!isLoggedIn ? visiting : loggedIn}</Fragment>
                )}
            </nav>
        );
    }
}

NavBar.propTypes = {
    user: PropTypes.object,
    loading: PropTypes.bool,
    getMostRecentProject: PropTypes.func.isRequired,
};

const setProps = (state) => ({
    user: state.auth.user,
    loading: state.auth.loading,
    projectData: state.documents.projectData,
});

export default connect(setProps, {
    getMostRecentProject,
})(withRouter(NavBar));
