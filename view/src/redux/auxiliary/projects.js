/**
 * Shuffles an array of projects randomly, in
 * place, to be displayed in the index page
 * carousel menu
 *
 * @param {Array} array - an array of projects
 */
export const shuffle = (array) => {
    if (array.length > 2) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
};

/**
 * Breaks up a larger array of projects into a 2D
 * matrix of project array, each of length <width>.
 * Any remaining projects that equate to less than
 * <width> are added at the end of the 2D matrix
 *
 * @param {Array} array  - an array of projects
 * @param {Number} width - number of projects to show
 */
export const segment = (array, width) => {
    const segmentedArray = [];
    if (!array || !width) return segmentedArray;
    let tempArray = [];
    for (let i = 0; i < array.length; i++) {
        tempArray.push(array[i]);
        if (tempArray.length === width) {
            segmentedArray.push(tempArray);
            tempArray = [];
        }
    }
    if (tempArray.length > 0) segmentedArray.push(tempArray);
    return segmentedArray;
};

/**
 * Filters out projects belonging to this user from
 * an array of all projects
 *
 * @param {Array} array   - an array of projects
 * @param {String} userId - id of logged-in user
 */
export const filterUsersProjects = (array, userId) => {
    if (array.length > 0) {
        return array.filter((el) => el.user === userId, []);
    }
};

/**
 * Filters out all active projects from an array
 * of projects
 *
 * @param {Array} array - an array of projects
 */
export const filterActive = (array) => {
    if (array.length > 0) {
        return array.filter((el) => !el.published, []);
    }
};

/**
 * Filters out all published projects from an array
 * of projects
 *
 * @param {Array} array - an array of projects
 */
export const filterPublished = (array) => {
    if (array.length > 0) {
        return array.filter((el) => el.published, []);
    }
};

/**
 * Loops over an array of projects to find any projects whose
 * subjects (author, title, genres) contain a matching sub-
 * string to the <searchCriteria>. Returns an array of projects
 * or an empty array if none were matched
 *
 * @param {Array} array           - an array of projects
 * @param {String} status         - the project's published status
 * @param {String} searchCriteria - the search term
 * @param {String} subject        - the field to search in
 */
export const filterByCriteria = (array, status, searchCriteria, subject) => {
    const cleanedSearch = searchCriteria.toLowerCase();
    const results = [];
    for (let project of array) {
        const condition =
            status === "active" ? !project.published : project.published;
        if (
            project[subject].toLowerCase().includes(cleanedSearch) &&
            condition
        ) {
            results.push(project);
        }
    }
    return results;
};
