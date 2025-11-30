/**
 * @see https://scripts.mementodatabase.com/script_api/entry/#entry-object
 */


export interface Entry<T extends Record = Record>  {
    field<K extends keyof T >(name: K): T[K]
}
