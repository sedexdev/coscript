const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const host = config.get("email.host");
const port = config.get("email.port");
const userEmail = config.get("email.auth.user");
const password = config.get("email.auth.pass");

const User = require("../../model/models/User");

module.exports = () => {
    /**
     * @route          POST /api/email/verify
     * @description    Verify that the user is authentic
     * @access         Public
     */
    router.post("/verify", (req, res) => {
        const session = req.session;
        const match =
            Number(req.body.originalCode) === Number(req.body.confirmCode);
        if (req.body.registering) {
            if (match) {
                return res.json({ success: true });
            } else {
                return res.json({ success: false });
            }
        } else if (session) {
            if (match) {
                if (!req.body.forgottenDetails) {
                    const userData = {
                        user: {
                            id: session.user.userId,
                        },
                    };
                    const authToken = jwt.sign(
                        userData,
                        config.get("tokens.jwtCode2"),
                        {
                            expiresIn: "3600",
                        }
                    );
                    session.user["authToken"] = authToken;
                }
                return res.json({ success: true });
            } else {
                return res.json({ success: false });
            }
        } else {
            return res.status(401).json("Unauthorised...");
        }
    });

    /**
     * @route          POST /api/email/send
     * @description    Send an email to a new user with an account verification code
     * @access         PUBLIC
     */
    router.post("/send", (req, res) => {
        const { email, subject, source } = req.body;

        const code = Math.floor(Math.random() * 1000000) + 13417;

        let html;
        switch (source) {
            case "registration":
                html = `Thanks for signing up! <br /> Here is your verification code <br /> ${code}`;
                break;
            case "reset":
                html = `You have told us that you have forgotten your login details.<br />Please enter this code to get back into your account:<br />${code}<br /><br />When you enter this code we will send you an email containing a username reminder and a temporary password you can log back in with.<br />Please change this password right after you are able to access your account.<br /><br />If you did not make this request please contact us immediately via admin@coscript.co.uk`;
                break;
            default:
                html = "";
        }

        const smtpClient = nodemailer.createTransport({
            host: host,
            port: port,
            secure: false,
            requireTLS: true,
            tls: {
                rejectUnauthorized: false,
            },
            auth: { user: userEmail, pass: password },
        });

        const emailData = {
            from: userEmail,
            to: email,
            subject: subject,
            html: html,
        };

        smtpClient.sendMail(emailData, (error) => {
            if (error) {
                console.log(error);
            }
            return res.json({ originalCode: code });
        });
    });

    /**
     * @route          POST /api/email/send/reset
     * @description    Send temporary login details to a user who
     *                 who has forgotten their credentials
     * @access         Public
     */
    router.post("/send/reset", async (req, res) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json("Bad request...");
            }

            const randomPassword =
                Math.random().toString(36).slice(2) +
                Math.random().toString(36).slice(2);

            const salt = await bcrypt.genSalt(10);
            const encryptedPW = await bcrypt.hash(randomPassword, salt);

            user.password = encryptedPW;
            user.passwordHistory.push({
                salt: salt,
                password: encryptedPW,
            });

            await user.save();

            const smtpClient = nodemailer.createTransport({
                host: host,
                port: port,
                secure: false,
                requireTLS: true,
                tls: {
                    rejectUnauthorized: false,
                },
                auth: {
                    user: userEmail,
                    pass: password,
                },
            });

            const emailData = {
                from: userEmail,
                to: req.body.email,
                subject: "CoScript - Get back into your account",
                html: `You are receiving this email because you told us you have forgotten your details.<br /> Your username is: <br /> <b>${user.username}</b> <br /><br />Use this password <b>${randomPassword}</b> to recover your account.  Please change this password as soon as you have gained access to your account again.<br /><br />If you did not make this request please contact us immediately at admin@coscript.co.uk`,
            };

            smtpClient.sendMail(emailData, (error, response) => {
                if (error) {
                    res.end(
                        "There was an error when sending the email: " +
                            response.message
                    );
                    return res.json({ success: true });
                } else {
                    return res.json({ success: false });
                }
            });
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    /**
     * @route          POST /api/email/send/changepw
     * @description    Send an email to a user with a password change verification code
     * @access         Private
     */
    router.post("/send/changepw", (req, res) => {
        const session = req.session;
        if (session) {
            const smtpClient = nodemailer.createTransport({
                host: host,
                port: port,
                secure: false,
                requireTLS: true,
                tls: {
                    rejectUnauthorized: false,
                },
                auth: {
                    user: userEmail,
                    pass: password,
                },
            });

            const code = Math.floor(Math.random() * 1000000) + 13417;

            const emailData = {
                from: userEmail,
                to: req.body.email,
                subject: "CoScript - Request for password change",
                html: `You are receiving this email because you requested to change your password <br /> Here is your confirmation code <br /> ${code} <br /><br /> If you did not make this request please contact us at admin@coscript.co.uk`,
            };

            smtpClient.sendMail(emailData, (error, response) => {
                if (error) {
                    res.end(
                        "There was an error when sending the email: " +
                            response.message
                    );
                }
                return res.json({ originalCode: code });
            });
        } else {
            res.status(400).json("Bad request...");
        }
    });

    return router;
};
