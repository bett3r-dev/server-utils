import Async from '@bett3r-dev/crocks/Async';
import Result from '@bett3r-dev/crocks/Result';
import { EndpointActionParams, EndpointSchemas, Errors } from '@bett3r-dev/server-core';
import * as joi from 'joi';



export const validateResult = <T>(schema: joi.Schema<T>, options: joi.ValidationOptions = {abortEarly:false})=> (value:T): Result<T> => 
  Result.of(schema.validate(value, options))
    .chain((result) => result.error
      ? Result.Err(Errors.ValidationError(['E-VALIDATION'], result.error.details)) 
      : Result.Ok(result.value))  


export const validateAsync = <T>(schema: joi.Schema<T>, options: joi.ValidationOptions = {abortEarly:false})=> (value:T) => 
  Async.of(schema.validate(value, options))
    .chain((result) => result.error
      ? Async.Rejected(Errors.ValidationError(['E-VALIDATION'], result.error.details)) 
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
  