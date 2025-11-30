/**
 * The Entry object represents a single entry in a library and provides methods for accessing and modifying its field values.
 * @see https://scripts.mementodatabase.com/script_api/entry/#entry-object
 */
export interface Entry<T extends Record = Record>  {

    /** ID of the user who created the entry */
    author: string	
    /** Date and time when the entry was created */
    creationTime: string	
    /** True if the entry is in the Recycle Bin */
    deleted: boolean	
    /** Entry description */
    description: string	
    /** True if the entry is in Favorites */
    favorites: boolean	
    /** Unique entry identifier */
    id: string	
    /** Date and time of last modification */
    lastModifiedTime: string	
    /** Entry name */
    name: string	
    /** Entry name (alias for name) */
    title: string	

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

    /**
     * Recalculate all calculated fields in the entry.
     * @example
     * // Update quantities and recalculate totals
     * let entry = lib().lastEntry();
     * entry.set("Quantity", 5);
     * entry.set("UnitPrice", 10.99);
     * // Recalculate the Total field that might depend on Quantity and UnitPrice
     * entry.recalc();
     * @see https://scripts.mementodatabase.com/script_api/entry/#recalc
     */
    recalc(): void

    /**
     * Set the value of a specified field.
     * @param name Name of the field to update
     * @param value Value to set (type must match field type)
     * @example
     * // Examples of setting different field types
     * let entry = lib().lastEntry();
     * 
     * // Text field
     * entry.set("Title", "Updated Task Title");
     * 
     * // Number field
     * entry.set("Quantity", 42);
     * 
     * // Date field
     * entry.set("DueDate", new Date().getTime());
     * 
     * // Multiple-choice field
     * entry.set("Categories", ["Work", "Important", "Project"]);
     * 
     * // Checkbox field
     * entry.set("Completed", true);
     * 
     * // Link to Entry field with multiple values
     * entry.set("RelatedItems",  [entry1, entry2]);
     * @see https://scripts.mementodatabase.com/script_api/entry/#setname-value 
     */
    set<K extends keyof T>(name: K, value: T[K]): void

    /**
     * Display the entry in the user interface.
     * @example
     * // Create entry and show it
     * let entry = lib().create({
     *     "Title": "New Task",
     *     "Priority": "High"
     * });
     * entry.show(); // Display the new entry
     * @see https://scripts.mementodatabase.com/script_api/entry/#show
     */
    show(): void

    /**
     * Move the entry to the Recycle Bin.
     * @example
     * // Move completed old entries to trash
     * let oldEntries = lib().find("Status: Completed");
     * let monthAgo = new Date();
     * monthAgo.setMonth(monthAgo.getMonth() - 1);
     * 
     * oldEntries.forEach(entry => {
     *     let completionDate = entry.field("CompletionDate");
     *     if (completionDate.getTime() < monthAgo.getTime()) {
     *         entry.trash();
     *     }
     * });
     * @see https://scripts.mementodatabase.com/script_api/entry/#trash
     */
    trash(): void
}
