/**
 * @see https://scripts.mementodatabase.com/script_api/library/
 */


import {UserLibraries} from "types";
import type { Library, LibraryStruct } from "./library";

// TODO: not working yet
type AvailableLibraries = UserLibraries extends Record<string, any> ? UserLibraries : never

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
export function lib<T extends LibraryStruct>(): Library<T>

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
export function libByName<T extends AvailableLibraries = AvailableLibraries, K extends keyof T = keyof T>(name: K): Library<T[K]> | null

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
export function libById<T extends LibraryStruct>(id: string): Library<T> | null
