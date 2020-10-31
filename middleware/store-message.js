const Cryptr = require("cryptr");
const config = require("config");
const key = config.get("encryption.msgEncryptionKey");
const cryptr = new Cryptr(key);

/**
 * Encrypts user messages before they are
 * stored in the database
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware to be called
 */
const encryptMsg = (req, res, next) => {
    const { msgText } = req.body;

    if (!req.body.msgText) {
        return res
            .status(400)
            .json({ errors: ["Message should not be empty"] });
    }

    const encryptedMsg = cryptr.encrypt(msgText);
    req.body.msgText = encryptedMsg;
    next();
};

/**
 * Decrypts user messages from the database
 * so they can be sent back to the client to
 * be displayed in the user's profile
 *
 * @param {String} msgText - the text of the message
 */
const decryptMsg = (msgText) => {
    if (!msgText) {
        return null;
    }
    const decryptedMsg = cryptr.decrypt(msgText);
    return decryptedMsg;
};

module.exports = {
    encryptMsg,
    decryptMsg,
    cryptr,
};
