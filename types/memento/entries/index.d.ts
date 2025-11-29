/**
 * @see https://scripts.mementodatabase.com/script_api/entry/
 */

import type { Entry } from "./entry";

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
export function entry(): Entry
