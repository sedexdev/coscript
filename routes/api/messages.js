const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const User = require("../../model/models/User");

const { encryptMsg, decryptMsg } = require("../../middleware/store-message");
const setSessionData = require("../../utils/session-data");

module.exports = () => {
    /**
     * @route           GET /api/messages
     * @description     Get users messages
     * @access          Private
     */
    router.get("/", async (req, res) => {
        try {
            const session = req.session;
            if (session.user) {
                const user = await User.findById({ _id: session.user.userId });

                for (let msg of user.profile.messages) {
                    msg.text = decryptMsg(msg.text);
                }

                return res.json(user.profile.messages);
            } else {
                return res.status(400).json("Bad request...");
            }
        } catch (err) {
            res.status(500).json("Server error...");
        }
    });

    /**
     * @route           POST /api/messages
     * @description     Send a message to a user
     * @access          Private
     */
    router.post("/", encryptMsg, async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const {
                    msgText,
                    senderId,
                    projectTitle,
                    projectId,
                    recipientId,
                } = req.body;

                let sender = await User.findById({ _id: senderId });

                const senderObj = {
                    id: sender._id,
                    name: sender.profile.displayName,
                };

                let user = await User.findById({ _id: recipientId });

                if (!user) {
                    return res.status(400).json("Bad request...");
                }

                if (user.profile.blockedUsers.includes(senderId)) {
                    return res.status(400).json({
                        errors: [
                            "This user has blocked you from contacting them",
                        ],
                    });
                }

                const date = new Date();
                const today = date.toUTCString();

                const profileObj = user.profile;
                const messageObj = {
                    id: uuid.v4(),
                    text: msgText,
                    projectTitle,
                    projectId,
                    recipientId,
                    sender: senderObj,
                    read: false,
                    friendRequest: false,
                    date: today,
                };

                profileObj.messages.unshift(messageObj);
                user = await User.findOneAndUpdate(
                    { _id: recipientId },
                    { $set: { profile: profileObj } },
                    { new: true }
                );
                await user.save();
                return res.json(session.user);
            } else {
                return res.status(400).json("Bad request...");
            }
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    /**
     * @route           PUT /api/messages
     * @description     Set a users message to read
     * @access          Private
     */
    router.put("/set-read", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const { messageId } = req.body;

                let user = await User.findById({ _id: session.user.userId });

                for (let msg of user.profile.messages) {
                    if (msg.id === messageId) {
                        msg.read = true;
                        break;
                    }
                }

                const updatedMessages = user.profile.messages;

                await User.findOneAndUpdate(
                    { _id: session.user.userId },
                    {
                        $set: {
                            profile: {
                                ...user.profile,
                                messages: updatedMessages,
                            },
                        },
                    },
                    { new: true }
                );

                session.user = setSessionData(user);
                res.json(session.user);
            } else {
                return res.status(401).json("Unauthorised");
            }
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    /**
     * @route           POST /api/messages/request
     * @description     Send a friend request to a user
     * @access          Private
     */
    router.post("/request", encryptMsg, async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const { msgText, senderId, friendId } = req.body;

                let sender = await User.findById({ _id: senderId });

                if (!sender) {
                    return res.status(400).json("Bad request...");
                }

                if (sender.profile.friends.includes(friendId)) {
                    return res.status(400).json({
                        errors: ["You are already friends with this user"],
                    });
                }

                const senderObj = {
                    id: sender._id,
                    name: sender.profile.displayName,
                };

                let user = await User.findById({ _id: friendId });

                if (!user) {
                    return res.status(400).json("Bad request...");
                }

                if (user.profile.blockedUsers.includes(senderId)) {
                    return res.status(400).json({
                        errors: [
                            "This user has blocked you from contacting them",
                        ],
                    });
                }

                const date = new Date();
                const today = date.toUTCString();

                const profileObj = user.profile;
                const messageObj = {
                    id: uuid.v4(),
                    text: msgText,
                    recipientId: friendId,
                    projectTitle: "Connection request",
                    sender: senderObj,
                    read: false,
                    friendRequest: true,
                    date: today,
                };

                profileObj.messages.unshift(messageObj);
                user = await User.findOneAndUpdate(
                    { _id: friendId },
                    { $set: { profile: profileObj } },
                    { new: true }
                );
                await user.save();
                res.json(session.user);
            } else {
                res.status(400).json("Bad request...");
            }
        } catch (err) {
            res.status(500).json("Server error...");
        }
    });

    /**
     * @route           POST /api/messages/response
     * @description     Send an automatic response message upon
     *                  calling friend request response function
     * @access          Private
     */
    router.post("/response", encryptMsg, async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const { msgText, userId, friendId, projectTitle } = req.body;

                let sender = await User.findById({ _id: userId });

                if (!sender) {
                    return res.status(400).json("Bad request...");
                }

                const senderObj = {
                    id: sender._id,
                    name: sender.profile.displayName,
                };

                let user = await User.findById({ _id: friendId });

                if (!user) {
                    return res.status(400).json("Bad request...");
                }

                const date = new Date();
                const today = date.toUTCString();

                const profileObj = user.profile;
                const messageObj = {
                    id: uuid.v4(),
                    text: msgText,
                    recipientId: friendId,
                    projectTitle,
                    sender: senderObj,
                    read: false,
                    friendRequest: false,
                    date: today,
                };

                profileObj.messages.unshift(messageObj);
                user = await User.findOneAndUpdate(
                    { _id: friendId },
                    { $set: { profile: profileObj } },
                    { new: true }
                );
                await user.save();
                res.json(true);
            } else {
                res.status(400).json("Bad request...");
            }
        } catch (err) {
            res.status(500).json("Server error...");
        }
    });

    /**
     * @route           POST /api/messages/is-admin
     * @description     Check to see if a user is admin on a project
     * @access          Private
     */
    router.post("/is-admin", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const { projectId } = req.body;
                const user = await User.findById({ _id: session.user.userId });

                let searched = 0;

                for (let project of user.profile.userProjects) {
                    searched++;
                    if (project.projectId === projectId) {
                        return res.json({ admin: true });
                    }
                }

                if (searched === user.profile.userProjects.length) {
                    return res.json({ admin: false });
                }
            } else {
                return res.status(401).json("Unauthorised...");
            }
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    /**
     * @route           POST /api/messages/group
     * @description     CSend a message to all project collaborators
     * @access          Private
     */
    router.post("/group", encryptMsg, async (req, res) => {
        try {
            const session = req.session;

            if (session.user) {
                const {
                    collaboratorIds,
                    projectId,
                    msgText,
                    subject,
                } = req.body;

                const project = await Document.findOne({ projectId });

                let messageSubject;
                switch (subject) {
                    case "collaborator_left":
                        messageSubject = `${project.title} has lost a CoScripter :(`;
                        break;
                    default:
                        messageSubject = `${project.title}`;
                }

                for (let id of collaboratorIds) {
                    let user = await User.findById({ _id: id });

                    const date = new Date();
                    const today = date.toUTCString();

                    const profileObj = user.profile;
                    const messageObj = {
                        id: uuid.v4(),
                        text: msgText,
                        recipientId: user._id,
                        projectTitle: messageSubject,
                        sender: {
                            id: session.user.userId,
                            name: session.user.profile.displayName,
                        },
                        read: false,
                        friendRequest: false,
                        date: today,
                    };

                    profileObj.messages.unshift(messageObj);
                    user = await User.findOneAndUpdate(
                        { _id: user._id },
                        { $set: { profile: profileObj } },
                        { new: true }
                    );
                }
                return res.status(200).json({ msg: "Group message sent" });
            } else {
                return res.status(401).json("Unauthorised...");
            }
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    return router;
};
