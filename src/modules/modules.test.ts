import { assert } from 'chai';
import {ComponentModule, loadModulesFromDirectory} from './modules';
import path from 'path';

describe( 'modules', function() {
  describe.only( 'loadModulesFromDirectory', function() {
    it( 'returns an object with the module name as key and the module', done => {
      const options = {recursive:true}
      loadModulesFromDirectory(path.join(__dirname, '../fixtures/modulesFolderPlain'), options)
        .then(modules => {
          assert.isFunction(modules.module1.function1);
          assert.isFunction(modules.module2.function1);
          assert.isFunction(modules.subFolder.module3.function1);
          done();
        })
    } );
    it( 'Whitelist - returns an object with the module name as key and the module', done => {
      const options = {
        whiteList:['module1'],
      }
      loadModulesFromDirectory(path.join(__dirname, '../fixtures/modulesFolderPlain'), options)
        .then(modules => {
          assert.isFunction(modules.module1.function1);
          assert.notExists(modules.module2);
          assert.notExists(modules.subFolder);
          done();
        })
    } );
    it( 'Backlist - returns an object with the module name as key and the module', done => {
      const options = {
        blackList:['module3'],
        recursive:true
      }
      loadModulesFromDirectory(path.join(__dirname, '../fixtures/modulesFolderPlain'), options)
        .then(modules => {
          assert.isFunction(modules.module1.function1);
          assert.isFunction(modules.module2.function1);
          assert.notExists(modules.subFolder.module3);
          done();
        })
    } );
    it( 'returns an object with the module name as key and the module applying a create function', done => {
      const options = {
        blackList:[],
        recursive:true,
        onImport: (module: ComponentModule) => module.create({name: 'tomas'})
      }
      loadModulesFromDirectory(path.join(__dirname, '../fixtures/modulesFolderFactory'), options)
        .then(modules => {
          assert.isFunction(modules.module1.function1);
          assert.isFunction(modules.module2.function1);
          assert.isFunction(modules.subFolder.module3.function1);
          done();
        })
    } );
  });
});
