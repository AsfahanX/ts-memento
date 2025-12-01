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
export interface Library<T extends Record<string, unknown> = Record<string, unknown>>  {

    /** The name of the library */
    name:	string	
    /** The title of the library (alias for name) */
    title:	string	
    /** The unique identifier of the library (Added in MDB 5.5) */
    id:     string	
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
     * Get the most recently created entry.
     * @returns the newest entry or null if library is empty
     * @example
     * // Get the latest entry and copy some of its values
     * let latest = lib().lastEntry();
     * if (latest) {
     *     let newEntry = lib().create({
     *         "Category": latest.field("Category"),
     *         "Department": latest.field("Department"),
     *         "CreatedDate": new Date().getTime()
     *     });
     * }
     * @see https://scripts.mementodatabase.com/script_api/library/#lastentry
     */
    lastEntry(): Entry<T> | null

    /**
     * Get the oldest entry in the library.
     * @returns the oldest entry or null if library is empty
     * @example
     * // Archive old entries
     * let oldest = lib().firstEntry();
     * if (oldest && oldest.creationTime.getTime() < new Date('2024-01-01').getTime()) {
     *     oldest.set("Status", "Archived");
     * }
     * @see https://scripts.mementodatabase.com/script_api/library/#firstentry
     */
    firstEntry(): Entry<T> | null

    /**
     * Get field names defined in the library.
     * 
     * Returns an array of field names that are defined in the MAIN page and not within a Subheader.
     * Available since Memento release 4.13.
     * @since 4.13
     * @returns field names in definition order
     * @example
     * // Get all field names and log them
     * let fieldNames = lib().fields();
     * fieldNames.forEach(fieldName => {
     *     log(`Field name: ${fieldName}`);
     * });
     * @see https://scripts.mementodatabase.com/script_api/library/#fields
     */
    fields(): Array<keyof T>

    /**
     * Search for entries matching the given query.
     * @param query The search query string
     * @returns entries matching the search criteria
     * @example
     * // Find all high priority tasks
     * let highPriorityTasks = lib().find("High");
     * // Process found entries
     * highPriorityTasks.forEach(task => {
     *     log(`High priority task: ${task.field("Title")}`);
     * });
     * @see https://scripts.mementodatabase.com/script_api/library/#findquery
     */
    find(query: string): Entry<T>[]

    /**
     * Find an entry by its unique ID.
     * @param id The unique identifier of the entry
     * @returns the entry with the specified ID if found
     * @example
     * // Find entry by ID and update it
     * let entry = lib().findById("entry_123");
     * if (entry) {
     *     entry.set("LastChecked", new Date().getTime());
     * } else {
     *     log("Entry not found");
     * }
     * @see https://scripts.mementodatabase.com/script_api/library/#findbyidid
     */
    findById(id: string): Entry<T> | null

    /**
     * Find an entry by its name field value.
     * 
     * Searches for an entry using the entry name.
     * The library must be configured to use unique entry names for this method to work reliably.
     * @param name The value of the Entry name field
     * @returns the entry with the specified name if found
     * @example
     * // Find a project by its name
     * let project = lib().findByKey("Website Redesign");
     * if (project) {
     *     // Update project status
     *     project.set("Status", "In Progress");
     *     
     *     // Get linked tasks
     *     let linkedTasks = lib().linksTo(project);
     *     log(`Found ${linkedTasks.length} tasks linked to this project`);
     * } 
     * @see https://scripts.mementodatabase.com/script_api/library/#findbykeyname
     */
    findByKey(name: string): Entry<T> | nul

    /**
     * Find entries that contain links to the specified entry.
     * 
     * Searches for entries that have a link to the specified entry in any of their Link to Entry fields.
     * @param entry The entry to search for links to
     * @returns entries that link to the specified entry
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
    linksTo(entry: Entry): Entry<T>[]

    /**
     * Display the library in the user interface.
     * @example
     * // Show the library after creating a new entry
     * let newEntry = lib().create({
     *     "Title": "Important Task",
     *     "Priority": "High"
     * });
     * lib().show(); // Display the library with the new entry
     * @see https://scripts.mementodatabase.com/script_api/library/#show
     */
    show(): void
}
