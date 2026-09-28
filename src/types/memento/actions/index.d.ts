import { Entry } from "../entries";

/**
 * @see https://scripts.mementodatabase.com/scripts/actions/#arguments
 */
export function arg(name: string): unknown;

/**
 * @see https://scripts.mementodatabase.com/scripts/actions/#bulk-context
 */
export function selectedEntries<T>(): Entry<T>[];
