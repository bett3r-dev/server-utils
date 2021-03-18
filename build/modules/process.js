"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execShellCommand = void 0;
const Async_1 = __importDefault(require("crocks/Async"));
const child_process_1 = require("child_process");
/*istanbul ignore next*/
function execShellCommand(cmd, cwd = __dirname) {
    return Async_1.default((reject, resolve) => {
        child_process_1.exec(cmd, { cwd }, (error, stdout, stderr) => {
            if (error)
                return reject(error);
            resolve(stderr || stdout);
        });
    });
}
exports.execShellCommand = execShellCommand;
//# sourceMappingURL=process.js.map