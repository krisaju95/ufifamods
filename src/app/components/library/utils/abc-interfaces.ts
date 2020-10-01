import { TemplateRef } from '@angular/core';

/**
 * This interface is used for form field prefixes and suffixes
 */
export interface AbcFormFieldAffix {
    /**
     * If you're using an image, pass the src attribute here
     */
    imageSrc?: string;

    /**
     * Pass the alt tag for the image here
     */
    imageAlt?: string;

    /**
     * If you're using an icon, pass the identifier/class for that icon
     */
    icon?: string;

    /**
     * If you want to render some text, pass the text here (can be HTML as well)
     */
    text?: string;

    /**
     * If you have a more complex template to render, pass it here
     */
    template?: TemplateRef<any>;
}

/**
 * This interface is used when passing error handling data to form controls. Pass either keys
 * of prefix. If you have an object of keys to be used for each type of error, then pass that
 * as keys. If you'd like to let the component generate it's own keys, you can pass the prefix
 * which is used as the first part of the resource key.
 * 
 * METHOD 1:
 * ---------
 * To use prefix, you can pass some string to use as the prefix of the error keys. All keys will
 * be generated in the format given below:
 * 
 * <prefix>.<error type>_<key>.error
 * 
 * For example: abc.firstName_required.error
 * 
 * METHOD 2:
 * ---------
 * The keys object needs to be of the following format:
 * 
 * {
 *      "<control name>": {
 *          "<error type>": "<key>",
 *          "<error type>": "<key>"
 *      }
 * }
 * 
 * For example:
 * 
 * {
 *      "firstName": {
 *          "required": "abc.firstName_required.error",
 *          "minLength": "abc.minLength_required.error"
 *      }
 * }
 */
export interface AbcFormFieldErrorData {

    /**
     * Pass this when you want the form control to render a pre-defined set of resource
     * keys as error messages
     */
    keys?: any;

    /**
     * Pass this prefix when you want the form control to auto-generate resource keys
     * for the error messages
     */
    prefix?: string;
}

/**
 * This interface is used for passing analytics data
 */
export interface AbcDtmData {
	/**
	 * Used to set the attribute data-analytics-track
	 */
	track?: string;

	/**
	 * Used to set the attribute data-analytics-val
	 */
	val?: string;
}