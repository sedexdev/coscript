const mongoose = require("mongoose");
const Message = require("../../models/Message");

const messageData = {
    chatRoom: "5e58667d902d38559c802b13", // required
    user: {
        userId: "5e58667d902d38559c802b14", // required
        name: "Test Name",
        avatar: "http://www.gravatar.com/avatar/123456789"
    },
    content: "Test content",
    date: new Date()
};

describe("Message model tests", () => {
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

    it("creates and saves a Message instance successfully", async () => {
        const message = new Message(messageData);
        const savedMessage = await message.save();
        expect(savedMessage._id).toBeDefined();
        expect(savedMessage.chatRoom.toString()).toEqual(messageData.chatRoom);
        expect(savedMessage.user).toEqual(messageData.user);
        expect(savedMessage.content).toEqual(messageData.content);
        expect(savedMessage.date).toEqual(messageData.date);
    });

    it("should set any object property not defined in the Schema to undefined", async () => {
        const wrongData = {
            chatRoom: "5e58667d902d38559c802b13",
            user: {
                avatar: "http://www.gravatar.com/avatar/123456789",
                name: "Test Name",
                userId: "5e58667d902d38559c802b14"
            },
            dob: new Date()
        };
        const message = new Message(wrongData);
        const savedMessage = await message.save();
        expect(savedMessage.dob).toBeUndefined();
    });

    it("should throw a ValidationError if a required field is missing", async () => {
        messageData.chatRoom = null;
        messageData.user = null;
        const message = new Message(messageData);
        let err;
        try {
            const savedMessage = await message.save();
            error = savedMessage;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.chatRoom).toBeDefined();
        expect(err.errors["user.userId"]).toBeDefined();
    });
});
