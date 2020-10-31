export const baseFolderView = (folders, userId) => {
    const adminFolders = [];
    if (!folders || !userId) return adminFolders;
    for (let folder of folders) {
        if (
            folder[0].label === "Master" ||
            folder[0].userBaseFolder ||
            folder[0].userId === userId
        ) {
            adminFolders.push(folder);
        }
    }
    return adminFolders;
};

export const userFolderView = (folders, userId) => {
    const userFolders = [];
    if (!folders || !userId) return userFolders;
    for (let folder of folders) {
        if (folder[0].label === "Master" || folder[0].userId === userId) {
            userFolders.push(folder);
        }
    }
    return userFolders;
};
