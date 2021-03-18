"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mod = __importStar(require("./hashing"));
describe('hashing', function () {
    describe('base64Encode', function () {
        it('Encodes a string in base64', () => {
            chai_1.assert.equal(mod.base64Encode('tomas'), 'dG9tYXM=');
        });
    });
    describe('base64Decode', function () {
        it('Decodes a string in base64', () => {
            chai_1.assert.equal(mod.base64Decode('dG9tYXM='), 'tomas');
        });
    });
    describe('md5Encode', function () {
        it('Encodes a string in MD5', () => {
            chai_1.assert.equal(mod.md5Encode('tomas'), '4b506c2968184be185f6282f5dcac238');
        });
    });
    describe('getRandomBytes', function () {
        it('Generates random hex bytes of specified length', () => {
            chai_1.assert.match(mod.getRandomBytes(8), /^[ABCDEF0123456789]{8}$/mig);
            chai_1.assert.match(mod.getRandomBytes(4), /^[ABCDEF0123456789]{4}$/mig);
            chai_1.assert.match(mod.getRandomBytes(6), /^[ABCDEF0123456789]{6}$/mig);
        });
    });
});
//# sourceMappingURL=hashing.test.js.map