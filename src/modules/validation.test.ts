import * as validation from './validation'
import joi from 'joi';
import * as u from '@bett3r-dev/server-utils'

describe('validation', () => {
  describe('validateResult', () => {
    const schema = joi.object().keys({
      string: joi.string(),
      number: joi.number()
    });
    it('returns a result ok if schema is ok', done => {
      validation.validateResult(schema)({string:'asdf', number:12})
        .either(done, () => done());
    });
    it('returns a result Err if schema is not ok', done => {
      validation.validateResult(schema)({string:34, number:12})
        .either(() => done() , done);
    });
    it('returns the same value being validated is ok', done => {
      validation.validateResult(schema)({string:'asdf', number:12})
        .map((val) => {
          expect(val).toEqual({string:'asdf', number:12})
        })  
        .either(done, () => done());
    });
    it('returns err detail if value being validated is not ok', done => {
      validation.validateResult(schema)({string:34, number:12})
        .bimap((err) => {
          expect(err).toBeInstanceOf(Error)
          expect(err.name).toEqual('ValidationError')
        }, u.I)  
        .either(done, () => done());
    });
  });
});