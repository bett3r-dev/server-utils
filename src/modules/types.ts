import { ensureArray } from "bett3r-utils";

export const Queue = ( init? : any) => {
  let values = ( init && ensureArray( init )) || [];
  return {
    get length() { return values.length ; },
    pop: () => !!values.length && values.pop(),
    push: value => { values.unshift( value ); return Queue( values ); },
    has: value => values.includes( value ),
    ap: data => values.map( x => x( data )),
    map: f => Queue( values.map( f )),
    fold: f => values.map( f ),
    concat: other=> Queue( other.concat( values )),
    inspect: () => `Queue(${values})`
  };
};
