const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const Document = require("../../model/models/Document");
const User = require("../../model/models/User");
const ChatRoom = require("../../model/models/ChatRoom");
const ProjectFolder = require("../../model/models/ProjectFolder");
const File = require("../../model/models/File");

const setSessionData = require("../../utils/session-data");

module.exports = () => {
    /**
     * @route           GET /api/projects
     * @description     Get the users most recently saved project
     * @access          Private
     */
    router.get("/", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const docs = await Document.find({ user: session.user.userId });

                if (!docs) {
                    return res.status(400).json({
                        msg: "There are no matching documents",
                    });
                }

                let mostRecent = docs[0];
                if (!mostRecent) return res.json(null);

                docs.forEach((doc) => {
                    if (doc.date > mostRecent.date) mostRecent = doc;
                });
                res.json(mostRecent);
            } else {
                res.status(400).json("Bad request...");
            }
        } catch (err) {
            res.status(500).json({ msg: "Server error..." });
        }
    });

    /**
     * @route           POST /api/projects
     * @description     Create a new project
     * @access          Private
     */
    router.post("/", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const { title, genres, description, image } = req.body;

                const user = await User.findById({ _id: session.user.userId });

                const newProjectId = uuid.v4();

                const projectTitle = title ? title : "Untitled";
                const author = user.profile.displayName;
                const projectGenres = genres ? genres : "";
                const projectDescription = description
                    ? description
                    : "No description yet";
                const coverImg = image ? image : [];
                const collaborators = [session.user.userId];
                const projectId = newProjectId;
                const content = "";
                const url = `/projects/${projectId}`;

                const project = new Document({
                    user: session.user.userId,
                    userData: {
                        name: user.profile.displayName,
                        avatar: user.avatar,
                    },
                    title: projectTitle,
                    author,
                    genres: projectGenres,
                    description: projectDescription,
                    coverImg,
                    collaborators,
                    projectId,
                    content,
                    url,
                });

                await project.save();

                user.profile.userProjects.push(project);
                await user.save();

                let chatRoom = await ChatRoom.findOne({
                    projectId: newProjectId,
                });

                if (!chatRoom) {
                    chatRoom = new ChatRoom({
                        projectId: newProjectId,
                        messages: [],
                    });
                    await chatRoom.save();
                }

                const newParentFolderId = uuid.v4();
                const newFileId = uuid.v4();

                const file = new File({
                    master: true,
                    userId: session.user.userId,
                    file: false,
                    parentId: newParentFolderId,
                    id: newFileId,
                    projectId,
                    label: projectTitle,
                    url,
                    content: "",
                });

                await file.save();

                let projectFolder = await ProjectFolder.findOne({
                    projectId,
                });

                if (!projectFolder) {
                    projectFolder = new ProjectFolder({
                        id: newParentFolderId,
                        projectId,
                        userId: session.user.userId,
                        label: "Master",
                        adminFolder: true,
                        userBaseFolder: false,
                        items: [
                            {
                                _id: file._id,
                                master: true,
                                userId: session.user.userId,
                                file: false,
                                parentId: newParentFolderId,
                                id: newFileId,
                                projectId,
                                label: projectTitle,
                                url,
                                content: "",
                            },
                        ],
                    });
                }

                const userBaseFolder = new ProjectFolder({
                    id: uuid.v4(),
                    projectId,
                    userId: session.user.userId,
                    label: session.user.profile.displayName,
                    adminFolder: false,
                    userBaseFolder: true,
                    items: [],
                });

                await projectFolder.save();
                await userBaseFolder.save();

                session.user = setSessionData(user);

                res.json(project);
            } else {
                res.status(400).json("Bad request...");
            }
        } catch (err) {
            res.status(500).json({ msg: "Server error..." });
        }
    });

    /**
     * @route           GET /api/projects/loadprojects
     * @description     Get all projects
     * @access          Public
     */
    router.get("/loadprojects", async (req, res) => {
        try {
            const docs = await Document.find({});
            res.json(docs);
        } catch (err) {
            res.status(400).json("Bad request...");
        }
    });

    /**
     * @route           POST /api/projects/loadproject
     * @description     Find a project and return its data
     * @access          Public
     */
    router.post("/loadproject", async (req, res) => {
        try {
            const { project } = req.body;
            const doc = await Document.findById(project._id);
            res.json(doc);
        } catch (err) {
            res.status(400).json("Bad request...");
        }
    });

    /**
     * @route           PUT /api/projects/save
     * @description     Save the users document automatically
     * @access          Private
     */
    router.put("/save", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const { content, projectData } = req.body;

                let docs = await Document.find({ user: session.user.userId });

                let draft;
                docs.forEach((doc) => {
                    if (doc.projectId === projectData.projectId) {
                        draft = doc;
                    }
                });

                if (!draft) {
                    return res.status(400).json({
                        msg: "Couldn't find document to update",
                    });
                }

                draft = await Document.findOneAndUpdate(
                    { _id: draft._id },
                    {
                        $set: {
                            ...projectData,
                            content: content,
                            date: new Date(),
                        },
                    },
                    { new: true }
                );
                await draft.save();

                file = await File.findOneAndUpdate(
                    { projectId: projectData.projectId },
                    {
                        $set: {
                            content: content,
                        },
                    },
                    { new: true }
                );
                await draft.save();

                res.json(draft);
            } else {
                res.status(400).json("Bad request...");
            }
        } catch (err) {
            res.status(500).json({ msg: "Server error..." });
        }
    });

    /**
     * @route           PUT /api/projects/update
     * @description     Update the project details
     * @access          Private
     */
    router.put("/update", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                let {
                    projectToEdit,
                    projectTitle,
                    projectGenres,
                    projectDescription,
                } = req.body.data;

                let user = await User.findById({ _id: projectToEdit.user });

                for (let project of user.profile.userProjects) {
                    if (project.projectId === projectToEdit.projectId) {
                        project.title = projectTitle;
                        project.genres = projectGenres;
                        project.description = projectDescription;
                        break;
                    }
                }

                user = await User.findOneAndUpdate(
                    { _id: projectToEdit.user },
                    {
                        $set: {
                            profile: {
                                ...user.profile,
                                userProjects: user.profile.userProjects,
                            },
                        },
                    },
                    { new: true }
                );

                await user.save();

                projectToEdit = await Document.findOneAndUpdate(
                    { _id: projectToEdit._id },
                    {
                        $set: {
                            ...projectToEdit,
                            title: projectTitle,
                            genres: projectGenres,
                            description: projectDescription,
                        },
                    },
                    { new: true }
                );

                await projectToEdit.save();

                res.json(projectToEdit);
            } else {
                res.status(400).json("Bad request...");
            }
        } catch (err) {
            res.status(500).json("Server error...");
        }
    });

    /**
     * @route           PUT /api/projects/date
     * @description     Update the project date
     * @access          Private
     */
    router.put("/date", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                let { project } = req.body;

                project = await Document.findOneAndUpdate(
                    { _id: project._id },
                    {
                        $set: {
                            ...project,
                            date: new Date(),
                        },
                    },
                    { new: true }
                );

                await project.save();
                res.json(project);
            } else {
                res.status(400).json("Bad request...");
            }
        } catch (err) {
            res.status(500).json("Server error...");
        }
    });

    /**
     * @route           PUT /api/projects/publish
     * @description     Update the project date
     * @access          Private
     */
    router.put("/publish", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                let { project } = req.body;

                project = await Document.findOneAndUpdate(
                    { _id: project._id },
                    {
                        $set: {
                            ...project,
                            published: true,
                        },
                    },
                    { new: true }
                );

                await project.save();
                res.json(project);
            } else {
                res.status(400).json("Bad request...");
            }
        } catch (err) {
            res.status(500).json("Server error...");
        }
    });

    /**
     * @route           PUT /api/projects/add
     * @description     Add a user as a project collaborator
     * @access          Private
     */
    router.put("/add", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const { collaboratorId, projectId } = req.body;

                if (session.user.userId === collaboratorId) {
                    return res.status(400).json({
                        errors: ["You are a project member by default"],
                    });
                }

                const collaborator = await User.findById({
                    _id: collaboratorId,
                });

                if (
                    collaborator.profile.blockedUsers.includes(
                        session.user.userId
                    )
                ) {
                    return res.status(400).json({
                        errors: [
                            "This user has completely blocked all contact with you",
                        ],
                    });
                }

                const doc = await Document.findOne({ projectId: projectId });

                if (!doc.collaborators.includes(collaborator._id)) {
                    doc.collaborators.push(collaborator._id);
                    await doc.save();
                } else {
                    return res.status(400).json({
                        errors: ["This user is already a project member"],
                    });
                }

                collaborator.profile.collaboratingProjects.push(doc);
                await collaborator.save();

                const collaboratorFolder = new ProjectFolder({
                    id: uuid.v4(),
                    projectId,
                    userId: collaboratorId,
                    label: collaborator.profile.displayName,
                    adminFolder: false,
                    userBaseFolder: true,
                    items: [],
                });

                await collaboratorFolder.save();

                return res.json(session.user);
            } else {
                return res.status(401).json("Unauthorised...");
            }
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    /**
     * @route         POST /api/projects/collaborators
     * @description   Returns an array of all the collaborators on a project
     * @access        Private
     */
    router.post("/collaborators", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const { collaboratorIds } = req.body;
                const collaborators = [];

                for (let id of collaboratorIds) {
                    const user = await User.findById({ _id: id });
                    collaborators.push({
                        avatar: user.avatar,
                        name: user.profile.displayName,
                        id: user._id,
                        isLoggedIn: user.isLoggedIn,
                    });
                }

                return res.json(collaborators);
            } else {
                return res.status(401).json("Unauthorised...");
            }
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    /**
     * @route         GET /api/projects/collaborations
     * @description   Returns an array of all projects this user collaborates on
     * @access        Private
     */
    router.get("/collaborations", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const user = await User.findById({ _id: session.user.userId });

                if (!user) {
                    return res.status(400).json("Bad request...");
                }

                return res.json(user.profile.collaboratingProjects);
            } else {
                return res.status(401).json("Unauthorised...");
            }
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    /**
     * @route         DELETE /api/projects/delete/:projectId
     * @description   Deletes user's project and all associated objects
     * @access        Private
     */
    router.delete("/delete/:projectId", async (req, res) => {
        try {
            const session = req.session;
            if (session.user) {
                const { projectId } = req.params;

                const project = await Document.findOne({ projectId });

                if (!project) {
                    return res.status(400).json("Bad request...");
                }

                for (let j = 0; j < project.collaborators.length; j++) {
                    let currentUser = await User.findOne({
                        _id: project.collaborators[j],
                    });
                    const usersCollaborations =
                        currentUser.profile.collaboratingProjects;
                    for (let k = 0; k < usersCollaborations.length; k++) {
                        if (projectId === usersCollaborations[k].projectId) {
                            usersCollaborations.splice(k, 1);
                            await currentUser.save();
                        }
                    }
                }

                await Document.findOneAndRemove({ projectId });
                await File.deleteMany({ projectId });
                await ProjectFolder.deleteMany({ projectId });
                await ChatRoom.findOneAndRemove({ projectId });

                const user = await User.findOne({ _id: session.user.userId });

                const projects = user.profile.userProjects;

                for (let i = 0; i < projects.length; i++) {
                    if (projectId === projects[i].projectId) {
                        projects.splice(i, 1);
                    }
                }

                await user.save();
                req.session.user = setSessionData(user);

                const allProjects = await Document.find({});
                return res.json(allProjects);
            } else {
                return res.status(401).json("Unauthorised...");
            }
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    /**
     * @route         DELETE /api/projects/delete/:projectId/collaborator
     * @description   Removes a user as a collaborator on a project
     * @access        Private
     */
    router.delete("/delete/:projectId/collaborator", async (req, res) => {
        try {
            const session = req.session;
            if (session.user) {
                const { projectId } = req.params;

                const user = await User.findOne({ _id: session.user.userId });

                const userCollaborations = user.profile.collaboratingProjects;

                for (let i = 0; i < userCollaborations.length; i++) {
                    if (projectId === userCollaborations[i].projectId) {
                        userCollaborations.splice(i, 1);
                    }
                }

                await user.save();
                req.session.user = setSessionData(user);

                const document = await Document.findOne({ projectId });

                for (let j = 0; j < document.collaborators.length; j++) {
                    if (session.user.userId === document.collaborators[j]) {
                        document.collaborators.splice(j, 1);
                    }
                }

                await document.save();

                await File.deleteMany({ userId: session.user.userId });
                await ProjectFolder.deleteMany({ userId: session.user.userId });

                return res.json({
                    userProjects: user.profile.collaboratingProjects,
                    projectCollaboratorIds: document.collaborators,
                });
            } else {
                return res.status(401).json("Unauthorised...");
            }
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    return router;
};
