/**
 * @see https://scripts.mementodatabase.com/script_api/entry/
 */

import { LibraryStruct } from "../libraries/library";
import type { DefaultEntry, Entry } from "./entry";

/**
 * Get the Entry object of the current event.
 * 
 * Returns a clone of the actual Entry object. If the entry is saved, the clone becomes the actual entry.
 * If cancel() is called, the clone and any changes are discarded.
 * 
 * Not available during ‘Creating an entry > Opening an Entry Edit card’ event (use entryDefault() instead)
 * 
 * @returns the current entry
 * 
 * @example
 * // Get the current entry and update its status
 * let currentEntry = entry();
 * currentEntry.set("Status", "In Progress");

 * 
 * @see https://scripts.mementodatabase.com/script_api/entry/#entry
 */
export function entry<T extends LibraryStruct>(): Entry<T>

/**
 * Get default field values for a not-yet-created entry.
 * 
 * Only available during ‘Creating an entry > Opening an Entry Edit card’ event.
 * Used to set default values for new entries.
 * @returns object contains default values for the new entry
 * @example
 * // Set default values for a new entry
 * let defaults = entryDefault();
 * defaults.set("Status", "New");
 * defaults.set("CreatedDate", new Date().getTime());
 * @see https://scripts.mementodatabase.com/script_api/entry/#entrydefault
 */
export function entryDefault(): Entry & DefaultEntry

/**
 * Customize default field values during entry creation or update events.
 * 
 * Available during ‘Creating an entry’ or ‘Updating an entry’ trigger events.
 * Specifically designed for the ‘Opening an Entry Edit card’ phase.
 * @returns object contains methods for setting default values
 * @example
 * // Set different defaults based on creation method
 * if (buildDefaultEntry().duplicated) {
 *     buildDefaultEntry().set("Status", "Duplicate");
 *     buildDefaultEntry().set("DuplicatedDate", new Date().getTime());
 * } else if (buildDefaultEntry().created) {
 *     buildDefaultEntry().set("Status", "New");
 *     buildDefaultEntry().set("Priority", "Medium");
 * }
 * @see https://scripts.mementodatabase.com/script_api/entry/#builddefaultentry
 */
export function buildDefaultEntry(): Entry & DefaultEntry
