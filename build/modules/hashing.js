"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomBytes = exports.md5Encode = exports.base64Decode = exports.base64Encode = void 0;
const crypto_1 = __importDefault(require("crypto"));
const base64Encode = (str) => Buffer.from(str).toString('base64');
exports.base64Encode = base64Encode;
const base64Decode = (str) => Buffer.from(str, 'base64').toString();
exports.base64Decode = base64Decode;
const md5Encode = (str) => crypto_1.default.createHash('md5').update(str).digest('hex');
exports.md5Encode = md5Encode;
const getRandomBytes = (length) => crypto_1.default.randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
exports.getRandomBytes = getRandomBytes;
//# sourceMappingURL=hashing.js.map