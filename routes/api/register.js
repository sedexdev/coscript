const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const config = require("config");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const PreRegistration = require("../../model/models/PreRegistration");
const User = require("../../model/models/User");

module.exports = () => {
    /**
     * @route          POST /api/register/pre-register
     * @description    Store a users email for pre-registration verification
     * @access         PUBLIC
     */
    router.post(
        "/pre-register",
        [
            check("email", "Please enter a valid email address")
                .trim()
                .isEmail(),
            check("name", "Please provide your name").not().isEmpty().trim(),
            check("username", "Please enter a valid username")
                .not()
                .isEmpty()
                .trim(),
            check("password", "Password must be 8 or more characters").isLength(
                {
                    min: 8,
                }
            ),
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                });
            }

            let { email, name, username, password } = req.body;

            try {
                let user = await PreRegistration.findOne({ email });

                if (user) {
                    return res.status(400).json({
                        errors: [{ msg: "Please choose another email" }],
                    });
                }

                let preRegUserName = await PreRegistration.findOne({
                    username,
                });

                if (preRegUserName) {
                    return res.status(400).json({
                        errors: [{ msg: "Please choose a different username" }],
                    });
                }

                const tokenId = {
                    token: {
                        id: uuid.v4(),
                    },
                };

                let regToken = jwt.sign(tokenId, config.get("tokens.jwtCode"), {
                    expiresIn: "36000",
                });

                const tokenSalt = await bcrypt.genSalt(10);
                const pwSalt = await bcrypt.genSalt(10);

                regToken = await bcrypt.hash(regToken, tokenSalt);
                password = await bcrypt.hash(password, pwSalt);

                user = new PreRegistration({
                    email,
                    name,
                    username,
                    salt: pwSalt,
                    password,
                    token: regToken,
                });

                await user.save();

                return res.json(regToken);
            } catch (err) {
                return res.status(500).send("Server error...");
            }
        }
    );

    /**
     * @route          POST /api/register
     * @description    Register a new user
     * @access         PUBLIC
     */
    router.post("/", async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        try {
            const { token } = req.body;

            const registeredUser = await PreRegistration.findOne({ token });

            if (!registeredUser) {
                return res.status(401).json("Unauthorised...");
            }

            const avatar = gravatar.url(registeredUser.email, {
                s: "200",
                r: "pg",
                d: "mm",
            });

            let user = new User({
                avatar,
                email: registeredUser.email,
                name: registeredUser.name,
                username: registeredUser.username,
                password: registeredUser.password,
                profile: {
                    displayName: registeredUser.username,
                },
                isRegistered: true,
            });

            user.passwordHistory.push({
                salt: registeredUser.salt,
                password: registeredUser.password,
            });

            await user.save();

            registeredUser.salt = null;
            registeredUser.password = null;
            registeredUser.token = null;

            await registeredUser.save();

            user = await User.findOne({ email: user.email }).select(
                "-password -passwordHistory"
            );

            return res.json(user);
        } catch (err) {
            return res.status(500).send("Server error...");
        }
    });

    return router;
};
