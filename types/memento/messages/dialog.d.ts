/**
 * @see https://scripts.mementodatabase.com/script_api/messages/#dialog-object
 */
export interface Dialog {
    
   /**
    * Sets the title of the dialog.
    * @param text The title text to display
    * @see https://scripts.mementodatabase.com/script_api/messages/#titletext
    */
   title(text: string): this
}