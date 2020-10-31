const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");

const User = require("../../model/models/User");

const setSessionData = require("../../utils/session-data");

module.exports = () => {
    /**
     * @route          POST /api/account
     * @description    Update users email address
     * @access         Private
     */
    router.post(
        "/",
        [check("email", "Please enter a valid email").trim().isEmail()],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                });
            }

            try {
                const session = req.session;
                if (session) {
                    const { email } = req.body;

                    let user = await User.findOne({ email });

                    if (user) {
                        return res.status(400).json({
                            errors: [
                                { msg: "Please choose another email address" },
                            ],
                        });
                    }

                    user = await User.findOneAndUpdate(
                        { _id: session.user.userId },
                        {
                            $set: {
                                user,
                                email: email,
                                avatar: gravatar.url(email, {
                                    s: "200",
                                    r: "pg",
                                    d: "mm",
                                }),
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
                res.status(500).json("Server error...");
            }
        }
    );

    /**
     * @route           DELETE /api/account
     * @description     Delete user and profile
     * @access          Private
     */
    router.delete("/", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                await User.findOneAndRemove({ _id: session.user.userId });
                await PreRegistration.findOneAndRemove({
                    email: req.body.email,
                });
                session.destroy((err) => {
                    if (err) {
                        return res.json("There was an error...");
                    }
                    res.clearCookie(config.get("sessionName"));
                    return res.json("Account deleted");
                });
            } else {
                return res.status(400).json("Bad request...");
            }
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    return router;
};
