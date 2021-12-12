import {Async, Result} from '@bett3r-dev/crocks';
import { createError, EndpointActionParams, EndpointSchemas, ValidationError } from '@bett3r-dev/server-core';
import joi from 'joi';

export const validateResult = <T>(schema: joi.Schema<T>, options: joi.ValidationOptions = {abortEarly:false})=> (value:T): Result<T> => 
  Result.Ok(schema.validate(value, options))
    .chain((result) => result.error
      ? Result.Err(createError(ValidationError, result.error.details)) 
      : Result.Ok(result.value))  


export const validateAsync = <T>(schema: joi.Schema<T>, options: joi.ValidationOptions = {abortEarly:false})=> (value:T) => 
  Async.of(schema.validate(value, options))
    .chain((result) => result.error
      ? Async.Rejected(createError(ValidationError, result.error.details)) 
      : Async.Resolved(result.value))  

export const validateEndpoint = <T>(schemas: EndpointSchemas) => (epParams: EndpointActionParams<T>): Async<EndpointActionParams<T>> =>
  Async.of([
    schemas.query ? validateAsync(schemas.query)(epParams.query) : Async.of(epParams.query),
    schemas.params ? validateAsync(schemas.params)(epParams.params) : Async.of(epParams.params),
    schemas.body ? validateAsync(schemas.body)(epParams.body) : Async.of(epParams.body)
  ])
    .chain(Async.all)
    .map<any>(([query, params, body])=>({
      ...epParams,
      query,
      params,
      body
    }))
  