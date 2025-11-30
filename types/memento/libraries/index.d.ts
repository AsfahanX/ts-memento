/**
 * @see https://scripts.mementodatabase.com/script_api/library/
 */


import type { UserLibrary } from "../user-libraries";
import type { Library } from "./library";


/**
 * Find a library by its name.
 * 
 * Requires appropriate security permissions to access the library.
 * Returns null if library not found or permissions are insufficient.
 * 
 * @param name The name of the library to find
 * @returns the library with the specified name if found
 * 
 * @see https://scripts.mementodatabase.com/script_api/library/#libbynamename
 */
export function libByName<T extends UserLibrary = UserLibrary, K extends keyof T>(name: K): Library<T[K]> | null
