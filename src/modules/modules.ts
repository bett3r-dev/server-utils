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
  whiteList?: (string|RegExp)[]
  blackList?: (string|RegExp)[]
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


export function filterFilename(filename:string, module:string, {whiteList, blackList}: {whiteList?: any[], blackList?: any[]}) {
  if (filename === '.DS_Store' || ( whiteList?.length && !whiteList?.some( match => !match.test ? match === module : match.test(module) )) || ( blackList?.length && blackList?.some( match => !match.test ? match === module : match.test(module) )))
    return true;
}

export async function loadModulesFromDirectory<T extends ComponentModule>(dirName: string, options: LoadModuleOptions): Promise<Record<string, T>> {
  const components = fs.readdirSync( dirName );
  const modulesMap: Record<string, any> = {};
  for (let filename of components) {
    const module = path.parse(filename).name
    const componentName = options.formatName ? options.formatName(module) : module;
    if (options.recursive && fs.statSync(`${dirName}/${filename}`).isDirectory())
      modulesMap[componentName] = await loadModulesFromDirectory<T>( `${dirName}/${filename}`, options );
    else
      if (filterFilename(filename, module, options))
        continue;
      else modulesMap[componentName] = options.onImport ? await options.onImport(await import( `${dirName}/${filename}` ) as T) : await import( `${dirName}/${filename}` ) as T;
  }
  return modulesMap;
}
