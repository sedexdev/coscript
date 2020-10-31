import moxios from "moxios";

import {
    getAllProjectFolders,
    createNewFolder,
    createNewFile,
} from "../../auxiliary/files-folders";

describe("getAllProjectFolders function", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should return an array of project folders if successful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: true,
            });
        });

        const res = await getAllProjectFolders();
        expect(res).toBe(true);
    });

    it("should return an empty array if unsuccessful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 401,
                response: null,
            });
        });

        const res = await getAllProjectFolders();
        expect(res).toEqual([]);
    });
});

describe("createNewFolder function", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should return true if folder creation was successful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: true,
            });
        });

        const res = await createNewFolder();
        expect(res).toBe(true);
    });

    it("should return false if folder creation was unsuccessful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 401,
                response: null,
            });
        });

        const res = await createNewFolder();
        expect(res).toBe(false);
    });
});

describe("createNewFile function", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should return true if file creation was successful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: true,
            });
        });

        const res = await createNewFile();
        expect(res).toBe(true);
    });

    it("should return false if file creation was unsuccessful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 401,
                response: null,
            });
        });

        const res = await createNewFile();
        expect(res).toBe(false);
    });
});
