const mongoose = require("mongoose");

const DocumentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userData: {
        name: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        }
    },
    title: {
        type: String
    },
    author: {
        type: String
    },
    genres: {
        type: String
    },
    description: {
        type: String
    },
    coverImg: {
        data: Buffer,
        contentType: String
    },
    collaborators: {
        type: [String]
    },
    published: {
        type: Boolean,
        default: false
    },
    projectId: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    url: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Document = mongoose.model("document", DocumentSchema);
