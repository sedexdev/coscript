import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

/**
 * Gets all folders that are associated with
 * this project
 *
 * @param {String} projectId - id of the project
 */
export const getAllProjectFolders = async (projectId) => {
    try {
        const res = await axios.get(`/api/folders/${projectId}`);
        return res.data;
    } catch (err) {
        return [];
    }
};

/**
 * Creates a new instance of ProjectFolder in
 * the database and associates it with this
 * project
 *
 * @param {String} projectId - id of the project
 * @param {String} label     - name of the folder
 */
export const createNewFolder = async (projectId, label) => {
    try {
        const body = JSON.stringify({ projectId, label });
        const res = await axios.post("/api/folders/add", body, config);
        return res.data;
    } catch (err) {
        return false;
    }
};

/**
 * Creates a new instance of File in the
 * database and associates it with this project
 *
 * @param {String} folderId  - id of the parent folder
 * @param {String} label     - name of the file
 */
export const createNewFile = async (folderId, label) => {
    try {
        const body = JSON.stringify({ label });
        const res = await axios.post(
            `/api/files/add/${folderId}`,
            body,
            config
        );
        return res.data;
    } catch (err) {
        return false;
    }
};
