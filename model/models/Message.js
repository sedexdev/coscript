const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    chatRoom: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user: {
        userId: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        }
    },
    content: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Message = mongoose.model("message", MessageSchema);
