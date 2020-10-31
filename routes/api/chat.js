const express = require("express");
const router = express.Router();

const User = require("../../model/models/User");
const ChatRoom = require("../../model/models/ChatRoom");
const Message = require("../../model/models/Message");

module.exports = () => {
    /**
     * @route        POST /api/chat
     * @description  Send an instant message
     * @access       Private
     */
    router.post("/", async (req, res) => {
        try {
            const { userId, text, projectId } = req.body;

            const user = await User.findById({ _id: userId });
            const chatRoom = await ChatRoom.findOne({ projectId: projectId });

            if (!chatRoom) {
                return res.status(400).json("Bad request...");
            }

            const message = new Message({
                user: {
                    userId,
                    name: user.profile.displayName,
                    avatar: user.avatar,
                },
                userId: userId,
                content: text,
            });

            chatRoom.messages.push(message);

            await chatRoom.save();
            return res.json({ msg: "Message sent" });
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    /**
     * @route        GET /api/chat/:id
     * @description  Get all message in a chat
     * @access       Private
     */
    router.get("/:id", async (req, res) => {
        try {
            const { id } = req.params;

            const chatRoom = await ChatRoom.findOne({ projectId: id });

            if (!chatRoom) {
                return res.status(400).json("Bad request...");
            }
            return res.json(chatRoom.messages);
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    /**
     * @route        POST /api/chat/create
     * @description  Create a new chat room for a project
     * @access       Private
     */
    router.post("/create", async (req, res) => {
        try {
            const { projectId } = req.body;

            const chatRoom = new ChatRoom({
                projectId: projectId,
            });

            await chatRoom.save();
            return res.json(true);
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    return router;
};
