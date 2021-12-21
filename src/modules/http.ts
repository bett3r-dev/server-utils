import { promiseToAsync } from '@bett3r-dev/bett3r-utils';
import { Async, isTrue, safe } from '@bett3r-dev/crocks';
import fetch, { RequestInit, Response } from 'node-fetch';
import { assoc } from 'rambda';


export interface FetchResponse<T = Record<string, any>> extends Omit<Response,'body'> {
  body: T,
}

const parseResponseBody = (response: Response, method: 'reject'| 'resolve') =>
   response.json()
    .then( body => Promise[method](assoc('body', body, response)))

export const processFetchResponse = (response: Response): Async<Response> =>
  promiseToAsync(
    safe(isTrue, response.ok)
      .either(
        () => parseResponseBody(response, 'reject'),
        () => parseResponseBody(response, 'resolve'),
      )
  )

export const fetchAsync = ( url: string, options?: RequestInit ): Async<Response> =>
  promiseToAsync(fetch( url , {
    method: 'get',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    ...options,
  }));

export const bigIntSerializer = (key: string, value: any) => {
  return typeof value === 'bigint' ? value.toString() : value
}
