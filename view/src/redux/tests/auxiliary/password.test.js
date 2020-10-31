import moxios from "moxios";
import { comparePW, checkCurrentPassword } from "../../auxiliary/password";

const userData = require("../actions/data/auth/user.json");

describe("comparePW function", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should return false if no password supplied", async () => {
        const res = await comparePW(userData);
        expect(res).toBe(false);
    });

    it("should return false if password not equal to any old password", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: { clash: false },
            });
        });
        const res = await comparePW(userData, "password1234");
        expect(res).toBe(false);
    });

    it("should return true if password equal to an old password", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: {
                    errors: { msg: "Password must be 8 or more characters" },
                },
            });
        });
        const res = await comparePW(userData, "password1234");
        expect(res).toBe(true);
    });
});

describe("checkCurrentPassword function", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should return false is password not supplied", async () => {
        const res = await checkCurrentPassword(userData);
        expect(res).toBe(false);
    });

    it("should return true if current password was correct", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: { correct: true },
            });
        });

        const res = await checkCurrentPassword(userData, "password1234");
        expect(res).toBe(true);
    });

    it("should return false if there was an error on the server", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const res = await checkCurrentPassword(userData, "password1234");
        expect(res).toBe(false);
    });
});
