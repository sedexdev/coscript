const mongoose = require("mongoose");

const ProjectFolderSchema = mongoose.Schema({
    parentId: {
        type: String,
        default: null
    },
    id: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    folder: {
        type: Boolean,
        default: true
    },
    adminFolder: {
        type: Boolean
    },
    userBaseFolder: {
        type: Boolean
    },
    items: {
        type: [Object]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = ProjectFolder = mongoose.model(
    "projectFolder",
    ProjectFolderSchema
);
