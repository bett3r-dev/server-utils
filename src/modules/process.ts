import { Async } from '@bett3r-dev/crocks';
import { exec } from 'child_process';

/*istanbul ignore next*/
export function execShellCommand( cmd: string, cwd: string = __dirname ) {
  return Async(( reject, resolve ) => {
    exec( cmd, { cwd }, ( error, stdout, stderr ) => {
      if ( error ) return reject( error );
      resolve( stderr || stdout );
    });
  });
}

export const dieOnError = (logger: {error: (err:any) => void}) => (err: any) => {
  logger.error(err);
  process.exit(1);
}
