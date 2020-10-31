const mongoose = require("mongoose");
const User = require("../../models/User");

const userData = {
    avatar: "http://www.gravatar.com/avatar/123456789",
    email: "test@email.com", // required
    name: "Test Name", // required
    username: "test101", // required
    password: "password123", // required
    passwordHistory: [],
    profile: {
        buttonID: "username-radio",
        displayName: "Test Name",
        about: "Test about",
        authors: [],
        books: [],
        userProjects: [],
        collaboratingProjects: [],
        messages: [],
        friends: [],
        blockedUsers: []
    },
    isRegistered: false,
    isLoggedIn: false,
    profileVisible: true,
    date: new Date()
};

describe("User model tests", () => {
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

    it("creates and saves a User instance successfully", async () => {
        const user = new User(userData);
        const savedUser = await user.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.avatar).toEqual(userData.avatar);
        expect(savedUser.email).toEqual(userData.email);
        expect(savedUser.name).toEqual(userData.name);
        expect(savedUser.username.toString()).toEqual(userData.username);
        expect(savedUser.password).toEqual(userData.password);
        expect(Array.from(savedUser.passwordHistory)).toEqual(
            userData.passwordHistory
        );
        expect(savedUser.profile.buttonID).toEqual(userData.profile.buttonID);
        expect(savedUser.profile.displayName).toEqual(
            userData.profile.displayName
        );
        expect(savedUser.profile.about).toEqual(userData.profile.about);
        expect(Array.from(savedUser.profile.authors)).toEqual(
            userData.profile.authors
        );
        expect(Array.from(savedUser.profile.books)).toEqual(
            userData.profile.books
        );
        expect(Array.from(savedUser.profile.userProjects)).toEqual(
            userData.profile.userProjects
        );
        expect(Array.from(savedUser.profile.collaboratingProjects)).toEqual(
            userData.profile.collaboratingProjects
        );
        expect(Array.from(savedUser.profile.messages)).toEqual(
            userData.profile.messages
        );
        expect(Array.from(savedUser.profile.friends)).toEqual(
            userData.profile.friends
        );
        expect(Array.from(savedUser.profile.blockedUsers)).toEqual(
            userData.profile.blockedUsers
        );
        expect(savedUser.isRegistered).toEqual(userData.isRegistered);
        expect(savedUser.isLoggedIn).toEqual(userData.isLoggedIn);
        expect(savedUser.profileVisible).toEqual(userData.profileVisible);
        expect(savedUser.date).toEqual(userData.date);
    });

    it("should set any object property not defined in the Schema to undefined", async () => {
        const wrongData = {
            email: "test2@email.com",
            name: "Test Name",
            username: "test102",
            password: "password123",
            dob: new Date()
        };
        const user = new User(wrongData);
        const savedUser = await user.save();
        expect(savedUser.dob).toBeUndefined();
    });

    it("should throw a ValidationError if a required field is missing", async () => {
        userData.email = null;
        userData.name = null;
        userData.username = null;
        userData.password = null;
        const user = new User(userData);
        let err;
        try {
            const savedUser = await user.save();
            error = savedUser;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.email).toBeDefined();
        expect(err.errors.name).toBeDefined();
        expect(err.errors.username).toBeDefined();
        expect(err.errors.password).toBeDefined();
    });
});
