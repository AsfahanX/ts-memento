/**
 * @see https://scripts.mementodatabase.com/script_api/fields/
 */

import { Entry } from "../entries";

/**
 * Represents a contact stored in a Contact field.
 * Provides access to contact information and communication methods.
 * @see https://scripts.mementodatabase.com/script_api/fields/#jscontact-object
 */
export interface JSContact {
  /** The contact’s full name */
  fullName: string;
  /** Primary phone number */
  phone: string;
  /** Primary email address */
  email: string;
  /** Indicates if there are more contacts in the field */
  hasNext: boolean;
  /** Reference to the next contact in multi-contact fields */
  next: JSContact;

  /**
   * Initiates a phone call to the contact’s primary phone number.
   * @example
   * var contact = entry().field("businessContact");
   * if (contact.phone) {
   *     contact.call();
   *     log("Calling " + contact.fullName);
   * }
   * @see https://scripts.mementodatabase.com/script_api/fields/#call
   */
  call(): void;

  /**
   * Sends an email to the contact’s primary email address.
   * @param subject Email subject line
   * @param message Email body content
   * @example
   * var contact = entry().field("customerContact");
   * contact.sendEmail("Order Confirmation", "Your order has been processed.");
   * log("Email sent to " + contact.email);
   * @see https://scripts.mementodatabase.com/script_api/fields/#sendemailsubject-message
   */
  sendEmail(subject: string, message: string): void;

  /**
   * Sends an SMS text message to the contact’s primary phone number.
   * @param message Text message content
   * @example
   * var contact = entry().field("teamMember");
   * contact.sendSMS("Meeting reminder for tomorrow");
   * log("SMS sent to " + contact.phone);
   * @see https://scripts.mementodatabase.com/script_api/fields/#sendsmsmessage
   */
  sendSMS(message: string): void;

  /**
   * Opens the device’s contact app displaying this contact’s details.
   * @example
   * var contact = entry().field("clientContact");
   * contact.show();
   * log("Showing contact details for " + contact.fullName);
   * @see https://scripts.mementodatabase.com/script_api/fields/#show
   */
  show(): void;
}

/**
 * Represents a geographical location stored in a Location field.
 * Provides access to coordinates and address information.
 * @example
 * var e = entry();
 * var location = e.field("myLocation");
 *
 * // Extract coordinates to separate fields
 * e.set("LocationLatitude", location.lat);
 * e.set("LocationLongitude", location.lng);
 *
 * log("Location coordinates: " + location.lat + ", " + location.lng);
 * log("Address: " + location.address);
 * @see https://scripts.mementodatabase.com/script_api/fields/#jsgeolocation-object
 */
export interface JSGeolocation {
  /** Formatted address of the location */
  address: string;
  /** Latitude coordinate */
  lat: number;
  /** Longitude coordinate */
  lng: number;
  /** Indicates if there are more locations in the field */
  hasNext: boolean;
  /** Reference to the next location in multi-location fields */
  next: JSGeolocation;
}

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
export type Calculation<T extends Integer | Date | DateTime | string> = T;
export type Javascript<T> = T;
export type SingleChoice<T> = T;
export type MultipleChoice<T> = T;
export type LinkToEntry<T = unknown> = Entry<T>[];
export type Lookup<L, F extends keyof L> = L[F];
export type Barcode = string;
// export type Image = JSImage;
// export type Image = JSImage;
