import { Component, Input, forwardRef, Output, EventEmitter } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AbcFormFieldComponent } from '../form-field';

/**
 * This component renders checkbox form fields
 */
@Component({
	selector: "abc-checkbox",
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => AbcCheckboxComponent),
		multi: true
	}],
	templateUrl: "./abc-checkbox.template.html",
	styleUrls: ["./abc-checkbox.style.scss"],
	preserveWhitespaces: false
})
export class AbcCheckboxComponent extends AbcFormFieldComponent implements ControlValueAccessor {

	/**
	 * This attribute decides what template to use for the check-box. Currently we support the following designs:
	 * "legacy", "material" and "kilo".
	 */
	@Input() design?: "legacy" | "material" | "kilo" = "material";

	/**
	 * When the model has changed, this event emitter is triggered to notify the parent component
	 */
	@Output() selectionChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	/**
	 * Set the element ref and the aria-label
	 */
	ngAfterViewInit() {
		this.element = this.elementRef.nativeElement.querySelector("input");
		(this.elementRef.nativeElement as HTMLElement).classList.add("abc-form-element");
	}

	/**
	 * This method gets the current value of the form control
	 */
	get value() {
		return this.val;
	}

	/**
	 * Sets a value to the form control
	 */
	set value(val: any) {
		this.val = val;
		this.service.removeRoleAlert(this.id);
		this.service.addRoleAlert(this.id);
		this.onChange(this.val);
		this.onTouched();
	}

	/**
	 * Writes a value to the form control when passed from the parent
	 * @param value 
	 */
	writeValue(value: any): void {
		this.value = value;
		this.touched = this.touched || (!!value && this.focussed);
	}

	/**
	 * This method is called whenever the user changes the model value for the check-box.
	 * @param model the updated model value
	 */
	modelChanged(model: boolean): void {
		this.selectionChange.emit(model);
	}
}