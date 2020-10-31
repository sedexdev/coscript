import {
    shuffle,
    segment,
    filterUsersProjects,
    filterActive,
    filterPublished,
    filterByCriteria,
} from "../../auxiliary/projects";

const projectData = require("./data/project.json");
const projectsData = require("./data/projects.json");
const activeData = require("./data/activeProjects.json");
const publishedData = require("./data/publishedProjects.json");

describe("shuffle function", () => {
    it("should not process an array of length 0", () => {
        const originalArray = [];
        shuffle([]);
        expect(originalArray).toEqual([]);
    });

    it("should not process an array of length 1", () => {
        const originalArray = Array.from(projectData.projects);
        shuffle(originalArray);
        expect(projectData.projects).toEqual(originalArray);
    });

    it("should not alter the length of the input array", () => {
        const originalArray = Array.from(projectsData.projects);
        shuffle(originalArray);
        expect(projectsData.projects.length).toEqual(originalArray.length);
    });

    it("should randomly swap the elements of the input array", () => {
        let originalArray = Array.from(projectsData.projects);
        shuffle(originalArray);
        expect(projectsData.projects).not.toEqual(originalArray);
    });
});

describe("segment function", () => {
    it("should return an empty array if the input array has a length of 0", () => {
        expect(segment([], 1)).toEqual([]);
    });

    it("should return an empty array if the input array is undefined", () => {
        expect(segment(undefined, 1)).toEqual([]);
    });

    it("should return an empty array if the input width is undefined", () => {
        expect(segment(projectsData.projects, undefined)).toEqual([]);
    });

    it("should return an array of length 6 with a width of 1", () => {
        expect(segment(projectsData.projects, 1).length).toEqual(6);
    });

    it("should return an array of length 3 with a width of 2", () => {
        expect(segment(projectsData.projects, 2).length).toEqual(3);
    });

    it("should return an array of length 2 with a width of 3", () => {
        expect(segment(projectsData.projects, 3).length).toEqual(2);
    });

    it("should return an array of length 2 with a width of 4", () => {
        expect(segment(projectsData.projects, 4).length).toEqual(2);
    });
});

describe("filterUsersProjects function", () => {
    it("should not return anything if input array length is 0", () => {
        const userId = projectData.projects[0].user;
        expect(filterUsersProjects([], userId));
    });

    it("should return an empty array if userId doesn't match any objects", () => {
        const userId = "123456789";
        expect(filterUsersProjects(projectsData.projects, userId)).toEqual([]);
    });

    it("should return an array of all users projects if userId matches", () => {
        const userId = projectsData.projects[0].user;
        expect(filterUsersProjects(projectsData.projects, userId).length).toBe(
            3
        );
    });
});

describe("filterActive function", () => {
    it("should not return anything if input array length is 0", () => {
        expect(filterActive([]));
    });

    it("should return an empty array if no active projects are found", () => {
        expect(filterActive(publishedData.projects)).toEqual([]);
    });

    it("should return an array of all active projects", () => {
        expect(filterActive(activeData.projects).length).toBe(6);
    });
});

describe("filterPublished function", () => {
    it("should not return anything if input array length is 0", () => {
        expect(filterPublished([]));
    });

    it("should return an empty array if no published projects are found", () => {
        expect(filterPublished(activeData.projects)).toEqual([]);
    });

    it("should return an array of all published projects", () => {
        expect(filterPublished(publishedData.projects).length).toBe(6);
    });
});

describe("filterByCriteria function", () => {
    it("should return an empty array if input array length is 0", () => {
        expect(filterByCriteria([], "active", "sci-fi", "genres")).toEqual([]);
    });

    it("should return an array containing all active projects whose titles contain the search criteria 'test'", () => {
        expect(
            filterByCriteria(projectsData.projects, "active", "test", "title")
                .length
        ).toBe(3);
    });

    it("should return an array containing all active projects whose titles contain the search criteria 'TEST'", () => {
        expect(
            filterByCriteria(projectsData.projects, "active", "test", "title")
                .length
        ).toBe(3);
    });

    it("should return an array containing all published projects whose authors contain the search criteria 'name'", () => {
        expect(
            filterByCriteria(
                projectsData.projects,
                "published",
                "name",
                "author"
            ).length
        ).toBe(3);
    });

    it("should return an array containing all published projects whose genres contain the search criteria '3'", () => {
        expect(
            filterByCriteria(projectsData.projects, "published", "3", "genres")
                .length
        ).toBe(1);
    });
});
