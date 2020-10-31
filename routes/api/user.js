const express = require("express");
const router = express.Router();

module.exports = () => {
    /**
     * @route           GET api/user
     * @description     Get the current users session data
     * @access          Pubic
     */
    router.get("/", (req, res) => {
        const session = req.session;
        if (session && session.user) {
            session.user["passwordUpdated"] = false;
            return res.json(session.user);
        }
        res.status(401).json("Bad request...");
    });

    return router;
};
