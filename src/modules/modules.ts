import fs from 'fs';
import path from 'path';

//*******************************************
// TS types
//*******************************************

export interface LoadModuleOptions {
  whiteList?: string[]
  blackList?: string[]
  onImport?: <T extends ComponentModule>(module: any) => T | Promise<T>
}

export interface ComponentModule{
  init?: () => Promise<any>;
  destroy?: () => Promise<any>;
  hookHandler?: ()=>{};
  [key:string]: any
}

export async function loadModulesFromDirectory<T extends ComponentModule>(dirName: string, options?:LoadModuleOptions): Promise<Record<string, T>> {
  const components = fs.readdirSync( dirName );
  const map = {};
  for (const component of components) {
    const componentName = path.parse(component).name;
    if ( component === '.DS_Store' || ( options.whiteList?.length && !options.whiteList?.includes( componentName )) || ( options.blackList?.length && options.blackList?.includes( componentName ))) return map;
    if (fs.statSync(`${dirName}/${component}`).isDirectory())
      map[componentName] = await loadModulesFromDirectory<T>( `${dirName}/${component}`, options );
    else
      map[componentName] = options.onImport ? await options.onImport(await import( `${dirName}/${component}` ) as T) : await import( `${dirName}/${component}` ) as T;
  }
  return map;
}
