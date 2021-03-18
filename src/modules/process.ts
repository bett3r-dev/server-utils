import Async from 'crocks/Async';
import {exec} from 'child_process';

/*istanbul ignore next*/
export function execShellCommand( cmd: string, cwd: string = __dirname ) {
  return Async(( reject, resolve ) => {
    exec( cmd, { cwd }, ( error, stdout, stderr ) => {
      if ( error ) return reject( error );
      resolve( stderr || stdout );
    });
  });
}
