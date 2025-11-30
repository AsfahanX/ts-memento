/**
 * @see https://scripts.mementodatabase.com/script_api/library/#library-object
 */

import { Entry } from "../entries/entry";

/**
 * The Library object provides access to library entries and operations. It can be obtained through lib(), libByName(), or libById().
 * @see https://scripts.mementodatabase.com/script_api/library/#library-object
 */
export interface Library<T extends Record>  {
    /**
     * Create a new entry in the library with specified field values.
     * @param values Key-value pairs where keys are field names and values are field values
     * @returns the newly created entry
     * 
     * @example
     * // Create a new task with initial values
     * let taskLib = lib();
     * let newTask = taskLib.create({
     *     "Title": "Review Documentation",
     *     "Priority": "High",
     *     "DueDate": new Date(2024, 2, 15).getTime(),
     *     "Status": "Not Started"
     * });
     * 
     * @see https://scripts.mementodatabase.com/script_api/library/#createvalues
     */
    create(values: T): Entry<T> 
}
