const mongoose = require("mongoose");
const File = require("../../models/File");

const fileData = {
    userId: "5e58667d902d38559c802b13", // required
    master: true,
    parentId: "5e58667d902d38559c802b14",
    id: "7y2837yr2iu3rkhiuf82u3hif2b3f878i3rbi3u3h28", // required
    projectId: "5e58667d902d38559c802b15", // required
    label: "Test Label", // required
    file: true, // required
    url:
        "/file/projects/5e58667d902d38559c802b15/7y2837yr2iu3rkhiuf82u3hif2b3f878i3rbi3u3h28", // required
    content: "Test content",
    date: new Date()
};

describe("File model tests", () => {
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

    it("creates and saves a File instance successfully", async () => {
        const file = new File(fileData);
        const savedFile = await file.save();
        expect(savedFile._id).toBeDefined();
        expect(savedFile.userId.toString()).toEqual(fileData.userId);
        expect(savedFile.master).toEqual(fileData.master);
        expect(savedFile.parentId).toEqual(fileData.parentId);
        expect(savedFile.id).toEqual(fileData.id);
        expect(savedFile.projectId).toEqual(fileData.projectId);
        expect(savedFile.label).toEqual(fileData.label);
        expect(savedFile.file).toEqual(fileData.file);
        expect(savedFile.url).toEqual(fileData.url);
        expect(savedFile.content).toEqual(fileData.content);
        expect(savedFile.date).toEqual(fileData.date);
    });

    it("should set any object property not defined in the Schema to undefined", async () => {
        const wrongData = {
            userId: "5e58667d902d38559c802b13",
            id: "7y2837yr2iu3rkhiuf82u3hif2b3f878i3rbi3u3h28",
            projectId: "5e58667d902d38559c802b15",
            label: "Test Label",
            url:
                "/file/projects/5e58667d902d38559c802b15/7y2837yr2iu3rkhiuf82u3hif2b3f878i3rbi3u3h28",
            dob: new Date()
        };
        const file = new File(wrongData);
        const savedFile = await file.save();
        expect(savedFile.dob).toBeUndefined();
    });

    it("should throw a ValidationError if a required field is missing", async () => {
        fileData.userId = null;
        fileData.id = null;
        fileData.projectId = null;
        fileData.label = null;
        fileData.url = null;
        const file = new File(fileData);
        let err;
        try {
            const savedFile = await file.save();
            error = savedFile;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.userId).toBeDefined();
        expect(err.errors.id).toBeDefined();
        expect(err.errors.projectId).toBeDefined();
        expect(err.errors.label).toBeDefined();
        expect(err.errors.url).toBeDefined();
    });
});
