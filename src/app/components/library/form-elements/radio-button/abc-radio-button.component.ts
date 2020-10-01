import { Component, Input, TemplateRef } from "@angular/core";
import { AbcDtmData } from "../../utils";

/**
 * This is a base component created in order to pass individual radio button options
 * to the radio group component
 */
@Component({
	selector: "abc-radio-button",
	template: ``
})
export class AbcRadioButtonComponent {

	/**
	 * Pass the unique id of the radio button. If left empty, a default ID will be generated.
	 */
	@Input() id: string;

	/**
	 * Unique identifier for each option. This is bound to the model or
	 * form control
	 */
	@Input() value: string;

	/**
	 * This is the text displayed for a given radio button
	 */
	@Input() label: string;

	/**
	 * This is the text used by screen readers to identify an option
	 */
	@Input() ariaLabel: string;

	/**
	 * If you need a more complex label, (say with links embedded within), then pass an ng-template to be rendered
	 * instead of the normal label
	 */
	@Input() template: TemplateRef<any>;

	/**
	 * This parameter determines if the radio button is disabled
	 */
	@Input() disabled: boolean = false;

	/**
	 * This interface is used for passing analytics data
	 */
	@Input() DTM: AbcDtmData;

	/**
	 * This determines whether the radio button is focussed
	 */
	public focussed: boolean = false;

	/**
	 * This determines whether the radio button is blurred
	 */
	public blurred: boolean = true;
}