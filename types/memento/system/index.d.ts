/**
 * @see https://scripts.mementodatabase.com/script_api/system/
 */

import type { Intent, IntentAction } from "./intent"

/**
 * @see https://scripts.mementodatabase.com/script_api/system/#system-object
 */
interface SystemObject {
    /** Operating system name */
    os:         string
    /** Current user’s username */
    username:   string
}

/**
 * Stops the current system operation that triggered the event.
 * Useful for preventing operations during validation phases.
 * @description
 * This method works only in triggers or event scripts executed before saving or before creating an entry.
 * @example
 * // Prevent saving if validation fails
 * if (!isValid) {
 *     log("Validation failed - canceling save");
 *     cancel();
 * }
 * @see https://scripts.mementodatabase.com/script_api/system/#cancel
 */
export function cancel(): void

/**
 * Terminates script execution immediately.
 * @example
 * log("Performing early exit");
 * exit();
 * @see https://scripts.mementodatabase.com/script_api/system/#exit
 */
export function exit(): void

/**
 * Returns information about the current system environment.
 * @example
 * let sys = system();
 * log("Operating system: " + sys.os);
 * log("Current user: " + sys.username);
 * @see https://scripts.mementodatabase.com/script_api/system/#system-1
 */
export function system(): SystemObject

/**
 * Generates a random unique identifier string.
 * @example
 * let uniqueId = guid();
 * log("Generated ID: " + uniqueId);
 * @see https://scripts.mementodatabase.com/script_api/system/#guid
 */
export function guid(): string

/**
 * Creates an Intent object for inter-application communication (Android only).
 * @param action Standard Android intent action (e.g., “android.intent.action.VIEW”)
 * @example
 * // Create intent to dial a phone number
 * let i = intent("android.intent.action.DIAL");
 * i.data("tel:+1234567890");
 * i.send();
 * @see https://scripts.mementodatabase.com/script_api/system/#intentaction
 */
export function intent(action: IntentAction): Intent
