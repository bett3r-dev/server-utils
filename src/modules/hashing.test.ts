import { assert } from 'chai';
import * as mod from './hashing';

describe( 'hashing', function() {
  describe('base64Encode', function() {
    it('Encodes a string in base64', () => {
      assert.equal(mod.base64Encode('tomas'), 'dG9tYXM=')
    });
  });
  describe('base64Decode', function() {
    it('Decodes a string in base64', () => {
      assert.equal(mod.base64Decode('dG9tYXM='), 'tomas')
    });
  });
  describe('md5Encode', function() {
    it('Encodes a string in MD5', () => {
      assert.equal(mod.md5Encode('tomas'), '4b506c2968184be185f6282f5dcac238')
    });
  });
  describe('getRandomBytes', function() {
    it('Generates random hex bytes of specified length', () => {
      assert.match(mod.getRandomBytes(8), /^[ABCDEF0123456789]{8}$/mig)
      assert.match(mod.getRandomBytes(4), /^[ABCDEF0123456789]{4}$/mig)
      assert.match(mod.getRandomBytes(6), /^[ABCDEF0123456789]{6}$/mig)
    });
  });
});
