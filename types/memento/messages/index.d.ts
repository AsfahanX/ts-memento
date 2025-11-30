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