import { Component, Input, forwardRef, Output, EventEmitter, ContentChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbcFormFieldComponent } from '../form-field';
import { AbcRadioButtonComponent } from './abc-radio-button.component';

/**
 * This component is used to render radio buttons as part of a group
 */
@Component({
	selector: 'abc-radio-group',
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => AbcRadioGroupComponent),
		multi: true
	}],
	templateUrl: './abc-radio-group.template.html',
	styleUrls: ["./abc-radio-group.style.scss"],
	encapsulation: ViewEncapsulation.None,
	preserveWhitespaces: false
})
export class AbcRadioGroupComponent extends AbcFormFieldComponent implements ControlValueAccessor {

	/**
	 * This directive retireves all the options that have been configured by the user in the template
	 * as abc-option component instances
	 */
	@ContentChildren(AbcRadioButtonComponent) radioButtonsContent: QueryList<AbcRadioButtonComponent>;

	/**
	 * This attribute decides what template to use for the input field. Currently we support three designs: 'legacy'
	 * , 'material' and 'kilo
	 */
	@Input() design?: "legacy" | "material" | "kilo" = "material";

	/**
	 * Choose the alignment of the radio buttons. By default the radio buttons are stacked horizontally.
	 */
	@Input() align: "horizontal" | "vertical" = "horizontal";

	/**
	 * When the model has changed, this event emitter is triggered to notify the parent component
	 */
	@Output() selectionChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	/**
	 * This array stores the list of radio buttons to be displayed in the group
	 */
	radioButtons: AbcRadioButtonComponent[] = [];

	/**
	 * Fetch the radio button options from the parent and subscribe for changes
	 */
	ngAfterViewInit() {
		(this.elementRef.nativeElement as HTMLElement).classList.add("abc-form-element");
		setTimeout(() => { this.radioButtons = this.radioButtonsContent["_results"]; });
		this.radioButtonsContent.changes.subscribe(() => {
			setTimeout(() => { this.radioButtons = this.radioButtonsContent["_results"]; });
		});
	}

	/**
	 * This method gets the current value of the form control
	 */
	get value() {
		return this.val;
	}

	/**
	 * Sets the value of the form control
	 */
	set value(val: any) {
		this.val = val;
		this.service.removeRoleAlert(this.id);
		this.service.addRoleAlert(this.id);
		this.onChange(this.val);
		this.onTouched();
	}

	/**
	 * Writes the value to the form control when passed from the parent
	 * @param value 
	 */
	writeValue(value: any): void {
		this.value = value;
	}

	/**
	 * This method emits an event whenever the user's selection has changed
	 * @param model 
	 */
	modelChanged(model: boolean): void {
		if (!this.disabled && !this.control.disabled) {
			this.selectionChange.emit(model);
		}
	}

	/**
	 * This method is called when the form element is focussed.
	 * @param index 
	 */
	focusRadioButton(index: number): void {
		if (!this.disabled && !this.control.disabled) {
			this.radioButtons[index].focussed = true;
			this.radioButtons[index].blurred = false;
		}
	}

	/**
	 * This method is called when the form element is blurred.
	 * @param index 
	 */
	blurRadioButton(index: number): void {
		this.radioButtons[index].focussed = false;
		this.radioButtons[index].blurred = true;
	}
}