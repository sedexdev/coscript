const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectMongo = require("./model/database");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const uuid = require("uuid");
const config = require("config");
const mongoSessionPassword = config.get("database.mongoSessionPassword");
const sessionLife = config.get("session.sessionLife");
const sessionName = config.get("session.sessionName");
const sessionKey = config.get("session.sessionKey");

// Routes
const accountRoute = require("./routes/api/account");
const changePasswordRoute = require("./routes/api/changepassword");
const chatRoute = require("./routes/api/chat");
const emailRoute = require("./routes/api/email");
const FilesRoute = require("./routes/api/files");
const projectFolderRoute = require("./routes/api/folders");
const friendsRoute = require("./routes/api/friends");
const loginRoute = require("./routes/api/login");
const logoutRoute = require("./routes/api/logout");
const messageRoute = require("./routes/api/messages");
const profileRoute = require("./routes/api/profile");
const projectsRoute = require("./routes/api/projects");
const registerRoute = require("./routes/api/register");
const userRoute = require("./routes/api/user");

connectMongo();

/**
 * Creates a new instance of MongoDBStore which
 * will store all user sessions server-side. When
 * a new session is started, the data will be
 * pulled from the session documents associated with
 * the current user in order to ensure they are
 * authenticated to navigate the app
 * @param {Object} param0 - an anonymous object that represents
 *                          the model for sessions that are
 *                          stored in the database
 */
const mongoSessionURI = `mongodb://session-admin:${mongoSessionPassword}@localhost:27018/mongodb-session?authSource=admin`;
const mdbStore = new MongoDBStore({
    uri: mongoSessionURI,
    mongooseConnection: mongoose.connection,
    collection: "sessions",
    ttl: sessionLife / 1000,
});

// Session middleware
app.use(
    session({
        name: sessionName,
        genid: function () {
            return uuid.v4();
        },
        secret: sessionKey,
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: true,
            httpOnly: true,
            maxAge: sessionLife,
        },
        store: mdbStore,
    })
);

app.disable("x-powered-by");

// Init middleware - gives access to data in req in the route files
app.use(express.json({ extended: false }));

// Application API endpoints
app.use("/api/account", accountRoute());
app.use("/api/changepassword", changePasswordRoute());
app.use("/api/chat", chatRoute());
app.use("/api/email", emailRoute());
app.use("/api/files", FilesRoute());
app.use("/api/folders", projectFolderRoute());
app.use("/api/friends", friendsRoute());
app.use("/api/login", loginRoute());
app.use("/api/logout", logoutRoute());
app.use("/api/messages", messageRoute());
app.use("/api/profile", profileRoute());
app.use("/api/projects", projectsRoute());
app.use("/api/register", registerRoute());
app.use("/api/user", userRoute());

module.exports = app;
