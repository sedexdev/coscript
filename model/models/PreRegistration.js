const mongoose = require("mongoose");

const PreRegistrationSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    password: {
        type: String
    },
    token: {
        type: String
    }
});

module.exports = PreRegistration = mongoose.model(
    "preReg",
    PreRegistrationSchema
);
