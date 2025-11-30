/**
 * @see https://scripts.mementodatabase.com/script_api/library/#library-object
 */

import { Entry } from "../entries/entry";

/**
 * The Library object provides access to library entries and operations. It can be obtained through lib(), libByName(), or libById().
 * @see https://scripts.mementodatabase.com/script_api/library/#library-object
 */
export interface Library<T extends Record>  {
    create(values: T): Entry<T> 
}
