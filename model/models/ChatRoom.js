const mongoose = require("mongoose");

const ChatRoomSchema = mongoose.Schema({
    projectId: {
        type: String,
        required: true,
    },
    messages: {
        type: [Object],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = ChatRoom = mongoose.model("chat-room", ChatRoomSchema);
