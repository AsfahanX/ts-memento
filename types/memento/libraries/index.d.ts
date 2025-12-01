/**
 * @see https://scripts.mementodatabase.com/script_api/library/
 */


import type { UserLibrary } from "../user-libraries";
import type { Library } from "./library";

/**
 * Get the Library object of the current event.
 * @returns the current library
 * @example
 * // Get current library and create a new entry
 * let currentLib = lib();
 * let newEntry = currentLib.create({
 *     "Title": "New Task",
 *     "Status": "Pending"
 * });
 * @see https://scripts.mementodatabase.com/script_api/library/#lib
 */
export function lib(): Library

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

/**
 * Find a library by its ID.
 * 
 * Requires appropriate security permissions to access the library.
 * More reliable than libByName() as IDs don’t change when libraries are renamed.
 * @param id The ID of the library to find
 * @returns the library with the specified ID if found
 * @example
 * // Access a library using its ID
 * let projectsLib = libById("lib_projects_001");
 * if (projectsLib) {
 *     let activeProjects = projectsLib.find("Active");
 *     message("PActive projects: " + activeProjects.length);
 * }
 * @see https://scripts.mementodatabase.com/script_api/library/#libbyidid
 */
export function libById(id: string): Library | null
