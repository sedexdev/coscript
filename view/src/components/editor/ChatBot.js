import React, { useEffect, useRef } from "react";

// icons
import checkCircleIcon from "../../img/icons/check-circle.svg";
import commentIcon from "../../img/icons/comments.svg";

// Redux
import { connect } from "react-redux";
import { getMessages, sendMessage } from "../../redux/actions/chat";

import PropTypes from "prop-types";

export const ChatBot = ({
    user,
    projectData,
    revealChatBot,
    onClick,
    messageText,
    setMessageText,
    ...props
}) => {
    /**
     * Create references for the chat UI input field and
     * the element containing the last message sent
     */
    const chatInput = useRef();
    const lastMessage = useRef();

    /**
     * Destructure this components props
     */
    const { messages, getMessages, sendMessage } = props;

    /**
     * Checks the 'projectData' prop to see if any project
     * data exists in Redux and if it does, uses that data
     * to fetch/update the messages in the instant chat service.
     * Uses the messageText prop as dependency to ensure that
     * useEffect is called whenever changes are made to the
     * messageText state property
     */
    useEffect(() => {
        const loadMessages = async () => {
            if (projectData) {
                await getMessages(projectData.projectId);
            }
            scrollToBottom();
        };
        loadMessages();
    }, [projectData, getMessages, messageText]);

    /**
     * Updates the <messageText> state variable
     * with the text value of the event target
     *
     * @param {Object} e - event object
     */
    const onChange = (e) => {
        setMessageText(e.target.value);
    };

    /**
     * Auto scrolls to the last message sent
     */
    const scrollToBottom = () => {
        if (lastMessage.current) {
            lastMessage.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    /**
     * Filters the chat message array to only return
     * the last 100 messages to avoid slowing down
     * the UI
     */
    const filterChat = () => {
        if (messages.length > 100) {
            return messages.slice(1).slice(-100);
        }
        return messages;
    };

    /**
     * Sends a message over the instant chat service
     *
     * @param {Object} e - event object
     */
    const onClickSend = async (e) => {
        e.preventDefault();
        await sendMessage(user.userId, messageText, projectData.projectId);
        chatInput.current.value = "";
    };

    return (
        <aside className="chat-bot-container">
            <div
                className={revealChatBot ? "chat-box display-chat" : "chat-box"}
            >
                <div className="chat-window">
                    {messages && messages.length ? (
                        filterChat().map((message) => {
                            return (
                                <div
                                    className="chat-message-container"
                                    key={message._id}
                                >
                                    <div className="chat-message-user-container">
                                        <img
                                            className="chat-user-avatar"
                                            src={message.user.avatar}
                                            alt="user avatar"
                                        />
                                        <p className="chat-user-name">
                                            {message.user.name}
                                        </p>
                                    </div>
                                    <p ref={lastMessage}>{message.content}</p>
                                </div>
                            );
                        })
                    ) : (
                        <p className="chat-welcome-message">
                            You can use this chat service to bounce ideas
                            around, collaborate with your CoScripters and get to
                            know each other
                        </p>
                    )}
                </div>
                <form
                    className="editor-chat-form"
                    onSubmit={(e) => onClickSend(e)}
                >
                    <div className="message-input-container">
                        <input
                            className="message-input"
                            type="text"
                            onChange={(e) => onChange(e)}
                            ref={chatInput}
                        />
                        <button
                            className="send-instant-message-btn"
                            type="submit"
                        >
                            <img
                                className="send-message-icon"
                                src={checkCircleIcon}
                                alt="accept icon"
                            />
                        </button>
                    </div>
                </form>
            </div>
            <button className="chat-btn" type="button" onClick={onClick}>
                <img
                    className="chat-icon"
                    src={commentIcon}
                    alt="comment icon"
                />
            </button>
        </aside>
    );
};

ChatBot.propTypes = {
    user: PropTypes.object,
    projectData: PropTypes.object,
    revealChatBot: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

const mapProps = (state) => ({
    messages: state.chat.messages,
});

export default connect(mapProps, { getMessages, sendMessage })(ChatBot);
