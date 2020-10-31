import moxios from "moxios";
import {
    sendEmail,
    sendPWEmail,
    verifyPWCode,
    sendTempCredentialsEmail,
} from "../../auxiliary/sendEmail";

describe("sendEmail function", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should return undefined if response is null", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const result = await sendEmail(
            "test@email.com",
            "Testing",
            "Test suite"
        );
        expect(result).toBe(undefined);
    });

    it("should return a numerical code if sending email is successful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: { originalCode: 123456 },
            });
        });

        const res = await sendEmail("test@email.com", "Testing", "Test suite");

        expect(res.data.originalCode).toBe(123456);
    });
});

describe("sendPWEmail function", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should return undefined if response is null", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const result = await sendPWEmail("test@email.com");
        expect(result).toBe(undefined);
    });

    it("should return a numerical code if sending email is successful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: { originalCode: 123456 },
            });
        });

        const res = await sendPWEmail("test@email.com");

        expect(res.data.originalCode).toBe(123456);
    });
});

describe("verifyPWCode function", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("return an object confirming verification failed if 'res.data.success' is false", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: { success: false },
            });
        });
        const res = await verifyPWCode("123456", "654321", false);
        expect(res).toEqual({ success: false, msg: "Code does not match" });
    });

    it("return an object confirming verification succeeded if 'res.data.success' is true", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: { success: true },
            });
        });

        const res = await verifyPWCode("123456", "123456", false);
        expect(res).toEqual({ success: true, msg: "" });
    });
});

describe("sendTempCredentialsEmail function", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should return false if sending email was unsuccessful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: { success: false },
            });
        });

        const res = await sendTempCredentialsEmail("test@email.com");
        expect(res).toBe(false);
    });

    it("should return true if sending email was successful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: { success: true },
            });
        });

        const res = await sendTempCredentialsEmail("test@email.com");
        expect(res).toBe(true);
    });
});
