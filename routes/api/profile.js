const express = require("express");
const router = express.Router();

const User = require("../../model/models/User");

const setSessionData = require("../../utils/session-data");

module.exports = () => {
    /**
     * @route           POST api/profile
     * @description     Update user profile
     * @access          Private
     */
    router.post("/", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const {
                    buttonID,
                    about,
                    authors,
                    books,
                    displayName,
                } = req.body.profile;

                const profileObj = {};

                if (buttonID) profileObj.buttonID = buttonID;
                if (about) profileObj.about = about;
                if (authors && authors.length > 0) {
                    if (authors.constructor === String) {
                        profileObj.authors = authors
                            .split(",")
                            .map((author) => author.trim());
                    }
                    if (authors.constructor === Array) {
                        let authorsString = "";
                        authors.forEach(
                            (item, i) =>
                                (authorsString +=
                                    item +
                                    (i !== authors.length - 1 ? "," : ""))
                        );
                        profileObj.authors = authorsString
                            .split(",")
                            .map((author) => author.trim());
                    }
                } else {
                    profileObj.authors = [];
                }
                if (books && books.length > 0) {
                    if (books.constructor === String) {
                        profileObj.books = books
                            .split(",")
                            .map((book) => book.trim());
                    }
                    if (books.constructor === Array) {
                        let bookString = "";
                        books.forEach(
                            (item, i) =>
                                (bookString +=
                                    item + (i !== books.length - 1 ? "," : ""))
                        );
                        profileObj.books = bookString
                            .split(",")
                            .map((book) => book.trim());
                    }
                } else {
                    profileObj.books = [];
                }
                if (displayName) profileObj.displayName = displayName;

                const user = await User.findOneAndUpdate(
                    { _id: session.user.userId },
                    {
                        $set: {
                            profile: {
                                ...session.user.profile,
                                buttonID: profileObj.buttonID,
                                about: profileObj.about,
                                books: profileObj.books,
                                authors: profileObj.authors,
                                displayName: profileObj.displayName,
                            },
                        },
                    },
                    { new: true }
                );
                await user.save();
                session.user = setSessionData(user);
                res.json(session.user);
            } else {
                res.status(400).json("Bad request...");
            }
        } catch (err) {
            res.status(500).send("Server error...");
        }
    });

    /**
     * @route        GET /api/profile/:id
     * @description  Get a users profile based on id
     * @access       Public
     */
    router.get("/:id", async (req, res) => {
        try {
            const { id } = req.params;

            const user = await User.findById({ _id: id });

            if (!user) {
                return res.status(400).json("Bad request...");
            }

            const profile = {
                id: user._id,
                avatar: user.avatar,
                name: user.profile.displayName,
                url: `/user/${user._id}`,
                about: user.profile.about,
                authors: user.profile.authors,
                books: user.profile.books,
                projects: user.profile.userProjects,
            };

            return res.json(profile);
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    return router;
};
