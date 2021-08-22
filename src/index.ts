import T from '@bett3r-dev/simple-transducers';
export const Transducers = T
export * from 'rambda';
export {reduce} from '@bett3r-dev/bett3r-utils';
export * from '@bett3r-dev/bett3r-utils';

export * from './modules/hashing'
export * from './modules/http'
export * from './modules/modules'
export * from './modules/process'
export * from './modules/timers'
export * from './modules/tests'
export * from './modules/queue'

declare type hashing = typeof import('./modules/hashing');
declare type http = typeof import('./modules/http');
declare type modules = typeof import('./modules/modules');
declare type process = typeof import('./modules/process');
declare type timers = typeof import('./modules/timers');
declare type queue = typeof import('./modules/queue');
declare type tests = typeof import('./modules/tests');
export declare interface ServerUtils extends hashing, http, modules, process, timers, tests, queue {}

declare type transducers = typeof import('@bett3r-dev/simple-transducers').default;
declare type rambda = typeof import('rambda');
declare type utils = typeof import('@bett3r-dev/bett3r-utils');
export declare interface Utils extends Omit<rambda, 'reduce'>, utils, ServerUtils {
  Transducers: transducers
}
