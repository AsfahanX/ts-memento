import type { JSImage } from "../fields"
import { LibraryStruct } from "../libraries/library"

/**
 * The Entry object represents a single entry in a library and provides methods for accessing and modifying its field values.
 * @see https://scripts.mementodatabase.com/script_api/entry/#entry-object
 */
export interface Entry<T extends LibraryStruct = LibraryStruct>  {

    /** ID of the user who created the entry */
    author:             string	
    /** Date and time when the entry was created */
    creationTime:       string	
    /** True if the entry is in the Recycle Bin */
    deleted:        boolean	
    /** Entry description */
    description:        string	
    /** True if the entry is in Favorites */
    favorites:          boolean	
    /** Unique entry identifier */
    id:                 string	
    /** Date and time of last modification */
    lastModifiedTime:   string	
    /** Entry name */
    name:               string	
    /** Entry name (alias for name) */
    title:              string	

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
     * Returns the values of all fields in the entry as a JavaScript object in JSON format.
     * Each field name is used as the key, and its value is mapped accordingly.
     * @example
     * // Get all entry values as JSON
     * var e = entry();
     * var json = e.values();
     * message(JSON.stringify(json, null, 2));
     * @see https://scripts.mementodatabase.com/script_api/entry/#values
     */
    values(): T

    /**
     * Get images associated with an image field.
     * @param name Name of the image field
     * @example
     * // Work with images in an entry
     * let entry = lib().lastEntry();
     * let photos = entry.images("Photos");
     * 
     * // Process all images
     * photos.forEach(photo => {
     *     message(`Image URI: ${photo.uri}`);
     *     message(`Caption: ${photo.caption}`);
     *     
     *     // Update caption if needed
     *     if (!photo.caption) {
     *         photo.caption = "Photo taken on " + new Date().toLocaleDateString();
     *     }
     * });
     * @see https://scripts.mementodatabase.com/script_api/entry/#imagesname
     */
    images(name: keyof T): JSImage[]

    /**
     * Add a link to another entry in a Link to Entry field.
     * @param name Name of the Link to Entry field
     * @param entry Entry to link to
     * @example
     * // Link a task to a project
     * let tasksLib = lib();
     * let projectsLib = libByName("Projects");
     * 
     * // Get the project and task
     * let project = projectsLib.findByKey("Website Redesign");
     * let task = tasksLib.lastEntry();
     * 
     * if (project && task) {
     *     // Create link from task to project
     *     task.link("Project", project);
     *     
     *     // Update task metadata
     *     task.set("ProjectStartDate", project.field("StartDate"));
     *     task.set("Department", project.field("Department"));
     * }
     * @see https://scripts.mementodatabase.com/script_api/entry/#linkname-entry 
     */
    link(name: keyof T, entry: Entry)

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

    /**
     * Restore the entry from the Recycle Bin.
     * @example
     * // Restore accidentally deleted entries
     * lib().entries().forEach(entry => {
     *     if (entry.deleted) {
     *         entry.untrash();
     *         entry.set("RestoredDate", new Date().getTime());
     *         entry.set("RestoredBy", "Script");
     *     }
     * });
     * @see https://scripts.mementodatabase.com/script_api/entry/#untrash
     */
    untrash(): void

    /**
     * Remove a link to another entry from a Link to Entry field.
     * @param name Name of the Link to Entry field
     * @param entry Entry to unlink
     * @example
     * // Remove completed tasks from project links
     * let project = lib().lastEntry();
     * let linkedTasks = project.field("Tasks");
     * 
     * linkedTasks.forEach(task => {
     *     if (task.field("Status") === "Completed") {
     *         project.unlink("Tasks", task);
     *         task.set("ProjectArchiveDate", new Date().getTime());
     *     }
     * });
     * @see https://scripts.mementodatabase.com/script_api/entry/#unlinkname-entry 
     */
    unlink(name: keyof T, entry: Entry): void

    /**
     * Create and return an exact copy of the current entry.
     * @returns The newly created entry that is a copy of the original
     * @example
     * // Remove completed tasks from project links
     * // Duplicate the last entry in the library
     * let original = lib().lastEntry();
     * let copy = original.duplicate();
     * 
     * // Modify the duplicate without affecting the original
     * copy.set("Title", original.field("Title") + " (Copy)");
     * @see https://scripts.mementodatabase.com/script_api/entry/#duplicate
     */
    duplicate(): Entry
}

export interface DefaultEntry {
    /** Indicates a new empty entry */
    created:    boolean	
    /** Indicates a duplicate of an existing entry */
    duplicated: boolean	
    /** Indicates creation from a template     */
    prefilled:  boolean	
}
