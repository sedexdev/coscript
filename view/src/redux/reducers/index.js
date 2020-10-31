import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import localForage from "localforage";

import alertpopup from "./alertpopup";
import auth from "./auth";
import documents from "./documents";
import chat from "./chat";
import files from "./files";

const persistConfig = {
    key: "root",
    storage: localForage,
    whitelist: ["auth", "documents", "chat", "files"],
};

const rootReducer = combineReducers({
    alertpopup,
    auth,
    documents,
    chat,
    files,
});

export default persistReducer(persistConfig, rootReducer);
