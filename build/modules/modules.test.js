"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const modules_1 = require("./modules");
const path_1 = __importDefault(require("path"));
describe('modules', function () {
    describe('loadModulesFromDirectory', function () {
        it('returns an object with the module name as key and the module', done => {
            const options = {
                whiteList: [],
                blackList: [],
            };
            modules_1.loadModulesFromDirectory(path_1.default.join(__dirname, '../fixtures/modulesFolderPlain'), options)
                .then(modules => {
                chai_1.assert.isFunction(modules.module1.function1);
                chai_1.assert.isFunction(modules.module2.function1);
                chai_1.assert.isFunction(modules.subFolder.module3.function1);
                done();
            });
        });
        it('Whitelist - returns an object with the module name as key and the module', done => {
            const options = {
                whiteList: ['module1'],
                blackList: [],
            };
            modules_1.loadModulesFromDirectory(path_1.default.join(__dirname, '../fixtures/modulesFolderPlain'), options)
                .then(modules => {
                chai_1.assert.isFunction(modules.module1.function1);
                chai_1.assert.notExists(modules.module2);
                chai_1.assert.notExists(modules.subFolder);
                done();
            });
        });
        it('Backlist - returns an object with the module name as key and the module', done => {
            const options = {
                whiteList: [],
                blackList: ['module3'],
            };
            modules_1.loadModulesFromDirectory(path_1.default.join(__dirname, '../fixtures/modulesFolderPlain'), options)
                .then(modules => {
                chai_1.assert.isFunction(modules.module1.function1);
                chai_1.assert.isFunction(modules.module2.function1);
                chai_1.assert.notExists(modules.subFolder.module3);
                done();
            });
        });
        it('returns an object with the module name as key and the module applying a create function', done => {
            const options = {
                whiteList: [],
                blackList: [],
                onImport: (module) => module.create({ name: 'tomas' })
            };
            modules_1.loadModulesFromDirectory(path_1.default.join(__dirname, '../fixtures/modulesFolderFactory'), options)
                .then(modules => {
                chai_1.assert.isFunction(modules.module1.function1);
                chai_1.assert.isFunction(modules.module2.function1);
                chai_1.assert.isFunction(modules.subFolder.module3.function1);
                done();
            });
        });
    });
});
//# sourceMappingURL=modules.test.js.map