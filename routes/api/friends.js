const express = require("express");
const router = express.Router();

const User = require("../../model/models/User");
const Document = require("../../model/models/Document");

const setSessionData = require("../../utils/session-data");

module.exports = () => {
    /**
     * @route           PUT /api/friends/add
     * @description     Add another user as a friend
     * @access          Private
     */
    router.put("/add", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const { userId, friendId } = req.body;

                const user = await User.findById({ _id: userId });

                if (!user.profile.friends.includes(friendId)) {
                    user.profile.friends.push(friendId);
                } else {
                    return res.status(400).json({
                        errors: ["You and this user are already friends"],
                    });
                }

                await user.save();

                const friend = await User.findById({
                    _id: friendId,
                });

                if (!friend.profile.friends.includes(userId)) {
                    friend.profile.friends.push(userId);
                } else {
                    return res.status(400).json({
                        errors: ["You and this user are already friends"],
                    });
                }

                await friend.save();

                session.user = setSessionData(user);
                return res.json(session.user);
            } else {
                return res.status(401).json("Unauthorised...");
            }
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    /**
     * @route        PUT /api/friends/block
     * @description  Block a user from being able to send messages/requests
     *               to the user the does the blocking
     * @access       Private
     */
    router.put("/block", async (req, res) => {
        try {
            const session = req.session;
            if (session) {
                const { friendId } = req.body;

                if (session.user.userId === friendId) {
                    return res.status(400).json({
                        errors: ["You cannot block yourself"],
                    });
                }

                let user = await User.findById({ _id: session.user.userId });

                user.profile.blockedUsers.push(friendId);

                user = await User.findOneAndUpdate(
                    { _id: session.user.userId },
                    {
                        $set: {
                            profile: {
                                ...user.profile,
                                blockedUsers: user.profile.blockedUsers,
                            },
                        },
                    },
                    { new: true }
                );

                await user.save();
                return res.json(session.user);
            } else {
                return res.status(401).json("Unauthorised...");
            }
        } catch (err) {
            return res.status(500).json("Server error...");
        }
    });

    return router;
};
