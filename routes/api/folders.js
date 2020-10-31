const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const Document = require("../../model/models/Document");
const ProjectFolder = require("../../model/models/ProjectFolder");

module.exports = () => {
    /**
     * @route         GET /api/folders/:projectId
     * @description   Gets all folders for a project
     * @access        Private
     */
    router.get("/:projectId", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const { projectId } = req.params;

                const folders = await ProjectFolder.find({});

                if (!folders) {
                    return res
                        .status(400)
                        .json({ msg: "No folders exist yet" });
                }

                const projectFolders = [];
                for (let folder of folders) {
                    if (folder.projectId.toString() === projectId) {
                        projectFolders.push([folder]);
                    }
                }

                return res.json(projectFolders);
            } else {
                return res.status(401).json("Unauthorised...");
            }
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    /**
     * @route         POST /api/folders/add
     * @description   Add a new folder to a project
     * @access        Private
     */
    router.post("/add", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const { projectId, label } = req.body;

                const project = await Document.findOne({ projectId });

                if (!project) {
                    return res
                        .status(400)
                        .json({ msg: "No project exits with that ID" });
                }

                const projectFolder = new ProjectFolder({
                    id: uuid.v4(),
                    projectId,
                    userId: session.user.userId,
                    label,
                    adminFolder: false,
                    userBaseFolder: false,
                    items: []
                });

                await projectFolder.save();

                return res.json(true);
            } else {
                return res.status(401).json("Unauthorised...");
            }
        } catch (error) {
            return res.status(500).json("Server error...");
        }
    });

    return router;
};
