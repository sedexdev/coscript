const httpMocks = require("node-mocks-http");
let {
    encryptMsg,
    decryptMsg,
    cryptr
} = require("../../middleware/store-message");

const mockEncrypt = jest.fn(encryptMsg);
const mockDecrypt = jest.fn(decryptMsg);

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = () => {};
});

describe("encryptMsg function", () => {
    it("should return a status of 400 if msgText is not set", () => {
        req.body = { msgText: null };
        mockEncrypt(req, res, next);
        expect(res.statusCode).toBe(400);
    });

    it("should return json error array if the msgText is not set", () => {
        const resJSON = {
            errors: ["Message should not be empty"]
        };
        req.body = { msgText: null };
        mockEncrypt.mockReturnValue = resJSON;
        mockEncrypt(req, res, next);
        expect(res._getJSONData()).toStrictEqual(resJSON);
    });

    it("should encrypt text and store it in req.body.msgText", () => {
        const msg = "Testing";
        req.body = { msgText: msg };
        mockEncrypt(req, res, next);
        expect(req.body.msgText).not.toEqual(msg);
    });
});

describe("decryptMsg function", () => {
    it("should return null if no arguments are passed", () => {
        expect(mockDecrypt()).toBe(null);
    });

    it("should return a decrypted version of its argument", () => {
        const msg = "Testing";
        const encryptedMsg = cryptr.encrypt(msg);
        expect(mockDecrypt(encryptedMsg)).toBe(msg);
    });
});
