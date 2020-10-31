const mongoose = require("mongoose");
const Document = require("../../models/Document");

const documentData = {
    user: "5e58667d902d38559c802b13", // required
    userData: {
        name: "Test Name", // required
        avatar: "http://www.gravatar.com/avatar/123456789" // required
    },
    title: "Test Title",
    author: "Test Name",
    genres: "Test Genres",
    description: "Test description",
    coverImg: [],
    collaborators: [],
    published: false,
    projectId: "5e58667d902d38559c802b14", // required
    content: "Test content",
    url: "/projects/5e58667d902d38559c802b14", //required
    date: new Date()
};

describe("Document model tests", () => {
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

    it("creates and saves a Document instance successfully", async () => {
        const doc = new Document(documentData);
        const savedDoc = await doc.save();
        expect(savedDoc._id).toBeDefined();
        expect(savedDoc.userData).toEqual(documentData.userData);
        expect(savedDoc.author).toEqual(documentData.author);
        expect(savedDoc.genres).toEqual(documentData.genres);
        expect(Array.from(savedDoc.coverImg)).toEqual(documentData.coverImg);
        expect(Array.from(savedDoc.collaborators)).toEqual(
            documentData.collaborators
        );
        expect(savedDoc.published).toEqual(documentData.published);
        expect(savedDoc.projectId).toEqual(documentData.projectId);
        expect(savedDoc.content).toEqual(documentData.content);
        expect(savedDoc.url).toEqual(documentData.url);
        expect(savedDoc.date).toEqual(documentData.date);
    });

    it("should set any object property not defined in the Schema to undefined", async () => {
        const wrongData = {
            user: "5e58667d902d38559c802b13",
            projectId: "5e58667d902d38559c802b14",
            url: "/projects/5e58667d902d38559c802b14",
            userData: {
                name: "Test",
                avatar: "http://www.gravatar.com/avatar/123456789"
            },
            dob: new Date()
        };
        const doc = new Document(wrongData);
        const savedDoc = await doc.save();
        expect(savedDoc.dob).toBeUndefined();
    });

    it("should throw a ValidationError if a required field is missing", async () => {
        documentData.user = null;
        documentData.projectId = null;
        documentData.url = null;
        documentData.userData = null;
        const doc = new Document(documentData);
        let err;
        try {
            const savedDoc = await doc.save();
            error = savedDoc;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.user).toBeDefined();
        expect(err.errors.projectId).toBeDefined();
        expect(err.errors.url).toBeDefined();
        expect(err.errors["userData.name"]).toBeDefined();
        expect(err.errors["userData.avatar"]).toBeDefined();
    });
});
