import {compose} from 'rambda';
import fs from 'fs';
import path from 'path';
import t from '@bett3r-dev/simple-transducers';
export {constantCase as toConstantCase, } from 'change-case';
export {titleCase as toTitleCase, } from 'title-case';

//*******************************************
// TS types
//*******************************************

export interface LoadModuleOptions {
  whiteList?: (string|RegExp)[]
  blackList?: (string|RegExp)[]
  fileRejectPredicate?: (file: string, filePath: string, module: string) => boolean,
  recursive?: boolean
  onImport?: <T extends ComponentModule>(module: any) => T | Promise<T>,
  formatName?: (name: string) => string
  formatFileName?: (name: string) => string
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

export const toKebabCase = (key: string): string =>
  key
    .replace(/([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu, "$1-$2")
    .replace(
      /(\p{Uppercase_Letter}+)(\p{Uppercase_Letter}\p{Lowercase_Letter}+)/gu,
      "$1-$2"
    )
    .toLowerCase();

export function rejectFilename(filename:string, filePath:string, module:string, {whiteList, blackList, fileRejectPredicate}: LoadModuleOptions) {
  if (fileRejectPredicate){
    return fileRejectPredicate(filename, filePath, module)
  }
  if (
    filename === '.git' || 
    filename === '.DS_Store' || 
    ( whiteList?.length && !whiteList?.some( ( match: any ) => !match.test ? match === module : match.test(module) )) || 
    ( blackList?.length && blackList?.some( ( match: any ) => !match.test ? match === module : match.test(module) ))
  )
    return true;
}

export async function loadModulesFromDirectory<T extends ComponentModule>(dirName: string, options: LoadModuleOptions = {}): Promise<Record<string, T>> {
  const components = fs.readdirSync( dirName );
  const modulesMap: Record<string, any> = {};
  for (let filename of components) {
    const module = path.parse(filename).name;
    const filePath = `${dirName}/${filename}`;
    const importFile = options.formatFileName ? options.formatFileName(filePath) : filePath;
    const componentName = options.formatName ? options.formatName(module) : module;
    if (options.recursive && fs.statSync(importFile).isDirectory())
      Object.assign(modulesMap, await loadModulesFromDirectory<T>( importFile, options ));
    else
      if (rejectFilename(filename, filePath, module, options))
        continue;
      else modulesMap[componentName] = options.onImport ? await options.onImport(await import( importFile ) as T) : await import( importFile ) as T;
  }
  return modulesMap;
}
