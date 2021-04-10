import crypto from 'crypto';

export const base64Encode = (str: string): string => Buffer.from( str ).toString( 'base64' );
export const base64Decode = (str: string): string => Buffer.from( str, 'base64' ).toString();
export const md5Encode = (str: string) => crypto.createHash('md5').update(str).digest('hex');
export const getRandomBytes = ( length: number ) =>
  crypto.randomBytes( Math.ceil( length / 2 ))
    .toString( 'hex' ) /** convert to hexadecimal format */
    .slice( 0,length ); /** return required number of characters */
