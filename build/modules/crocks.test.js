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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Async_1 = __importDefault(require("crocks/Async"));
const mod = __importStar(require("./crocks"));
const bett3r_utils_1 = require("bett3r-utils");
const rambda_1 = require("rambda");
describe("crocks", function () {
    describe("fromPromise", function () {
        it("Converts a resolved promise to a resolved Async instance", (done) => {
            const p = Promise.resolve("hola");
            mod.promiseToAsync(p).fork(done, (str) => {
                chai_1.assert.equal(str, "hola");
                done();
            });
        });
        it("Converts a rejected promise to a rejected Async instance", (done) => {
            const p = Promise.reject("hola");
            mod.promiseToAsync(p).fork((str) => {
                chai_1.assert.equal(str, "hola");
                done();
            }, done);
        });
    });
    describe("ensureAsync", function () {
        it("returns the same async if param is async", () => {
            const x = Async_1.default.of("2");
            const y = mod.ensureAsync(x);
            chai_1.assert.equal(x, y);
        });
        it("returns an async if param is whatever type", done => {
            const asyncArray = [];
            const num = 345;
            const str = "345";
            const arr = [345];
            const obj = { n: 345 };
            const und = undefined;
            asyncArray.push(mod.ensureAsync(num));
            asyncArray.push(mod.ensureAsync(str));
            asyncArray.push(mod.ensureAsync(arr));
            asyncArray.push(mod.ensureAsync(obj));
            asyncArray.push(mod.ensureAsync(und));
            bett3r_utils_1.traverse(Async_1.default.of, rambda_1.identity, asyncArray)
                .fork(done, res => {
                chai_1.assert.deepEqual(res, [345, '345', [345], { n: 345 }, undefined]);
                done();
            });
        });
        it("returns an async if param is a promise", done => {
            const x = Promise.resolve("2");
            const y = mod.ensureAsync(x);
            y.fork(done, res => {
                chai_1.assert.equal(res, '2');
                done();
            });
        });
    });
});
//# sourceMappingURL=crocks.test.js.map