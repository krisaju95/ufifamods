import { Component } from "@angular/core";
import { AbcRadioButtonComponent } from '../form-elements/radio-button/abc-radio-button.component';

/**
 * This is a base component created to fetch individual toggle options from the
 * parent container
 */
@Component({
	selector: "abc-toggle-option",
	template: ``
})
export class AbcToggleOptionComponent extends AbcRadioButtonComponent { }