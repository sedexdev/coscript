const mongoose = require("mongoose");
const ProjectFolder = require("../../models/ProjectFolder");

const projectFolderData = {
    parentId: "8827y287393uhr293rh19u1h8r3oh23988jjdkal",
    id: "917y391h2jn1k2jnk1ndkiuch9d7y898ch3287h2", // required
    projectId: "9y9813h1uon2kjnkjnia8dyc7qey82uhd2iq2e12", // required
    userId: "5e58667d902d38559c802b13", //required
    label: "Test Label", //required
    folder: true,
    adminFolder: false,
    userBaseFolder: true,
    items: [],
    date: new Date()
};

describe("ProjectFolder model tests", () => {
    beforeAll(async () => {
        await mongoose.connect(
            global.__MONGO_URI__,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            },
            err => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            }
        );
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    it("creates and saves a ProjectFolder instance successfully", async () => {
        const projectFolder = new ProjectFolder(projectFolderData);
        const savedProjectFolder = await projectFolder.save();
        expect(savedProjectFolder._id).toBeDefined();
        expect(savedProjectFolder.parentId).toEqual(projectFolderData.parentId);
        expect(savedProjectFolder.id).toEqual(projectFolderData.id);
        expect(savedProjectFolder.projectId).toEqual(
            projectFolderData.projectId
        );
        expect(savedProjectFolder.userId.toString()).toEqual(
            projectFolderData.userId
        );
        expect(savedProjectFolder.label).toEqual(projectFolderData.label);
        expect(savedProjectFolder.folder).toEqual(projectFolderData.folder);
        expect(savedProjectFolder.adminFolder).toEqual(
            projectFolderData.adminFolder
        );
        expect(savedProjectFolder.userBaseFolder).toEqual(
            projectFolderData.userBaseFolder
        );
        expect(Array.from(savedProjectFolder.items)).toEqual(
            projectFolderData.items
        );
        expect(savedProjectFolder.date).toEqual(projectFolderData.date);
    });

    it("should set any object property not defined in the Schema to undefined", async () => {
        const wrongData = {
            id: "917y391h2jn1k2jnk1ndkiuch9d7y898ch3287h2",
            projectId: "9y9813h1uon2kjnkjnia8dyc7qey82uhd2iq2e12",
            userId: "5e58667d902d38559c802b13",
            label: "Test Label",
            dob: new Date()
        };
        const projectFolder = new ProjectFolder(wrongData);
        const savedProjectFolder = await projectFolder.save();
        expect(savedProjectFolder.dob).toBeUndefined();
    });

    it("should throw a ValidationError if a required field is missing", async () => {
        projectFolderData.id = null;
        projectFolderData.projectId = null;
        projectFolderData.userId = null;
        projectFolderData.label = null;
        const projectFolder = new ProjectFolder(projectFolderData);
        let err;
        try {
            const savedProjectFolder = await projectFolder.save();
            error = savedProjectFolder;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.id).toBeDefined();
        expect(err.errors.projectId).toBeDefined();
        expect(err.errors.userId).toBeDefined();
        expect(err.errors.label).toBeDefined();
    });
});
