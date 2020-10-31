import { baseFolderView, userFolderView } from "../../filterfolders";

const folderData = require("../data/folders.json");

describe("baseFolderView function", () => {
    it("should return an empty array if 'folders' is null", () => {
        expect(baseFolderView(null, "5e58667d902d38559c802b01")).toEqual([]);
    });

    it("should return an empty array if 'userId' is null", () => {
        expect(baseFolderView(folderData.folders, null)).toEqual([]);
    });

    it("should return an empty array if 'folders' is empty", () => {
        expect(baseFolderView([], "5e58667d902d38559c802b01")).toEqual([]);
    });

    it("should return the Master folder, all baseUserFolders and all folders that match the userId", () => {
        expect(
            baseFolderView(folderData.folders, "5e58667d902d38559c802b01")
                .length
        ).toBe(6);
    });
});

describe("userFolderView function", () => {
    it("should return an empty array if 'folders' is null", () => {
        expect(userFolderView(null, "5e58667d902d38559c802b04")).toEqual([]);
    });

    it("should return an empty array if 'userId' is null", () => {
        expect(userFolderView(folderData.folders, null)).toEqual([]);
    });

    it("should return an empty array if 'folders' is empty", () => {
        expect(userFolderView([], "5e58667d902d38559c802b04")).toEqual([]);
    });

    it("should return the Master folder and all folders that match the userId", () => {
        expect(
            userFolderView(folderData.folders, "5e58667d902d38559c802b04")
                .length
        ).toBe(3);
    });
});
