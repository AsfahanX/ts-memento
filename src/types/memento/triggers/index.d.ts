export enum ExecutionMode {
    /**
     * * Pauses user interaction while the script runs
     * * Used for “Before…” phases
     * * Can prevent actions using cancel()
     * * Should avoid time-consuming operations
     * * Example: Data validation before saving
     */
    Synchronous = 'Synchronous',

    /**
     * 
     * * Runs in the background
     * * User can continue interacting with the app
     * * Used for “After…” phases
     * * Ideal for tasks that don’t need immediate completion
     * * Example: Logging changes after saving
     */
    Asynchronous = 'Asynchronous'
}

export enum EventPhase {
    'Opening the library' = ExecutionMode.Synchronous,
    'Opening an Entry Edit card' = ExecutionMode.Synchronous,
    
    'Before saving the entry' = ExecutionMode.Synchronous,
    'After saving the entry' = ExecutionMode.Asynchronous,
    
    'Before saving' = ExecutionMode.Synchronous,
    'After saving' = ExecutionMode.Asynchronous,
    
    'Before deleting the entry' = ExecutionMode.Synchronous,
    'After deleting the entry' = ExecutionMode.Asynchronous,
    
    'Before window display' = ExecutionMode.Synchronous,
    'After window display' = ExecutionMode.Asynchronous,
    
    'Before the operation' = ExecutionMode.Synchronous,
    'After the operation' = ExecutionMode.Asynchronous,
}

export enum EventType {
    /**
     * Phase:
     * * {@link EventPhase#OpeningAnEntryEditCard}
     * @see https://scripts.mementodatabase.com/scripts/triggers/#entry-creation--modification-events
     */
    'Creating an entry',
    /**
     * @see https://scripts.mementodatabase.com/scripts/triggers/#entry-creation--modification-events
     */
    'Updating an entry',
    /**
     * @see https://scripts.mementodatabase.com/scripts/triggers/#entry-management-events
     */
    'Deleting an entry',
    /**
     * @see https://scripts.mementodatabase.com/scripts/triggers/#entry-management-events
     */
    'Opening an Entry View card',
}