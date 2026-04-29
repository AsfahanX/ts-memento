/**
 * @see https://scripts.mementodatabase.com/script_api/fields/
 */

/**
 * Represents an image stored in an Image field.
 * @see https://scripts.mementodatabase.com/script_api/fields/#jsimage-object
 */
export interface JSImage {
    /** URI path to the image file */
    uri:        string
    /** Image caption (readable and writable) */
    caption:        string
    /** Position index in multi-image fields */
    index:      number

    /**
     * Displays the image in the device’s image viewer.
     * @example
     * var images = entry().field("productPhotos");
     * images.forEach(function(img) {
     *     log("Image caption: " + img.caption);
     *     log("Image URI: " + img.uri);
     *     img.view();
     * });
     * @see https://scripts.mementodatabase.com/script_api/fields/#view
     */
    view(): void
}
