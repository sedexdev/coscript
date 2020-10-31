const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const Document = require("../../model/models/Document");
const ProjectFolder = require("../../model/models/ProjectFolder");
const File = require("../../model/models/File");

module.exports = () => {
    /**
     * @route        /api/files/:fileId
     * @description  Get a file based on file id
     * @access       Private
     */
    router.get("/:fileId", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const { fileId } = req.params;

                const file = await File.findOne({ id: fileId });

                if (!file) {
                    return res.status(400).json("Bad request...");
                }

                return res.json(file);
            } else {
                return res.status(401).json("Unauthorised...");
            }
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    /**
     * @route         POST /api/files/save
     * @description   Update the content of a file
     * @access        Private
     */
    router.post("/save", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const { content, fileData } = req.body;

                let file = await File.findOne({ id: fileData.id });

                if (!file) {
                    return res.status(400).json("Bad request...");
                }

                file = await File.findOneAndUpdate(
                    { _id: file._id },
                    {
                        $set: {
                            content: content,
                        },
                    },
                    { new: true }
                );

                await file.save();

                return res.json(file);
            } else {
                return res.status(401).json("Unauthorised...");
            }
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    /**
     * @route         POST /api/files/add/:folderId
     * @description   Adds a new file to a project folder
     * @access        Private
     */
    router.post("/add/:folderId", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const { folderId } = req.params;
                const { label } = req.body;

                const parentFolder = await ProjectFolder.findOne({
                    id: folderId,
                });

                if (!parentFolder) {
                    return res.status(400).json("Bad request...");
                }

                const project = await Document.findOne({
                    projectId: parentFolder.projectId,
                });

                const fileId = uuid.v4();

                const file = new File({
                    userId: session.user.userId,
                    master: false,
                    parentId: parentFolder.id,
                    id: fileId,
                    projectId: parentFolder.projectId,
                    label,
                    url: `/file${project.url}/${fileId}`,
                    content: "",
                });

                await file.save();

                parentFolder.items.push({
                    _id: file._id,
                    userId: session.user.userId,
                    master: false,
                    file: true,
                    parentId: parentFolder.id,
                    id: fileId,
                    projectId: parentFolder.projectId,
                    label,
                    url: `/file${project.url}/${fileId}`,
                    content: "",
                });

                await parentFolder.save();

                return res.json(true);
            } else {
                return res.status(401).json("Unauthorised...");
            }
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    return router;
};
