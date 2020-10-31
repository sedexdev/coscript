const mongoose = require("mongoose");
const ChatRoom = require("../../models/ChatRoom");

const chatRoomData = {
    projectId: "123456789", // required
    messages: [],
    date: new Date(),
};

describe("ChatRoom model tests", () => {
    beforeAll(async () => {
        await mongoose.connect(
            global.__MONGO_URI__,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
            },
            (err) => {
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

    it("creates and saves a ChatRoom instance successfully", async () => {
        const chatRoom = new ChatRoom(chatRoomData);
        const savedChatRoom = await chatRoom.save();
        expect(savedChatRoom._id).toBeDefined();
        expect(savedChatRoom.projectId.toString()).toEqual(
            chatRoomData.projectId
        );
        expect(Array.from(savedChatRoom.messages)).toEqual(
            chatRoomData.messages
        );
        expect(savedChatRoom.date).toEqual(chatRoomData.date);
    });

    it("should set any object property not defined in the Schema to undefined", async () => {
        const wrongData = {
            projectId: "123456789",
            name: "Test",
            age: 30,
        };
        const chatRoom = new ChatRoom(wrongData);
        const savedChatRoom = await chatRoom.save();
        expect(savedChatRoom.name).toBeUndefined();
        expect(savedChatRoom.age).toBeUndefined();
    });

    it("should throw a ValidationError if a required field is missing", async () => {
        chatRoomData.projectId = null;
        const chatRoom = new ChatRoom(chatRoomData);
        let err;
        try {
            const savedChatRoom = await chatRoom.save();
            error = savedChatRoom;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.projectId).toBeDefined();
    });
});
