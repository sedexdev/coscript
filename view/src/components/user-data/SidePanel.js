import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { getUserMessages } from "../../redux/auxiliary/user-messages";

// Redux
import { connect } from "react-redux";

import PropTypes from "prop-types";

import "./side-panel.css";

export const SidePanel = withRouter(({ auth, ...props }) => {
    const [unreadMessages, setUnreadMessages] = useState(false);

    useEffect(() => {
        const check = async () => {
            const userMessages = await getUserMessages();
            for (let message of userMessages) {
                if (!message.read) {
                    setUnreadMessages(true);
                    return;
                }
            }
            setUnreadMessages(false);
        };
        check();
    }, []);

    const user = require("../../img/user.svg");

    const profile = (
        <aside className='side-panel-container'>
            <div className='profile-avatar-container'>
                <div>
                    <img
                        className='profile-avatar'
                        src={auth.user ? auth.user.avatar : user}
                        alt='Users profile'
                    />
                </div>
                <p className='avatar-caption'>
                    <span style={{ fontWeight: "bold" }}>
                        {auth.user ? auth.user.username : ""}
                    </span>
                </p>
            </div>
            <div className='profile-options-container'>
                <ul className='profile-options'>
                    <a href='#profile-h2'>
                        <li className='profile-choice'>Profile</li>
                    </a>
                    <a href='#photo-h2'>
                        <li className='profile-choice'>Photo</li>
                    </a>
                    <a href='#projects-h2'>
                        <li className='profile-choice'>My Projects</li>
                    </a>
                    {unreadMessages ? (
                        <div className='unread-message-link'>
                            <div className='unread-message-icon'></div>
                            <Link to='/messages'>
                                <li className='profile-choice'>Messages</li>
                            </Link>
                        </div>
                    ) : (
                        <Link to='/messages'>
                            <li className='profile-choice'>Messages</li>
                        </Link>
                    )}
                    <Link to='/account'>
                        <li className='profile-choice'>Account</li>
                    </Link>
                    <Link to='/'>
                        <li className='profile-choice'>Back Home</li>
                    </Link>
                    <a
                        onClick={() => {
                            props.history["from"] = "logout";
                            props.history.push("/redirect");
                        }}
                        href=' '>
                        <li className='profile-choice'>Sign Out</li>
                    </a>
                </ul>
            </div>
        </aside>
    );

    const account = (
        <aside className='side-panel-container'>
            <div className='profile-avatar-container'>
                <div>
                    <img
                        className='profile-avatar'
                        src={auth.user ? auth.user.avatar : user}
                        alt='Users profile'
                    />
                </div>
                <p className='avatar-caption'>
                    {" "}
                    <span style={{ fontWeight: "bold" }}>
                        {auth.user ? auth.user.username : ""}
                    </span>
                </p>
            </div>
            <div className='profile-options-container'>
                <ul className='profile-options'>
                    <Link to='/profile'>
                        <li className='profile-choice'>Profile</li>
                    </Link>
                    <a href='#account-h2'>
                        <li className='profile-choice'>Account</li>
                    </a>
                    <a href='#privacy-h2'>
                        <li className='profile-choice'>Privacy</li>
                    </a>
                    <Link to='/'>
                        <li className='profile-choice'>Back Home</li>
                    </Link>
                    <a
                        onClick={() => {
                            props.history["from"] = "logout";
                            props.history.push("/redirect");
                        }}
                        href=' '>
                        <li className='profile-choice'>Sign Out</li>
                    </a>
                </ul>
            </div>
        </aside>
    );

    const messages = (
        <aside className='side-panel-container'>
            <div className='profile-avatar-container'>
                <div>
                    <img
                        className='profile-avatar'
                        src={auth.user ? auth.user.avatar : user}
                        alt='Users profile'
                    />
                </div>
                <p className='avatar-caption'>
                    {" "}
                    <span style={{ fontWeight: "bold" }}>
                        {auth.user ? auth.user.username : ""}
                    </span>
                </p>
            </div>
            <div className='profile-options-container'>
                <ul className='profile-options'>
                    <Link to='/profile'>
                        <li className='profile-choice'>Profile</li>
                    </Link>
                    <Link to='/account'>
                        <li className='profile-choice'>Account</li>
                    </Link>
                    <Link to='/'>
                        <li className='profile-choice'>Back Home</li>
                    </Link>
                    <a
                        onClick={() => {
                            props.history["from"] = "logout";
                            props.history.push("/redirect");
                        }}
                        href=' '>
                        <li className='profile-choice'>Sign Out</li>
                    </a>
                </ul>
            </div>
        </aside>
    );

    switch (props.location.pathname) {
        case "/profile":
            return profile;
        case "/account":
            return account;
        case "/messages":
            return messages;
        default:
            return <Fragment />;
    }
});

SidePanel.propTypes = {
    auth: PropTypes.object,
};

const setProps = (state) => ({
    auth: state.auth,
});

export default connect(setProps, {})(SidePanel);
