import { Component, Input } from '@angular/core';

@Component({
	selector: 'wa-option',
	template: ``
})
export class WAOptionComponent {

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