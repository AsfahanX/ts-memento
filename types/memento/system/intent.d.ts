export type IntentAction = 
    'android.intent.action.DIAL'
    | 'android.intent.action.EDIT'
    | 'android.intent.action.INSERT'
    | 'android.intent.action.MAIN'
    | 'android.intent.action.PICK'
    | 'android.intent.action.SEND'
    | 'android.intent.action.SENDTO'
    | 'android.intent.action.VIEW'

type MimeType = 
    'text/plain'
    | 'image/jpeg'

/**
 * Represents an Android Intent for inter-application communication.
 * @see https://scripts.mementodatabase.com/script_api/system/#intent-object
 */
export interface Intent {
    /**
     * Sets the data URI for the intent.
     * @param uri URI for the data (e.g., “tel:”, “mailto:”, file path)
     * @example
     * let i = intent("android.intent.action.VIEW");
     * i.data("http://example.com");
     * @see https://scripts.mementodatabase.com/script_api/system/#datauri
     */
    data(uri: string): this

    /**
     * Adds extra data to the intent as key-value pairs.
     * @param key Key identifier for the extra data
     * @param value Value to associate with the key
     * @example
     * let i = intent("android.intent.action.SEND");
     * i.extra("android.intent.extra.TEXT", "Hello World");
     * @see https://scripts.mementodatabase.com/script_api/system/#extrakey-value
     */
    extra(key: string, value: unknown): this

    /**
     * Adds extra data specifically as Long type values.
     * @param key Key identifier for the extra data
     * @param value Long value to associate with the key
     * @example
     * // Calendar event example
     * let i = intent("android.intent.action.INSERT");
     * i.data("content://com.android.calendar/events");
     * i.extraLong("beginTime", new Date().getTime());
     * @see https://scripts.mementodatabase.com/script_api/system/#extralongkey-value 
     */
    extraLong(key: string, value: number): this

    /**
     * Sets the MIME type for the intent data.
     * @param mime MIME type (e.g., “text/plain”, “image/jpeg”)
     * @example
     * let i = intent("android.intent.action.SEND");
     * i.mimeType("text/plain");
     * @see https://scripts.mementodatabase.com/script_api/system/#mimetypemime
     */
    mimeType(mime): this

    /**
     * Executes the intent, sending it to the Android system.
     * @example
     * // Complete SMS example
     * let i = intent("android.intent.action.SENDTO");
     * i.data("smsto:+1234567890");
     * i.extra("sms_body", "Hello from Memento!");
     * i.send();
     * @see https://scripts.mementodatabase.com/script_api/system/#send
     */
    send(): void
}
