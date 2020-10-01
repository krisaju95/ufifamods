import { Component, Input, forwardRef, Output, EventEmitter, ViewEncapsulation } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AbcFormFieldErrorData } from "../../utils";
import { AbcFormFieldComponent } from '../form-field';

/**
 * This component renders input fields
 */
@Component({
	selector: "abc-input",
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => AbcInputComponent),
		multi: true
	}],
	templateUrl: "./abc-input.template.html",
	styleUrls: [
		"./abc-input.style.scss",
		"../../styles/abc-common.scss",
		"../styles/abc-form-element.label.scss",
		"../styles/abc-form-element.underline.scss",
		"../styles/abc-form-element.appearances.scss",
		"../styles/abc-form-element.affix.scss"
	],
	encapsulation: ViewEncapsulation.None
})
export class AbcInputComponent extends AbcFormFieldComponent implements ControlValueAccessor {

	/**
	 * This is an optional field which will be used as the placeholder of the input field. In case of legacy
	 * design, if there is no placeholder passed, the label value is used by default.
	 */
	@Input() placeholder?: string = "";

	/**
	 * This attribute determines whether the input field is a text field, number field, email field, password
	 * field etc. By default, this value is taken as string.
	 */
	@Input() type?: "text" | "number" | "password" | "tel" = "text";

	/**
	 * This attribute decides what template to use for the input field.
	 */
	@Input() design?: "material" = "material";

	/**
	 * If there are multiple variations for a given design, this parameter can handle it. For example, in Material design, we
	 * have multiple variations for the input form like "standard", "borderless" etc. "standard" has a border around the form field.
	 * "borderless" just has the underline below the form, but no border around it. you can configure more variations if required using
	 * this parameter. the default value is "standard".
	 */
	@Input() appearance: "standard" | "borderless" | "condensed" = "standard";

	/**
	 * Determines the minimum number of characters allowed in the input field
	 */
	@Input() minlength?: number;

	/**
	 * Determines the maximum number of characters allowed in the input field
	 */
	@Input() maxlength?: number;

	/**
	 * If the input field should only allow a particular set of characters, pass the regular expression
	 * as acceptedCharacters
	 */
	@Input() acceptedCharacters?: string;

	/**
	 * Pass a string value which will be used to update the value in the form which will be used to determine when the
	 * input value needs to be updated in the form control. Currently supported values are "keyup" & "submit". When we use "blur",
	 * all the models get updated only once the user tabs out of the field."keyup" mode forces the form field to push the updated
	 * value as and when the user types a character into the field.
	 */
	@Input() updateOn?: string = "keyup";

	/**
	 * This determines whether to display a "cross" button which allows the user to clear their current input
	 */
	@Input() showInputClearButton: boolean = false;

	/**
	 * Use this as an alternative to the error parameter when dealing with large number of validators assigned to a form
	 * control. This parameter accepts an object with either a "keys" attribute, or a "prefix" attribute (ether, not both).
	 * If you use the keys attribute, you need to pass a map which contains all the form controls with each of their
	 * possible error states and the associated resource keys to use. If you choose to avoid writing resource key
	 * maps, you can use this component"s in-built logic for auto-generating resource keys by providing the desired
	 * prefix string to be used for generating the keys. The keys will be created in the format given below.
	 * 
	 * NOTE: This should be used only when working with reactive forms.
	 * 
	 * <errorData.prefix>.<formControlName>_<errorType>.error
	 */
	@Input() errorData: AbcFormFieldErrorData;

	/**
	 * When the model has changed, this event emitter is triggered to notify the parent component
	 */
	@Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * Should leading and trailing white spaces be removed from the model when the user blurs the field
	 */
	@Input() trimInputOnBlur: boolean = true;

	/**
	 * This stores the input field type for scenarios when it's changed within the component (For example, the
	 * pass-word hide/show toggle changes the type to 'text' from 'password')
	 */
	currentType: string = this.type;

	/**
	 * This stores the value that the user has currently entered. Based on the value of updateOn, this value is bound the model.
	 */
	typed: string = "";

	/**
	 * This stores the appearance class(es) for the form field
	 */
	appearanceClass: string = "";

	/**
	 * This determines whether the component should be allowed to write a new value. This is useful when the form is set to
	 * update on blur. It helps to determine whether the value is being updated from the parent form or manually by the user.
	 */
	allowWriteValue: boolean = false;

	/**
	 * Set the type of input and the appearance class string
	 */
	ngOnChanges() {
		this.updateErrorText();
		
		this.currentType = this.type;

		// Set default value for design appearance
		this.appearanceClass = this.service.generateAppearanceClass(this.design, this.appearance);
	}

	/**
	 * Fetch the form control from the parent container and set the type of input and appearance
	 * class string
	 */
	ngOnInit() {
		this.setNgControl();

		this.updateErrorText();

		this.currentType = this.type;

		// Set default value for design appearance
		this.appearanceClass = this.service.generateAppearanceClass(this.design, this.appearance);
	}

	/**
	 * Stores a reference to the HTML Input element
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
	 * This method sets a value to the form control
	 */
	set value(val: any) {
		this.typed = val;
		this.setValue();
	}

	/**
	 * This method writes the value to the form control when it is changed by
	 * the parent
	 * @param value 
	 */
	writeValue(value: any): void {
		this.allowWriteValue = true;
		this.value = value;
		this.typed = value;
		this.touched = this.touched || (!!value && this.focussed);
	}

	/**
	 * This method sets a value to the form control. It checks that the control
	 * is not disabled and also writes the value only if the field is not set to update
	 * on blur or the attribute "allowWriteValue" is explicitly set to true
	 */
	setValue() {
		if (this.allowWriteValue || (this.updateOn == "keyup"
			&& !this.disabled && !this.control.disabled && !this.readOnly)) {
			this.service.removeRoleAlert(this.id);
			this.allowWriteValue = false;
			this.val = this.typed;
			this.onChange(this.typed);
			this.onTouched();
			this.updateErrorText();
			this.service.addRoleAlert(this.id);
		}
	}

	/**
	 * Thsi method is called when the form element is focussed
	 * @param event 
	 */
	focusElement(event: Event): void {
		if (!this.disabled && !this.control.disabled) {
			this.focussed = true;
			this.blurred = false;
			this.element.focus();
			this.focus.emit(event);
			if (this.showHighlightOverlay && !this.highlightOverlayRef && this.appearance != "borderless") {
				this.highlightOverlayRef = this.abcOverlay.showElementFocusHighlightOverlay(this.elementRef.nativeElement.querySelector(".abc-form-element-wrapper"));
			}
		}
	}

	/**
	 * Thsi method is called when the form element is blurred
	 * @param event 
	 */
	blurElement(event: Event): void {
		this.touched = true;
		this.focussed = false;
		this.blurred = true;
		this.blur.emit(event);
		if (!this.disabled && !this.control.disabled && !this.readOnly) {
			this.typed = this.trimInputOnBlur ? (this.typed || "").trim() : this.typed;
			this.allowWriteValue = true;
			this.setValue();
		}
		if (this.highlightOverlayRef) {
			this.abcOverlay.removeOverlay(this.highlightOverlayRef);
			this.highlightOverlayRef = null;
		}
	}

	/**
	 * This method is called when the user changes the value in the input field
	 * @param model the updated model value
	 */
	modelChanged(model: string): void {
		this.ngModelChange.emit(model);
	}

	/**
	 * This method sets the new error message resource key
	 */
	updateErrorText() {
		if (this.errorData && this.control) {
			const errorObj = this.service.getFormFieldError(this.control, this.formControlName, this.errorData);
			if (errorObj) {
				this.translate.get(errorObj.key, errorObj.params).subscribe((error: string) => {
					this.error = error;
				});
			}
		}
	}
}