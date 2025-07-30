import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import uuid from "uuid";

import MobileNav from "../MobileNav";
import SidePanel from "../SidePanel";
import Alert from "../../alert/Alert";

// icon imports
import sortUpIcon from "../../../img/icons/sort-up.svg";
import sortDownIcon from "../../../img/icons/sort-down.svg";
import checkCircleIcon from "../../../img/icons/check-circle.svg";
import timesCircleIcon from "../../../img/icons/times-circle.svg";
import banIcon from "../../../img/icons/ban.svg";
import replyIcon from "../../../img/icons/reply.svg";

// Redux
import { connect } from "react-redux";
import {
    sendMessage,
    setMessageRead,
    loadUserProfile,
    addFriend,
    sendDeclineMsg,
    blockUser,
} from "../../../redux/actions/profile";
import { addCollaborator } from "../../../redux/actions/documents";
import {
    getUserMessages,
    isAdmin,
} from "../../../redux/auxiliary/user-messages";

import PropTypes from "prop-types";

import "./messages.css";

export class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: null,
            messageVisibilities: {},
            admins: {},
            revealReplyWindow: false,
            revealCollaborateWindow: false,
            sendersName: "",
            senderId: "",
            projectTitle: "",
            projectId: "",
            recipientId: "",
            replyMsg: "",
            submitted: false,
            loading: true,
            revealFriendWindow: false,
            friendName: "",
            actionName: "",
            friendAction: null,
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.openReplyWindow = this.openReplyWindow.bind(this);
        this.cancelReply = this.cancelReply.bind(this);
        this.openCollaborateWindow = this.openCollaborateWindow.bind(this);
        this.cancelCollaborate = this.cancelCollaborate.bind(this);
        this.showSubmitSpinner = this.showSubmitSpinner.bind(this);
        this.removeSubmitSpinner = this.removeSubmitSpinner.bind(this);
        this.sendReply = this.sendReply.bind(this);
        this.collaborate = this.collaborate.bind(this);
        this.showFriendWindow = this.showFriendWindow.bind(this);
        this.removeFriendWindow = this.removeFriendWindow.bind(this);
        this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
        this.declineFriendRequest = this.declineFriendRequest.bind(this);
        this.blockUser = this.blockUser.bind(this);
    }

    /**
     * Sets the browser tab title and scrolls to the top
     * of the page when the component mounts. Also fetches
     * all the user's personal profile messages and builds
     * an object of 'visible' messages so that individual
     * messages can be opened based on the 'messageId'.
     *
     * Also creates an object of messages that contain
     * references to projects that the user is an admin
     * on so that the user can interact with buttons to add
     * other users to projects they created
     */
    async componentDidMount() {
        document.title = "CoScript - Messages";
        window.scrollTo(0, 0);
        const userMessages = await getUserMessages();
        const visibilityObj = {};
        const adminsObj = {};
        for (let msg of userMessages) {
            const messageId = msg.id;
            visibilityObj[messageId] = false;
            const projectId = msg.projectId;
            adminsObj[projectId] = false;
        }
        setTimeout(() => {
            this.setState({
                messages: userMessages,
                messageVisibilities: visibilityObj,
                admins: adminsObj,
                loading: false,
            });
        }, 500);
    }

    /**
     * Sets the 'replyMsg' state property to the value
     * of the event target
     *
     * @param {Object} e - event object
     */
    onChange(e) {
        this.setState({
            replyMsg: e.target.value,
        });
    }

    /**
     * Sets the visibility of a message to the opposite boolean
     * value of of its current value. E.g. if the visibility is
     * false, it is set to true and vice-versa. Also updates the
     * messages 'read' property to true in the database
     *
     * @param {String} messageId - id of the message
     */
    async onClick(messageId) {
        const { messageVisibilities } = this.state;
        await this.props.setMessageRead(messageId);
        messageVisibilities[messageId] = !messageVisibilities[messageId];
        this.setState({
            [messageVisibilities]: messageVisibilities,
        });
    }

    /**
     * Opens the reply window so that a reply can be sent
     * back to a user. Sets all state properties associated
     * with sending a reply message to a user
     *
     * @param {String} message - the message being replied to
     */
    openReplyWindow(message) {
        this.setState({
            sendersName: message.sender.name,
            senderId: message.sender.id,
            projectTitle: message.projectTitle,
            projectId: message.projectId,
            recipientId: message.recipientId,
            revealReplyWindow: true,
        });
    }

    /**
     * Hides the reply window by falsifying all state
     * properties associated with sending a reply message
     */
    cancelReply() {
        this.setState({
            senderId: "",
            sendersName: "",
            projectTitle: "",
            projectId: "",
            recipientId: "",
            revealReplyWindow: false,
        });
    }

    /**
     * Opens the collaborate window so that a reply can be sent
     * back to a user. Sets all state properties associated
     * with sending a collaborate message to a user
     *
     * @param {String} message - the message being replied to
     */
    openCollaborateWindow(message) {
        this.setState({
            sendersName: message.sender.name,
            senderId: message.sender.id,
            projectId: message.projectId,
            projectTitle: message.projectTitle,
            revealCollaborateWindow: true,
        });
    }

    /**
     * Hides the collaborate window by falsifying all state
     * properties associated with sending a collaborate message
     */
    cancelCollaborate() {
        this.setState({
            sendersName: "",
            senderId: "",
            projectId: "",
            projectTitle: "",
            revealCollaborateWindow: false,
        });
    }

    /**
     * Sets the 'submitted' state property to true so that
     * a loading spinner can be displayed to a user while
     * an action is taking place
     */
    showSubmitSpinner() {
        this.setState({
            submitted: true,
        });
    }

    /**
     * Sets the 'submitted' state property to false so that
     * a loading spinner can be removed from the UI
     */
    removeSubmitSpinner() {
        this.setState({
            submitted: false,
        });
    }

    /**
     * Sends a reply message to another user who originally
     * sent a message to this user. The message details
     * come from the component state
     *
     * @param {Object} e - event object
     */
    async sendReply(e) {
        e.preventDefault();
        this.showSubmitSpinner();
        const { replyMsg, senderId, projectTitle, projectId, recipientId } =
            this.state;
        const success = await this.props.sendMessage(
            replyMsg,
            recipientId,
            projectTitle,
            projectId,
            senderId
        );
        if (success) {
            this.removeSubmitSpinner();
            this.setState({
                revealReplyWindow: false,
            });
        } else {
            setTimeout(() => {
                this.removeSubmitSpinner();
            }, 1000);
        }
    }

    /**
     * When a user sends a message to a project creator in
     * reference to a project they want to join, the message
     * received will have a 'Collaborate' button in the
     * bottom left corner. This function checks is the user
     * is an admin on the project the message is referring to,
     * if they are, they can interact with the 'Collaborate'
     * button
     *
     * @param {String} projectId - id of the project
     */
    async checkAdmin(projectId) {
        const { admins } = this.state;
        admins[projectId] = await isAdmin(projectId);
        this.setState({
            [admins]: admins,
        });
    }

    /**
     * Sets a user as a collaborator on a project once the
     * project admin has accepted their request using the
     * 'Collaborate' button in the message
     *
     * @param {Object} e - event object
     */
    async collaborate(e) {
        e.preventDefault();
        const { senderId, sendersName, projectId, projectTitle } = this.state;
        const { user, addCollaborator } = this.props;
        this.showSubmitSpinner();
        const success = await addCollaborator(
            senderId,
            user.userId,
            sendersName,
            projectId,
            projectTitle
        );
        if (success) {
            this.removeSubmitSpinner();
            this.setState({
                revealCollaborateWindow: false,
            });
        } else {
            setTimeout(() => {
                this.removeSubmitSpinner();
            }, 1000);
        }
    }

    /**
     * Opens a window allowing the user to reply to a
     * friend request. A simple button selection lets the
     * user either accept or decline the request, or block
     * the requesting user from all contact.about
     *
     * A message is sent automatically to the requesting
     * user based on the users choice
     *
     * @param {String} message    - message being replied to
     * @param {String} actionName - action to perform on friend
     */
    showFriendWindow(message, actionName) {
        let action;
        switch (actionName) {
            case "accept":
                action = this.acceptFriendRequest;
                break;
            case "decline":
                action = this.declineFriendRequest;
                break;
            case "block":
                action = this.blockUser;
                break;
            default:
                action = null;
        }
        this.setState({
            revealFriendWindow: true,
            friendName: message.sender.name,
            actionName: actionName,
            friendAction: action,
            senderId: message.sender.id,
            projectTitle: message.projectTitle,
        });
    }

    /**
     * Hides the friend request reply by falsifying all
     * state properties associated with replying to
     * friend requests
     */
    removeFriendWindow() {
        this.setState({
            revealFriendWindow: false,
            friendName: "",
            actionName: "",
            friendAction: null,
            senderId: "",
        });
    }

    /**
     * Adds a user sending a friend request to the message
     * recipients friend list in the database
     *
     * @param {Object} e - event object
     */
    async acceptFriendRequest(e) {
        e.preventDefault();
        this.showSubmitSpinner();
        const { senderId, friendName, projectTitle } = this.state;
        const { user, addFriend } = this.props;
        const success = await addFriend(
            user.userId,
            senderId,
            friendName,
            projectTitle
        );
        if (success) {
            this.setState({
                revealFriendWindow: false,
            });
            this.removeSubmitSpinner();
        } else {
            setTimeout(() => {
                this.removeSubmitSpinner();
            }, 1000);
        }
    }

    /**
     * Declines to add a user sending a friend request
     * to the message recipients friend list in the database
     *
     * @param {Object} e - event object
     */
    async declineFriendRequest(e) {
        e.preventDefault();
        this.showSubmitSpinner();
        const { senderId, friendName } = this.state;
        const { user, sendDeclineMsg } = this.props;
        const success = await sendDeclineMsg(user.userId, senderId, friendName);
        if (success) {
            this.setState({
                revealFriendWindow: false,
            });
            this.removeSubmitSpinner();
        } else {
            setTimeout(() => {
                this.removeSubmitSpinner();
            }, 1000);
        }
    }

    /**
     * Blocks a user sending a friend request from contacting
     * the message recipient in anyway from here on
     *
     * @param {Object} e - event object
     */
    async blockUser(e) {
        e.preventDefault();
        this.showSubmitSpinner();
        const { senderId, friendName } = this.state;
        const { user, blockUser } = this.props;
        const success = await blockUser(user.userId, senderId, friendName);
        if (success) {
            this.setState({
                revealFriendWindow: false,
            });
            this.removeSubmitSpinner();
        } else {
            setTimeout(() => {
                this.removeSubmitSpinner();
            }, 1000);
        }
    }

    render() {
        const {
            messages,
            messageVisibilities,
            admins,
            revealReplyWindow,
            revealCollaborateWindow,
            revealFriendWindow,
            sendersName,
            projectTitle,
            submitted,
            loading,
            friendName,
            actionName,
            friendAction,
        } = this.state;

        const { loadUserProfile, history } = this.props;

        const spinner = require("../../../img/loading-black.svg");

        return (
            <Fragment>
                <main className="profile-container">
                    <MobileNav />
                    <SidePanel />
                    {revealReplyWindow && (
                        <div className="reply-message-box">
                            {" "}
                            <form onSubmit={(e) => this.sendReply(e)}>
                                <p className="reply-heading">
                                    Reply to {sendersName}
                                </p>
                                <div className="reply-container">
                                    <textarea
                                        className="reply-input"
                                        name="replyMsg"
                                        type="text"
                                        onChange={(e) => this.onChange(e)}
                                    ></textarea>
                                </div>
                                <div className="btn-container">
                                    {submitted && (
                                        <img
                                            className="reply-msg-loading-spinner"
                                            src={spinner}
                                            alt="loading"
                                        />
                                    )}
                                    <button
                                        className="cancel-btn"
                                        onClick={this.cancelReply}
                                    >
                                        Cancel
                                    </button>
                                    <input
                                        className="confirm-btn"
                                        type="submit"
                                        value="Send"
                                    />
                                </div>
                            </form>
                        </div>
                    )}

                    {revealCollaborateWindow && (
                        <div className="collaborate-box">
                            {" "}
                            <form onSubmit={(e) => this.collaborate(e)}>
                                <p className="collaborate-heading">
                                    Add <b>{sendersName}</b> as a collaborator
                                    on {projectTitle}?
                                </p>
                                <div className="btn-container">
                                    {submitted && (
                                        <img
                                            className="reply-msg-loading-spinner"
                                            src={spinner}
                                            alt="loading"
                                        />
                                    )}
                                    <button
                                        className="cancel-btn"
                                        onClick={this.cancelCollaborate}
                                    >
                                        Cancel
                                    </button>
                                    <input
                                        className="confirm-btn"
                                        type="submit"
                                        value="Add"
                                    />
                                </div>
                            </form>
                        </div>
                    )}

                    {revealFriendWindow && (
                        <div className="collaborate-box">
                            {" "}
                            <form onSubmit={(e) => friendAction(e)}>
                                {actionName === "accept" && (
                                    <p className="collaborate-heading">
                                        Accept <b>{friendName}'s</b> request and
                                        add as a friend?
                                    </p>
                                )}
                                {actionName === "decline" && (
                                    <p className="collaborate-heading">
                                        Decline <b>{friendName}'s</b> request?
                                    </p>
                                )}
                                {actionName === "block" && (
                                    <p className="collaborate-heading">
                                        Block <b>{friendName}</b>? You will no
                                        longer be able to send or receive
                                        communications to or from this user.
                                    </p>
                                )}
                                <div className="btn-container">
                                    {submitted && (
                                        <img
                                            className="reply-msg-loading-spinner"
                                            src={spinner}
                                            alt="loading"
                                        />
                                    )}
                                    <button
                                        className="cancel-btn"
                                        onClick={this.removeFriendWindow}
                                    >
                                        Cancel
                                    </button>
                                    {actionName === "accept" && (
                                        <input
                                            className="confirm-btn"
                                            type="submit"
                                            value="Add"
                                        />
                                    )}
                                    {actionName === "decline" && (
                                        <input
                                            className="confirm-btn"
                                            type="submit"
                                            value="Decline"
                                        />
                                    )}
                                    {actionName === "block" && (
                                        <input
                                            className="confirm-btn"
                                            type="submit"
                                            value="Block"
                                        />
                                    )}
                                </div>
                            </form>
                        </div>
                    )}

                    <Alert />
                    <div className="user-info-container">
                        <h1 className="profile-h1">My Messages</h1>
                        {loading ? (
                            <div className="message-spinner-container">
                                <img
                                    className="message-spinner"
                                    src={spinner}
                                    alt="loading"
                                />
                                <p className="message-loading-msg">
                                    Loading messages...
                                </p>
                            </div>
                        ) : (
                            <section className="profile">
                                <div className="user-messages">
                                    {messages && messages.length ? (
                                        messages.map((message) => {
                                            return (
                                                <div
                                                    className="user-message-container"
                                                    key={message.id}
                                                >
                                                    <div className="message-title-container">
                                                        <div className="message-title-wrapper">
                                                            <div
                                                                className={
                                                                    message.read
                                                                        ? "read-icon read"
                                                                        : "read-icon unread"
                                                                }
                                                            ></div>
                                                            <p className="message-title">
                                                                {message.friendRequest
                                                                    ? "You have a friend request"
                                                                    : message.text}
                                                            </p>
                                                        </div>
                                                        {messageVisibilities[
                                                            message.id
                                                        ] ? (
                                                            <img
                                                                className="icon icon-top"
                                                                src={sortUpIcon}
                                                                alt="Sort up icon"
                                                                onClick={() => {
                                                                    this.onClick(
                                                                        message.id
                                                                    );
                                                                    this.checkAdmin(
                                                                        message.projectId
                                                                    );
                                                                }}
                                                            />
                                                        ) : (
                                                            <img
                                                                className="icon icon-bottom"
                                                                src={
                                                                    sortDownIcon
                                                                }
                                                                alt="Sort down icon"
                                                                onClick={() => {
                                                                    this.onClick(
                                                                        message.id
                                                                    );
                                                                    this.checkAdmin(
                                                                        message.projectId
                                                                    );
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                    {messageVisibilities[
                                                        message.id
                                                    ] && (
                                                        <Fragment>
                                                            <p className="message">
                                                                {message.text
                                                                    .split("\n")
                                                                    .map(
                                                                        (
                                                                            section
                                                                        ) => {
                                                                            let key =
                                                                                uuid.v4();
                                                                            return (
                                                                                <span
                                                                                    key={
                                                                                        key
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        section
                                                                                    }
                                                                                    <br />
                                                                                    <br />
                                                                                </span>
                                                                            );
                                                                        }
                                                                    )}
                                                            </p>
                                                            <p className="sender">
                                                                <b>Sender</b>:{" "}
                                                                <button
                                                                    className="sender-link"
                                                                    onClick={async () => {
                                                                        await loadUserProfile(
                                                                            message
                                                                                .sender
                                                                                .id
                                                                        );
                                                                        const {
                                                                            userProfile,
                                                                        } =
                                                                            this
                                                                                .props;
                                                                        history.push(
                                                                            `/profile/user/${userProfile.id}`
                                                                        );
                                                                    }}
                                                                >
                                                                    {
                                                                        message
                                                                            .sender
                                                                            .name
                                                                    }
                                                                </button>
                                                            </p>
                                                            <p className="related">
                                                                <b>Regarding</b>
                                                                :{" "}
                                                                {
                                                                    message.projectTitle
                                                                }
                                                            </p>
                                                            <div className="date-and-reply">
                                                                <p className="sent">
                                                                    <b>Sent</b>:{" "}
                                                                    {
                                                                        message.date
                                                                    }
                                                                </p>
                                                                <div className="option-btns">
                                                                    {message.friendRequest ? (
                                                                        <Fragment>
                                                                            <button className="accept-btn-container">
                                                                                {" "}
                                                                                <img
                                                                                    src={
                                                                                        checkCircleIcon
                                                                                    }
                                                                                    className="accept-btn"
                                                                                    title="Accept"
                                                                                    onClick={() =>
                                                                                        this.showFriendWindow(
                                                                                            message,
                                                                                            "accept"
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </button>
                                                                            <button className="accept-btn-container">
                                                                                {" "}
                                                                                <img
                                                                                    src={
                                                                                        timesCircleIcon
                                                                                    }
                                                                                    className="accept-btn"
                                                                                    title="Decline"
                                                                                    onClick={() =>
                                                                                        this.showFriendWindow(
                                                                                            message,
                                                                                            "decline"
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </button>
                                                                            <button className="accept-btn-container">
                                                                                {" "}
                                                                                <img
                                                                                    src={
                                                                                        banIcon
                                                                                    }
                                                                                    className="accept-btn"
                                                                                    title="Block user"
                                                                                    onClick={() =>
                                                                                        this.showFriendWindow(
                                                                                            message,
                                                                                            "block"
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </button>
                                                                        </Fragment>
                                                                    ) : (
                                                                        <Fragment>
                                                                            <button
                                                                                className="reply-btn-container"
                                                                                onClick={() =>
                                                                                    this.openReplyWindow(
                                                                                        message
                                                                                    )
                                                                                }
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        replyIcon
                                                                                    }
                                                                                    className="reply-btn"
                                                                                    title="Reply"
                                                                                />
                                                                            </button>
                                                                            {admins[
                                                                                message
                                                                                    .projectId
                                                                            ] ? (
                                                                                <button
                                                                                    className="accept-btn-container"
                                                                                    onClick={() =>
                                                                                        this.openCollaborateWindow(
                                                                                            message
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <img
                                                                                        src={
                                                                                            checkCircleIcon
                                                                                        }
                                                                                        className="accept-btn"
                                                                                        title="Collaborate"
                                                                                    />
                                                                                </button>
                                                                            ) : (
                                                                                <button
                                                                                    className="accept-btn-container"
                                                                                    disabled
                                                                                >
                                                                                    <img
                                                                                        src={
                                                                                            checkCircleIcon
                                                                                        }
                                                                                        className="accept-btn"
                                                                                        title="Collaborate"
                                                                                    />
                                                                                </button>
                                                                            )}
                                                                        </Fragment>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </Fragment>
                                                    )}
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="empty-message">
                                            You currently have no messages
                                        </p>
                                    )}
                                </div>
                            </section>
                        )}
                    </div>
                </main>
            </Fragment>
        );
    }
}

Messages.propTypes = {
    user: PropTypes.object,
    userProfile: PropTypes.object,
    sendMessage: PropTypes.func.isRequired,
    setMessageRead: PropTypes.func.isRequired,
    addCollaborator: PropTypes.func.isRequired,
    loadUserProfile: PropTypes.func.isRequired,
    addFriend: PropTypes.func.isRequired,
    sendDeclineMsg: PropTypes.func.isRequired,
    blockUser: PropTypes.func.isRequired,
};

const mapProps = (state) => ({
    user: state.auth.user,
    userProfile: state.auth.userProfile,
});

export default connect(mapProps, {
    sendMessage,
    setMessageRead,
    addCollaborator,
    loadUserProfile,
    addFriend,
    sendDeclineMsg,
    blockUser,
})(withRouter(Messages));
