import * as u from 'bett3r-utils';

import {compose, map, pick} from 'rambda';

import Identity from 'crocks/Identity'
import fs from 'fs';
import path from 'path';
import t from 'simple-transducers';

//*******************************************
// TS types
//*******************************************

export interface LoadModuleOptions {
  whiteList?: string[]
  blackList?: string[]
  recursive?: boolean
  onImport?: <T extends ComponentModule>(module: any) => T | Promise<T>,
  formatName?: (name: string) => string
}

export interface ComponentModule{
  init?: () => Promise<any>;
  destroy?: () => Promise<any>;
  hookHandler?: ()=>{};
  [key:string]: any
}

export function toCamelCase(str:string): string {
  return t.seq( compose(
    t.filter(part => !!part),
    t.map((part:string, index:number) => (index===0 ? part[0].toLowerCase() : part[0].toUpperCase()) + part.slice(1)),
    t.reduce((acc, curr:string) => acc+curr, '')
  ) ,str.split(/[_\s\-]/)) as string
}


export function filterFilename(filename:string, module:string, {whiteList, blackList}: {whiteList?: RegExp[], blackList?: RegExp[]}) {
  if (filename === '.DS_Store' || ( whiteList?.length && !whiteList?.some( match => match.test(module) )) || ( blackList?.length && blackList?.some( match => match.test(module) )))
    return true;
}

export const formatRegExpForFileLists = (options:LoadModuleOptions): {whiteList: RegExp[], blackList: RegExp[]} =>
  Identity.of(options)
    .map(pick(['whiteList', 'blackList']))
    .map(map(map((match: string) => RegExp(match, 'i'))))
    .valueOf()

export async function loadModulesFromDirectory<T extends ComponentModule>(dirName: string, options: LoadModuleOptions): Promise<Record<string, T>> {
  const components = fs.readdirSync( dirName );
  const modulesMap: Record<string, any> = {};
  const moduleFilesFilters = formatRegExpForFileLists(options);
  for (let filename of components) {
    const module = path.parse(filename).name
    const componentName = options.formatName ? options.formatName(module) : module;
    if (filterFilename(filename, module, moduleFilesFilters))
      continue;
    if (options.recursive && fs.statSync(`${dirName}/${filename}`).isDirectory())
      modulesMap[componentName] = await loadModulesFromDirectory<T>( `${dirName}/${filename}`, options );
    else
      modulesMap[componentName] = options.onImport ? await options.onImport(await import( `${dirName}/${filename}` ) as T) : await import( `${dirName}/${filename}` ) as T;
  }
  return modulesMap;
}
