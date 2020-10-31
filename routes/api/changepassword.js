const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../../model/models/User");

const setSessionData = require("../../utils/session-data");

module.exports = () => {
    /**
     * @route           POST /api/changepassword
     * @description     Change users password
     * @access          Private
     */
    router.post(
        "/",
        check("password", "Password must be 8 or more characters").isLength({
            min: 8,
        }),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            try {
                const session = req.session;
                if (session) {
                    const { password } = req.body;
                    const user = await User.findOne({
                        _id: session.user.userId,
                    });
                    const salt = await bcrypt.genSalt(10);
                    const encryptedPW = await bcrypt.hash(password, salt);
                    user.password = encryptedPW;
                    user.passwordHistory.push({
                        salt: salt,
                        password: encryptedPW,
                    });
                    await user.save();

                    session.user = setSessionData(user);
                    session.user["passwordUpdated"] = true;
                    res.json(session.user);
                } else {
                    res.status(400).json("Bad request...");
                }
            } catch (err) {
                res.status(500).send("Server error...");
            }
        }
    );

    /**
     * @route           POST /api/changepassword/check
     * @description     Check if the user has already used this password
     * @access          Private
     */
    router.post("/check", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const { user, password } = req.body;
                const foundUser = await User.findOne({ _id: user.userId });

                let searched = 0;

                for (passwordObj of foundUser.passwordHistory) {
                    searched++;
                    const newPassword = await bcrypt.hash(
                        password,
                        passwordObj.salt
                    );
                    if (newPassword === passwordObj.password) {
                        return res.json({ clash: true });
                    }
                }
                if (searched === foundUser.passwordHistory.length) {
                    return res.json({ clash: false });
                }
            } else {
                res.status(400).json("Bad request...");
            }
        } catch (err) {
            res.status(500).send("Server error...");
        }
    });

    /**
     * @route           POST /api/changepassword/check/current
     * @description     Verify the user's current password before password change
     * @access          Private
     */
    router.post("/check/current", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const { user, password } = req.body;
                const foundUser = await User.findOne({ _id: user.userId });

                const history = foundUser.passwordHistory;

                const usersPassword = history[history.length - 1];
                const hashedPW = await bcrypt.hash(
                    password,
                    usersPassword.salt
                );
                if (hashedPW === foundUser.password) {
                    return res.json({ correct: true });
                } else {
                    return res.json({ correct: false });
                }
            } else {
                res.status(400).json("Bad request...");
            }
        } catch (err) {
            res.status(500).send("Server error...");
        }
    });

    return router;
};
