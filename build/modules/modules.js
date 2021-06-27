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
exports.loadModulesFromDirectory = exports.filterFilename = exports.toCamelCase = void 0;
const rambda_1 = require("rambda");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const simple_transducers_1 = __importDefault(require("simple-transducers"));
function toCamelCase(str) {
    return simple_transducers_1.default.seq(rambda_1.compose(simple_transducers_1.default.filter(part => !!part), simple_transducers_1.default.map((part, index) => (index === 0 ? part[0].toLowerCase() : part[0].toUpperCase()) + part.slice(1)), simple_transducers_1.default.reduce((acc, curr) => acc + curr, '')), str.split(/[_\s\-]/));
}
exports.toCamelCase = toCamelCase;
function filterFilename(filename, module, { whiteList, blackList }) {
    if (filename === '.DS_Store' || (whiteList?.length && !whiteList?.some(match => !match.test ? match === module : match.test(module))) || (blackList?.length && blackList?.some(match => !match.test ? match === module : match.test(module))))
        return true;
}
exports.filterFilename = filterFilename;
async function loadModulesFromDirectory(dirName, options = {}) {
    const components = fs_1.default.readdirSync(dirName);
    const modulesMap = {};
    for (let filename of components) {
        const module = path_1.default.parse(filename).name;
        const componentName = options.formatName ? options.formatName(module) : module;
        if (options.recursive && fs_1.default.statSync(`${dirName}/${filename}`).isDirectory())
            Object.assign(modulesMap, await loadModulesFromDirectory(`${dirName}/${filename}`, options));
        else if (filterFilename(filename, module, options))
            continue;
        else
            modulesMap[componentName] = options.onImport ? await options.onImport(await Promise.resolve().then(() => __importStar(require(`${dirName}/${filename}`)))) : await Promise.resolve().then(() => __importStar(require(`${dirName}/${filename}`)));
    }
    return modulesMap;
}
exports.loadModulesFromDirectory = loadModulesFromDirectory;
//# sourceMappingURL=modules.js.map