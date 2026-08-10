/**
 * @see https://scripts.mementodatabase.com/script_api/fields/
 */

import { Entry } from "../entries";

/**
 * Represents an image stored in an Image field.
 * @see https://scripts.mementodatabase.com/script_api/fields/#jsimage-object
 */
export interface JSImage {
  /** URI path to the image file */
  uri: string;
  /** Image caption (readable and writable) */
  caption: string;
  /** Position index in multi-image fields */
  index: number;

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
  view(): void;
}

export type Text = string;
export type Integer = number;
export type Currency = number;
export type Boolean = boolean;
export type Date = string;
export type Time = string;
export type DateTime = string;
export type Image = JSImage[];
export type Calculation<T extends Integer | Date | DateTime | string> = T
export type Javascript<T> = T;
export type SingleChoice<T> = T;
export type MultipleChoice<T> = T;
export type LinkToEntry<T> = Entry<T>[];
// export type Image = JSImage;
// export type Image = JSImage;
