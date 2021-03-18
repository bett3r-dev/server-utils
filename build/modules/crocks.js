"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.ensureAsync = exports.promiseToAsync = void 0;
const fs_1 = __importDefault(require("fs"));
const Async_1 = __importDefault(require("crocks/Async"));
const promiseToAsync = (promise) => Async_1.default((reject, resolve) => promise.then(resolve, reject));
exports.promiseToAsync = promiseToAsync;
const ensureAsync = (possibleAsync) => possibleAsync?.type && possibleAsync.type() === 'Async' ? possibleAsync :
    ((!possibleAsync || !possibleAsync.then) ? Async_1.default.of(possibleAsync) : exports.promiseToAsync(possibleAsync));
exports.ensureAsync = ensureAsync;
exports.readFile = Async_1.default.fromNode(fs_1.default.readFile);
//# sourceMappingURL=crocks.js.map