"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("./modules");
const chai_1 = require("chai");
const path_1 = __importDefault(require("path"));
describe('modules', function () {
    describe('toCammelCase', function () {
        it('transforms strings to camel case', () => {
            chai_1.assert.equal(modules_1.toCamelCase('hola pana mio'), 'holaPanaMio');
            chai_1.assert.equal(modules_1.toCamelCase('hola panaMio'), 'holaPanaMio');
            chai_1.assert.equal(modules_1.toCamelCase('Hola_pana-mio'), 'holaPanaMio');
            chai_1.assert.equal(modules_1.toCamelCase('configuration-manager'), 'configurationManager');
            chai_1.assert.equal(modules_1.toCamelCase('logger-manager'), 'loggerManager');
            chai_1.assert.equal(modules_1.toCamelCase('component1'), 'component1');
        });
    });
    describe('loadModulesFromDirectory', function () {
        it('returns an object with the module name as key and the module', done => {
            const options = { recursive: true };
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
                whiteList: ['module2'],
            };
            modules_1.loadModulesFromDirectory(path_1.default.join(__dirname, '../fixtures/modulesFolderPlain'), options)
                .then(modules => {
                chai_1.assert.isFunction(modules.module2.function1);
                chai_1.assert.notExists(modules.module1);
                chai_1.assert.notExists(modules.subFolder);
                done();
            });
        });
        it('Backlist - returns an object with the module name as key and the module', done => {
            const options = {
                blackList: [/module3/],
                recursive: true
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
                blackList: [],
                recursive: true,
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
        it('formats the module name with a function passed in options', done => {
            const options = {
                blackList: [],
                recursive: true,
                onImport: (module) => module.create({ name: 'tomas' }),
                formatName: (name) => name.toUpperCase()
            };
            modules_1.loadModulesFromDirectory(path_1.default.join(__dirname, '../fixtures/modulesFolderFactory'), options)
                .then(modules => {
                chai_1.assert.isFunction(modules.MODULE1.function1);
                chai_1.assert.isFunction(modules.MODULE2.function1);
                chai_1.assert.isFunction(modules.SUBFOLDER.MODULE3.function1);
                done();
            });
        });
    });
});
//# sourceMappingURL=modules.test.js.map