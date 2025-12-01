/**
 * @see https://scripts.mementodatabase.com/script_api/messages/
 * @see https://wiki.mementodatabase.com/index.php/Memento_JavaScript_Library#Interaction_with_the_system
 */

import type { Dialog } from "./dialog";

/**
 * Displays a brief notification message to the user.
 * 
 * @param text The text content of the notification to display
 * 
 * @example
 * message("Operation completed successfully");
 * 
 * @see https://scripts.mementodatabase.com/script_api/messages/#messagetext
 */
export function message(text: string): void

/**
 * Writes a line to the script’s log file.
 * @param text 	The text to write to the log file
 * @example
 * log("Starting data processing...");
 * @see https://scripts.mementodatabase.com/script_api/messages/#logtext
 */
export function log(text: string): void

/**
 * Creates a dialog builder for constructing and displaying modal dialogs.
 * @returns a Dialog object that can be used to configure and display the dialog.
 * 
 * @example
 * const myDialog = dialog()
 *    .title("Confirm Action")
 *    .text("Are you sure you want to proceed?")
 *    .positiveButton("Yes", () => {
 *        log("User confirmed action");
 *        return true;
 *    })
 *    .negativeButton("No", () => {
 *        log("User cancelled action");
 *        return true;
 *    })
 *    .show();
 * 
 * @see https://scripts.mementodatabase.com/script_api/messages/#dialog
 */
export function dialog(): Dialog

/**
 * Creates a notification builder for constructing and displaying system notifications.
 * @returns a Notification object that can be used to configure and display the notification.
 * @example
 * notification()
 *     .id(1)
 *     .title("New Message")
 *     .text("You have received a new message")
 *     .bigText("Long message content here...")
 *     .show();
 * log("Notification displayed");
 * @see https://scripts.mementodatabase.com/script_api/messages/#notification
 */
export function notification()
