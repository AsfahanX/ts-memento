import type { IconCode } from "../ui"

/**
 * A builder object for creating and customizing system notifications.
 * @see https://scripts.mementodatabase.com/script_api/messages/#notification-object
 */
export interface Notification {
    /**
     * Sets the unique identifier for the notification.
     * @param value Unique ID for the notification
     * @see https://scripts.mementodatabase.com/script_api/messages/#idvalue
     */
    id(value: number): this

    /**
     * Sets the notification title.
     * @param text The title text
     * @see https://scripts.mementodatabase.com/script_api/messages/#titletext-1
     */
    title(text: string): this

    /**
     * Sets the notification content text.
     * @param content The main notification text
     * @see https://scripts.mementodatabase.com/script_api/messages/#textcontent
     */
    text(content: string): this

    /**
     * Sets the expanded notification text.
     * @param content The expanded text content
     * @see https://scripts.mementodatabase.com/script_api/messages/#bigtextcontent
     */
    bigText(content: string): this

    /**
     * Sets the small notification icon.
     * @param icon The icon code to use
     * @see https://scripts.mementodatabase.com/script_api/messages/#smalliconicon
     */
    smallIcon(icon: IconCode): this

    /**
     * Sets the large notification icon.
     * @param icon Icon code or image URL
     * @see https://scripts.mementodatabase.com/script_api/messages/#largeiconicon
     */
    largeIcon(icon): this

    /**
     * Configures the notification to alert only once.
     * @see https://scripts.mementodatabase.com/script_api/messages/#alertonce
     */
    alertOnce(): this

    /**
     * Displays the configured notification.
     * @see https://scripts.mementodatabase.com/script_api/messages/#show-1
     */
    show(): void
}