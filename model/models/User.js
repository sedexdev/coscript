const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    passwordHistory: {
        type: [Object]
    },
    profile: {
        buttonID: {
            type: String,
            default: "username-radio"
        },
        displayName: {
            type: String
        },
        about: {
            type: String,
            default: ""
        },
        authors: {
            type: [String]
        },
        books: {
            type: [String]
        },
        userProjects: {
            type: [Object]
        },
        collaboratingProjects: {
            type: [Object]
        },
        messages: {
            type: [Object]
        },
        friends: {
            type: [String]
        },
        blockedUsers: {
            type: [String]
        }
    },
    isRegistered: {
        type: Boolean,
        default: false
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    profileVisible: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("user", UserSchema);
