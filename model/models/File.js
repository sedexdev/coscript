const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    master: {
        type: Boolean
    },
    parentId: {
        type: String
    },
    id: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    file: {
        type: Boolean,
        default: true
    },
    url: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = File = mongoose.model("file", FileSchema);
