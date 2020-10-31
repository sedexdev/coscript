import configureMockStore from "redux-mock-store";
import moxios from "moxios";
import thunk from "redux-thunk";
import uuid from "uuid";
import {
    CREATE_SUCCESS,
    CREATE_FAILED,
    PROJECT_LOADED,
    LOAD_FAILED,
    PROJECT_ARRAY_LOADED,
    PROJECT_ARRAY_FAILED,
    COLLABORATORS_ARRAY_LOADED,
    COLLABORATORS_ARRAY_FAILED,
    USER_COLLABORATIONS_LOADED,
    USER_COLLABORATIONS_FAILED,
    SAVE_DRAFT,
    USER_ADDED,
    ADD_USER_FAILED,
    SAVE_FAILED,
    SHOW_ALERT,
} from "../../actions/event-types";

import {
    createNewProject,
    getMostRecentProject,
    loadProject,
    loadAllProjects,
    saveDraft,
    updateProjectDetails,
    saveDate,
    publishProject,
    addCollaborator,
    sendCollaborateMsg,
    getProjectCollaborators,
    getUserCollaborations,
    clearProjectData,
} from "../../actions/documents";

const user = require("./data/auth/user.json");
const projectDetails = require("./data/documents/project.json");
const projectArray = require("./data/documents/projectArray.json");
const collaboratorsArray = require("./data/documents/collaboratorsArray.json");

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("createNewProject action", () => {
    let projectData;
    beforeEach(() => {
        projectData = {
            title: "Test Title",
            genres: "Test genres",
            description: "Test description",
            image: "Test image",
        };
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires CREATE_SUCCESS action type if project creation is successful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: projectDetails,
            });
        });

        const expectedActions = [
            { type: CREATE_SUCCESS, payload: projectDetails },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(createNewProject(projectData));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires CREATE_FAILED action type if project creation fails", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const expectedActions = [{ type: CREATE_FAILED }];

        const store = mockStore();

        await store.dispatch(createNewProject(projectData));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("getMostRecentProject action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires PROJECT_LOADED action type if most recent project load is successful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: projectDetails,
            });
        });

        const expectedActions = [
            { type: PROJECT_LOADED, payload: projectDetails },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(getMostRecentProject());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires LOAD_FAILED action type if most recent project load fails", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const expectedActions = [{ type: LOAD_FAILED }];

        const store = mockStore();

        await store.dispatch(getMostRecentProject());
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("loadProject action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires PROJECT_LOADED action type if project load is successful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: projectDetails,
            });
        });

        const expectedActions = [
            { type: PROJECT_LOADED, payload: projectDetails },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(loadProject());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires LOAD_FAILED action type if project load fails", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const expectedActions = [{ type: LOAD_FAILED }];

        const store = mockStore();

        await store.dispatch(loadProject());
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("loadAllProjects action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires PROJECT_ARRAY_LOADED action type if project array load is successful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: projectArray,
            });
        });

        const expectedActions = [
            { type: PROJECT_ARRAY_LOADED, payload: projectArray },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(loadAllProjects());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires PROJECT_ARRAY_FAILED action type if project array load fails", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const expectedActions = [{ type: PROJECT_ARRAY_FAILED }];

        const store = mockStore();

        await store.dispatch(loadAllProjects());
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("saveDraft action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires SAVE_DRAFT action type if project save is successful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: projectArray,
            });
        });

        const expectedActions = [{ type: SAVE_DRAFT, payload: projectArray }];

        const store = mockStore({ payload: {} });

        await store.dispatch(saveDraft("Test content", projectDetails));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires SAVE_FAILED action type if project save fails", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const expectedActions = [{ type: SAVE_FAILED }];

        const store = mockStore();

        await store.dispatch(saveDraft(null));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("updateProjectDetails action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires SAVE_DRAFT action type if project details update is successful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: projectDetails,
            });
        });

        const expectedActions = [
            {
                type: SAVE_DRAFT,
                payload: projectDetails,
            },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(updateProjectDetails(projectDetails));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires SAVE_FAILED action type if project details update fails", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const expectedActions = [{ type: SAVE_FAILED }];

        const store = mockStore();

        await store.dispatch(updateProjectDetails(null));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("saveDate action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires SAVE_DRAFT action type if date save is successful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: projectDetails,
            });
        });

        const expectedActions = [
            {
                type: SAVE_DRAFT,
                payload: projectDetails,
            },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(saveDate());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires SAVE_FAILED action type if date save fails", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const expectedActions = [{ type: SAVE_FAILED }];

        const store = mockStore();

        await store.dispatch(saveDate(null));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("publishProject action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires SAVE_DRAFT action type if project publish is successful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: projectDetails,
            });
        });

        const expectedActions = [
            {
                type: SAVE_DRAFT,
                payload: projectDetails,
            },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(publishProject());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires SAVE_FAILED action type if project publish fails", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const expectedActions = [{ type: SAVE_FAILED }];

        const store = mockStore();

        await store.dispatch(publishProject(null));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

// Bastard goes here
describe("addCollaborator action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires USER_ADDED action type is user was successfully added to a project", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: user,
            });
        });

        const expectedActions = [
            {
                type: USER_ADDED,
                payload: user,
            },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(addCollaborator());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires ADD_USER_FAILED action type is user was successfully added to a project", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: {
                    errors: ["You are a project member by default"],
                },
            });
        });

        const id = uuid.v4();

        const expectedActions = [
            {
                type: SHOW_ALERT,
                payload: {
                    alertType: "danger",
                    id: id,
                    msg: "You are a project member by default",
                },
            },
            { type: ADD_USER_FAILED },
        ];

        const store = mockStore();

        await store.dispatch(addCollaborator());
        store.getActions()[0].payload.id = id;
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("getProjectCollaborators action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires COLLABORATORS_ARRAY_LOADED action type if loading the project collaborators is successful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: collaboratorsArray,
            });
        });

        const expectedActions = [
            {
                type: COLLABORATORS_ARRAY_LOADED,
                payload: collaboratorsArray,
            },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(getProjectCollaborators());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires COLLABORATORS_ARRAY_FAILED action type if loading the project collaborators fails", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const expectedActions = [{ type: COLLABORATORS_ARRAY_FAILED }];

        const store = mockStore();

        await store.dispatch(getProjectCollaborators(null));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("getUserCollaborations action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires USER_COLLABORATIONS_LOADED action type if loading the users collaborations is successful", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: projectArray,
            });
        });

        const expectedActions = [
            {
                type: USER_COLLABORATIONS_LOADED,
                payload: projectArray,
            },
        ];

        const store = mockStore({ payload: {} });

        await store.dispatch(getUserCollaborations());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it("fires USER_COLLABORATIONS_FAILED action type if loading the users collaborations fails", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: null,
            });
        });

        const expectedActions = [{ type: USER_COLLABORATIONS_FAILED }];

        const store = mockStore();

        await store.dispatch(getUserCollaborations(null));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe("clearProjectData action", () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("fires LOAD_FAILED action type", async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: null,
            });
        });

        const expectedActions = [{ type: LOAD_FAILED }];

        const store = mockStore();

        await store.dispatch(clearProjectData(null));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
