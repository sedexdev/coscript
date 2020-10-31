import moxios from "moxios";
import { getUserMessages, isAdmin } from "../../auxiliary/user-messages";

describe("getUserMessages function", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should return an empty array if getting message was unsuccessful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const res = await getUserMessages();
        expect(res).toEqual([]);
    });

    it("should return an array of message if getting messages was successful", async () => {
        const messages = [
            "Message 1",
            "Message 2",
            "Message 3",
            "Message 4",
            "Message 5",
        ];
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    data: messages,
                },
            });
        });

        const res = await getUserMessages();
        expect(res.data).toEqual(messages);
    });
});

describe("isAdmin function", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should return an false if response returns null", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const res = await isAdmin(null);
        expect(res).toEqual(false);
    });

    it("should return true if user is found to be a project admin", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    admin: true,
                },
            });
        });

        const res = await isAdmin("5e58667d902d38559c802b14");
        expect(res).toEqual(true);
    });
});
