"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.promiseToAsync = void 0;
const fs_1 = __importDefault(require("fs"));
const Async_1 = __importDefault(require("crocks/Async"));
const promiseToAsync = (promise) => Async_1.default((reject, resolve) => promise.then(resolve, reject));
exports.promiseToAsync = promiseToAsync;
exports.readFile = Async_1.default.fromNode(fs_1.default.readFile);
//# sourceMappingURL=crocks.js.map