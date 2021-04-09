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
exports.loadModulesFromDirectory = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function loadModulesFromDirectory(dirName, options) {
    const components = fs_1.default.readdirSync(dirName);
    const map = {};
    for (const component of components) {
        const componentName = path_1.default.parse(component).name;
        if (component === '.DS_Store' || (options.whiteList?.length && !options.whiteList?.includes(componentName)) || (options.blackList?.length && options.blackList?.includes(componentName)))
            return map;
        if (fs_1.default.statSync(`${dirName}/${component}`).isDirectory())
            map[componentName] = await loadModulesFromDirectory(`${dirName}/${component}`, options);
        else
            map[componentName] = options.onImport ? await options.onImport(await Promise.resolve().then(() => __importStar(require(`${dirName}/${component}`)))) : await Promise.resolve().then(() => __importStar(require(`${dirName}/${component}`)));
    }
    return map;
}
exports.loadModulesFromDirectory = loadModulesFromDirectory;
//# sourceMappingURL=modules.js.map