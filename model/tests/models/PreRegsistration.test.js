const mongoose = require("mongoose");
const PreRegistration = require("../../models/PreRegistration");

const preRegistrationData = {
    email: "test@email.com", // required
    name: "Test Name", // required
    username: "test101", //required
    salt: "878237r982h3r2323g87giae8833y28783ry82", // required
    password: "password123", // required
    token: "872y387y3827y186t17t2ybrijnkjadnkjwdw" // required
};

describe("PreRegistration model tests", () => {
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

    it("creates and saves a PreRegistration instance successfully", async () => {
        const preRegistration = new PreRegistration(preRegistrationData);
        const savedPreRegistration = await preRegistration.save();
        expect(savedPreRegistration._id).toBeDefined();
        expect(savedPreRegistration.email).toEqual(preRegistrationData.email);
        expect(savedPreRegistration.name).toEqual(preRegistrationData.name);
        expect(savedPreRegistration.username).toEqual(
            preRegistrationData.username
        );
        expect(savedPreRegistration.salt).toEqual(preRegistrationData.salt);
        expect(savedPreRegistration.password).toEqual(
            preRegistrationData.password
        );
        expect(savedPreRegistration.date).toEqual(preRegistrationData.date);
    });

    it("should set any object property not defined in the Schema to undefined", async () => {
        const wrongData = {
            email: "test@email.com",
            name: "Test Name",
            username: "test101",
            dob: new Date()
        };
        const preRegistration = new PreRegistration(wrongData);
        const savedPreRegistration = await preRegistration.save();
        expect(savedPreRegistration.dob).toBeUndefined();
    });

    it("should throw a ValidationError if a required field is missing", async () => {
        preRegistrationData.email = null;
        preRegistrationData.name = null;
        preRegistrationData.username = null;
        const preRegistration = new PreRegistration(preRegistrationData);
        let err;
        try {
            const savedPreRegistration = await preRegistration.save();
            error = savedPreRegistration;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.email).toBeDefined();
        expect(err.errors.name).toBeDefined();
        expect(err.errors.username).toBeDefined();
    });
});
