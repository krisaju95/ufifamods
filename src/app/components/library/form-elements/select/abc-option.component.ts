import { Component, Input, TemplateRef } from "@angular/core";

/**
 * This is the base component used to pass individual drop-down options
 * to the drop-down component
 */
@Component({
	selector: "abc-option",
	template: ``
})
export class AbcOptionComponent {

	/**
	 * Set custom classes to the drop-down option. This only gets applied for the custom
	 * drop-down, not for native drop-downs
	 */
	@Input() class: string;

	/**
	 * Unique identifier for each option. This is bound to the model or
	 * form control
	 */
	@Input() value: string;

	/**
	 * This is the text displayed for a given option in the opions panel
	 */
	@Input() text: string;

	/**
	 * If you wish to display a more complex layout for your individual options. Make sure
	 * to pass the "text" field for the native drop-down fall back. Keep in mind that if you're
	 * using template, you won't be able to use the affix input paramters. You'll have to add
	 * those manually
	 */
	@Input() template: TemplateRef<any>;

	/**
	 * This parameter determines if the option is disabled
	 */
	@Input() disabled: boolean = false;

	/**
	 * If the options need to be displayed with an icon prefix, pass the class of
	 * the icon in this parameter
	 */
	@Input() prefixIcon?: string;

	/**
	 * If an image needs to be displayed along with each option, pass the image URL
	 * in this parameter
	 */
	@Input() prefixImage?: string;

	/**
	 * If the options need to be displayed with an icon suffix, pass the class of
	 * the icon in this parameter
	 */
	@Input() suffixIcon?: string;

	/**
	 * If an image needs to be displayed along with each option, pass the image URL
	 * in this parameter
	 */
	@Input() suffixImage?: string;
}