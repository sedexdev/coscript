const express = require("express");
const router = express.Router();
const config = require("config");
const sessionName = config.get("session.sessionName");

const User = require("../../model/models/User");

module.exports = () => {
    /**
     * @route          DELETE /api/logout
     * @description    Deletes the users session from the database
     * @access         Private
     */
    router.delete("/", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const user = await User.findById({ _id: session.user.userId });
                user.isLoggedIn = false;
                await user.save();

                session.destroy((err) => {
                    if (err) {
                        return res.json("There was an error...");
                    }
                    res.clearCookie(sessionName);
                    return res.json("Logged out");
                });
            } else {
                res.status(401).json("Bad request...");
            }
        } catch (err) {
            res.status(500).json("Server error...");
        }
    });

    return router;
};
