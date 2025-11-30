import type { UIObject } from "../ui"

/**
 * A builder object for creating and customizing dialog windows.
 * @see https://scripts.mementodatabase.com/script_api/messages/#dialog-object
 */
export interface Dialog {
    
   /**
    * Sets the title of the dialog.
    * @param text The title text to display
    * @see https://scripts.mementodatabase.com/script_api/messages/#titletext
    */
   title(text: string): this

   /**
    * Sets the main content text of the dialog.
    * @param text The main message text
    * @see https://scripts.mementodatabase.com/script_api/messages/#texttext
    */
   text(text: string): this

   /**
    * Sets a custom view for the dialog.
    * @param uiObject A custom UI object to display in the dialog
    * @see https://scripts.mementodatabase.com/script_api/messages/#viewuiobject
    */
   view(uiObject: UIObject): this

   /**
    * Adds a positive action button to the dialog.
    * @param text The button text
    * @param callback Function to execute when button is clicked
    * @see https://scripts.mementodatabase.com/script_api/messages/#positivebuttontext-callback
    */
   positiveButton(text: string, callback: ()=> boolean | void): this

   /**
    * Adds a negative action button to the dialog.
    * @param text The button text
    * @param callback Function to execute when button is clicked
    * @see https://scripts.mementodatabase.com/script_api/messages/#negativebuttontext-callback
    */
   negativeButton(text: string, callback: ()=> boolean | void): this

   /**
    * Adds a neutral action button to the dialog.
    * @param text The button text
    * @param callback Function to execute when button is clicked
    * @see https://scripts.mementodatabase.com/script_api/messages/#neutralbuttontext-callback
    */
   neutralButton(text: string, callback: ()=> boolean | void): this

   /**
    * Controls whether the dialog automatically closes after button click.
    * @param autoDismiss If false, dialog only closes when callback returns true
    * @see https://scripts.mementodatabase.com/script_api/messages/#autodismissboolean
    */
   autoDismiss(autoDismiss: boolean): this

   /**
    * Displays the configured dialog.
    * @see https://scripts.mementodatabase.com/script_api/messages/#show
    */
   show(): void
}
