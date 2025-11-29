/**
 * @see https://scripts.mementodatabase.com/script_api/library/#library-object
 */

import { Entry } from "./entry"

/**
 * The Library object provides access to library entries and operations. It can be obtained through lib(), libByName(), or libById().
 * @see https://scripts.mementodatabase.com/script_api/library/#library-object
 */
export interface Library<T extends Entry = Entry>  {
    create(values: object): T 
}
