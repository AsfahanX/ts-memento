/**
 * @see https://scripts.mementodatabase.com/script_api/entry/#entry-object
 */


export interface Entry<T extends Record = Record>  {
    /**
     * Get the value of a specified field.
     * @param name Name of the field to retrieve
     * @returns The field value in its appropriate type:
     * 
     * - Text fields: string
     * - Number fields: number
     * - Date fields: string (ISO date format)
     * - Time fields: string (HH:mm format)
     * - Checkbox fields: boolean
     * - Multiple-choice fields: array of strings
     * - Link to Entry fields: array of Entry objects
     * - Link to File fields: array of file path strings
     * - Image fields: array of image objects
     * 
     * @example
     * 
     * // Get various field types
     * let entry = lib().lastEntry();
     * 
     * // Text field
     * let title = entry.field("Title");
     * message(`Title: ${title}`);
     * 
     * // Number field
     * let quantity = entry.field("Quantity");
     * message(`Quantity: ${quantity}`);
     * 
     * // Date field
     * let dueDate = entry.field("DueDate");
     * message(`Due date: ${dueDate.toLocaleDateString()}`);
     * 
     * // Multiple-choice field
     * let categories = entry.field("Categories");
     * categories.forEach(category => {
     *     message(`Category: ${category}`);
     * });
     * 
     * // Link to Entry field
     * let linkedTasks = entry.field("RelatedTasks");
     * linkedTasks.forEach(task => {
     *     message(`Related task: ${task.field("Title")}`);
     * });
     * 
     * @see https://scripts.mementodatabase.com/script_api/entry/#fieldname
     */
    field<K extends keyof T >(name: K): T[K]
}
