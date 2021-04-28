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

export function toCamelCase(str:string) {
  return t.seq( compose(
    t.filter(part => !!part),
    t.map((part:string, index:number) => index===0 ? part : part[0].toUpperCase() + part.slice(1)),
    t.reduce((acc, curr:string) => acc+curr, '')
  ) ,str.split(/[_\s\-]/))
}

export async function loadModulesFromDirectory<T extends ComponentModule>(dirName: string, options: LoadModuleOptions): Promise<Record<string, T>> {
  const components = fs.readdirSync( dirName );
  const map: Record<string, any> = {};
  for (const component of components) {
    const componentName = options.formatName ? options.formatName(path.parse(component).name) : path.parse(component).name;
    if ( component === '.DS_Store' || ( options.whiteList?.length && !options.whiteList?.includes( componentName )) || ( options.blackList?.length && options.blackList?.includes( componentName )))
      continue;
    if (options.recursive && fs.statSync(`${dirName}/${component}`).isDirectory())
      map[componentName] = await loadModulesFromDirectory<T>( `${dirName}/${component}`, options );
    else
      map[componentName] = options.onImport ? await options.onImport(await import( `${dirName}/${component}` ) as T) : await import( `${dirName}/${component}` ) as T;
  }
  return map;
}
