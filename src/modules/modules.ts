import fs from 'fs';
import path from 'path';
import {compose} from 'rambda';
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

export async function loadModulesFromDirectory<T extends ComponentModule>(dirName: string, options: LoadModuleOptions): Promise<Record<string, T>> {
  const components = fs.readdirSync( dirName );
  const map: Record<string, any> = {};
  for (let module of components) {
    const moduleName = path.parse(module).name
    const componentName = options.formatName ? options.formatName(moduleName) : moduleName;
    if ( module === '.DS_Store' || ( options.whiteList?.length && !options.whiteList?.includes(  moduleName )) || ( options.blackList?.length && options.blackList?.includes(  moduleName )))
      continue;
    if (options.recursive && fs.statSync(`${dirName}/${module}`).isDirectory())
      map[componentName] = await loadModulesFromDirectory<T>( `${dirName}/${module}`, options );
    else
      map[componentName] = options.onImport ? await options.onImport(await import( `${dirName}/${module}` ) as T) : await import( `${dirName}/${module}` ) as T;
  }
  return map;
}
