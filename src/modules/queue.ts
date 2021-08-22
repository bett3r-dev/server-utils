import { ensureArray } from "@bett3r-dev/bett3r-utils";

export interface Queue<T> {
  length: number
  pop: () => T
  push: (value: T) => Queue<T>
  has: (value: T) => boolean
  ap: (data:any) => any[]
  map: <V>(fn: (param: T) => V) => Queue<V>
  fold: <V>(fn: (param: T) => V) => V[]
  concat: (other: Queue<T>) => Queue<T>
  inspect: () => string
}

export const Queue = <T>( init? : any) : Queue<T> => {
  let values = ( init && ensureArray( init )) || [];
  return {
    get length() { return values.length ; },
    pop: () => !!values.length && values.pop(),
    push: value => { values.unshift( value ); return Queue( values ); },
    has: value => values.includes( value ),
    ap: data => values.map( (x:Function) => x( data )),
    map: f => Queue( values.map( f )),
    fold: f => values.map( f ),
    concat: other=> Queue( other.fold(x=>x).concat( values )),
    inspect: (): string => `Queue(${values})`
  };
};
