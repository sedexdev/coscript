const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../../model/models/User");

const setSessionData = require("../../utils/session-data");

module.exports = () => {
    /**
     * @route          POST /api/login
     * @description    Login a currently registered user
     * @access         PUBLIC
     */
    router.post(
        "/",
        [
            check("username", "Username is required").not().isEmpty().trim(),
            check("password", "Password is required").exists(),
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username, password } = req.body;

            try {
                const user = await User.findOne({ username });

                if (!user) {
                    return res.status(400).json({
                        errors: [{ msg: "Invalid credentials" }],
                    });
                }

                const passwordMatch = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!passwordMatch) {
                    return res.status(400).json({
                        errors: [{ msg: "Invalid credentials" }],
                    });
                }

                user.isLoggedIn = true;
                await user.save();

                const sessionUser = setSessionData(user);
                req.session.user = sessionUser;
                res.json(sessionUser);
            } catch (err) {
                return res.status(500).send("Server error...");
            }
        }
    );
    return router;
};
