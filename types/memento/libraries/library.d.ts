/**
 * @see https://scripts.mementodatabase.com/script_api/library/#library-object
 */

import { Entry } from "../entries/entry";

/**
 * The Library object provides access to library entries and operations.
 * It can be obtained through lib(), libByName(), or libById().
 * 
 * Example
 * - {@link https://scripts.mementodatabase.com/script_api/library/#search-and-update-operations Working with Multiple Libraries}
 * - {@link https://scripts.mementodatabase.com/script_api/library/#search-and-update-operations Search and Update Operations}
 * @example
 * // Example of working with related libraries
 * let projectsLib = lib(); // Current library
 * let tasksLib = libByName("Tasks");
 * 
 * // Create a new project
 * let newProject = projectsLib.create({
 *     "Name": "New Website",
 *     "StartDate": new Date().getTime()
 * });
 * 
 * // Create associated tasks
 * let task1 = tasksLib.create({
 *     "Title": "Design mockups",
 *     "DueDate": new Date(2024, 2, 15).getTime()
 * });
 * 
 * // Link the task to the project using a related field ("Project" should be a relation field)
 * task1.set("Project" , newProject)
 * @example
 * // Find and update multiple entries based on complex criteria
 * // Get today's date
 * let today = new Date();
 * 
 * // Get all tasks
 * let allTasks = lib().entries();
 * let resourcesLib = libByName("Resources");
 * 
 * // Iterate and filter only "In Progress" tasks
 * allTasks.forEach(task => {
 *     if (task.field("Status") === "In Progress") {
 *         let dueDate = task.field("DueDate");
 *         
 *         // Check if task is overdue
 *         if (dueDate.getTime() < today.getTime()) {
 *             // Mark task as overdue
 *             task.set("Status", "Overdue");
 *         }
 *     }
 * });
 * @see https://scripts.mementodatabase.com/script_api/library/#library-object
 * @see https://scripts.mementodatabase.com/script_api/library/#working-with-multiple-libraries
 * @see https://scripts.mementodatabase.com/script_api/library/#search-and-update-operations
 */
export interface Library<T extends Record>  {

    /** The name of the library */
    name:	string	
    /** The title of the library (alias for name) */
    title:	string	
    /** The unique identifier of the library (Added in MDB 5.5) */
    id:	string	
    /** Library notes (as specified in the library structure) */
    notes:	string	

    /**
     * Create a new entry in the library with specified field values.
     * @param values Key-value pairs where keys are field names and values are field values
     * @returns the newly created entry
     * 
     * @example
     * // Create a new task with initial values
     * let taskLib = lib();
     * let newTask = taskLib.create({
     *     "Title": "Review Documentation",
     *     "Priority": "High",
     *     "DueDate": new Date(2024, 2, 15).getTime(),
     *     "Status": "Not Started"
     * });
     * 
     * @see https://scripts.mementodatabase.com/script_api/library/#createvalues
     */
    create(values: T): Entry<T>

    /**
     * Get all entries in the library.
     * @returns all entries sorted by creation time (newest first)
     * @example
     * // Get all entries and process them
     * let allEntries = lib().entries();
     * allEntries.forEach(entry => {
     *     if (entry.field("Status") === "Overdue") {
     *         entry.set("Priority", "High");
     *     }
     * });
     * @see https://scripts.mementodatabase.com/script_api/library/#entries
     */
    entries(): Entry<T>[]

    /**
     * Find entries that contain links to the specified entry.
     * 
     * Searches for entries that have a link to the specified entry in any of their Link to Entry fields.
     * @param entry The entry to search for links to
     * @example
     * // Find all tasks linked to a specific project
     * let project = lib().findByKey("Website Redesign");
     * if (project) {
     *     let linkedTasks = lib().linksTo(project);
     *     
     *     // Process linked tasks
     *     linkedTasks.forEach(task => {
     *         log(`Linked task: ${task.field("Title")}`);
     *         if (task.field("Status") === "Completed") {
     *             // Update project progress
     *             project.set("CompletedTasks", project.field("CompletedTasks") + 1);
     *         }
     *     });
     * }
     * @see https://scripts.mementodatabase.com/script_api/library/#linkstoentry
     */
    linksTo(entry: Entry)
}
