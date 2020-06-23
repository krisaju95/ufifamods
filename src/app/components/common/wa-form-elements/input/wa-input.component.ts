import { Component, Input, forwardRef, ElementRef, Output, EventEmitter, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { WAFormElementsService, WAFormFieldAffix, WAFormFieldErrorData } from '../common';

@Component({
	selector: 'wa-input',
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => WAInputComponent),
		multi: true
	}],
	templateUrl: './wa-input.template.html'
})
export class WAInputComponent implements ControlValueAccessor {

	/**
	 * This adds a class to the selector of this component. This class ensures that any global CSS
	 * we may have written for form fields does not override our custom CSS for this component.
	 * Specifically, this helps in avoiding issues where the height, color and border of the field
	 * gets changes due to global CSS.
	 */
	@HostBinding() class: string = "wa-pseudo-form-element";

	/**
	 * Input bunding to fetch the control name for this form-field
	 */
	@Input() formControlName: string;

	/**
	 * This stores the value which will be bound to the form control. If there is any value which needs to be pre-filled
	 */
	@Input('value') val: string;

	/**
	 * Pass a string which will be used as the unique identifier for this HTML element. If you do
	 * not pass any value, a randomly generated ID will be attached to the form field element.
	 */
	@Input() id?: string = this.service.generateFormFieldID();

	/**
	 * Pass a string which will be used as the name attribute for this form field. It helps in binding
	 * label elements to the input field.
	 */
	@Input() name: string;

	/**
	 * Pass a string which will be used as the label for the input field. In case of legacy design, the
	 * label will be used by default as the placeholder as well. In case of material design, if there is
	 * no label passed, the form field will have appropriate behaviour for animations without any
	 * floating label
	 */
	@Input() label?: string = "";

	/**
	 * This is an optional field which will be used as the placeholder of the input field. In case of legacy
	 * design, if there is no placeholder passed, the label value is used by default.
	 */
	@Input() placeholder?: string = "";

	/**
	 * This attribute determines whether the input field is a text field, number field, email field, password
	 * field etc. By default, this value is taken as string.
	 */
	@Input() type?: string = "text";

	/**
	 * This attribute decides what template to use for the input field. Currently we support two designs: 'legacy'
	 * and 'material'
	 */
	@Input() design?: string = "material";

	/**
	 * If there are multiple variations for a given design, this parameter can handle it. For example, in Material design, we
	 * have multiple variations for the input form like "standard", "borderless" etc. "standard" has a border around the form field.
	 * "borderless" just has the underline below the form, but no border around it. you can configure more variations if required using
	 * this parameter. the default value is "standard".
	 */
	@Input() appearance: string = "standard";

	/**
	 * Pass a text-transform value if the input field needs to have a particular text case
	 */
	@Input() textTransform: string = "none";

	/**
	 * This is the form control object which is used to the heavy lifting of determining whether the given input is
	 * invalid. It maintains the full set of attributes of the form control
	 */
	@Input() control?: FormControl = new FormControl();

	/**
	 * This parameter decides whether a given form field is mandatory or not. If this value is not passed, it will be assumed
	 * as an optional field by default. Pass the value as true if you wish to make the field mandatory.
	 */
	@Input() required: boolean = false;

	/**
	 * When there is no form control being used, i.e., in the case of template-driven forms, you can use this parameter to manually decide
	 * whether the form is invalid
	 */
	@Input() invalid: boolean = false;

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
	 * as validCharacters
	 */
	@Input() validCharacters?: string;

	/**
	 * If any element needs to be displayed as a prefix within the form-field, pass it as a prefix
	 */
	@Input() prefix: WAFormFieldAffix;

	/**
	 * If any element needs to be displayed as a suffix within the form-field, pass it as a suffix
	 */
	@Input() suffix: WAFormFieldAffix;

	/**
	 * Pass a string value which will be used to update the value in the form which will be used to determine when the
	 * input value needs to be updated in the form control. Currently supported values are 'keyup' & 'submit'. When we use 'blur',
	 * all the models get updated only once the user tabs out of the field.'keyup' mode forces the form field to push the updated
	 * value as and when the user types a character into the field.
	 */
	@Input() updateOn?: string = "keyup";

	/**
	 * This variable stores the first touch state of the input field. If the user has touched the field through any form of
	 * interaction at least once, then this value will be set to true. Once this value is set to true, it will never change back
	 * to false.
	 */
	@Input() touched: boolean = false;

	/**
	 * Pass a string which will be used as an error message. This is displayed to the user in case the control
	 * has invalid status
	 */
	@Input() error: string = "";

	/**
	 * Use this as an alternative to the error parameter when dealing with large number of validators assigned to a form
	 * control. This parameter accepts an object with either a 'keys' attribute, or a 'prefix' attribute (ether, not both).
	 * If you use the keys attribute, you need to pass a map which contains all the form controls with each of their
	 * possible error states and the associated resource keys to use. If you choose to avoid writing resource key
	 * maps, you can use this component's in-built logic for auto-generating resource keys by providing the desired
	 * prefix string to be used for generating the keys. The keys will be created in the format given below.
	 * 
	 * NOTE: This should be used only when working with reactive forms.
	 * 
	 * <errorData.prefix>.<formControlName>_<errorType>.error
	 */
	@Input() errorData: WAFormFieldErrorData;

	/**
	 * This emits the standard blur event to the parent so if there's any action to be performed when the user blurs the form,
	 * it can be bound to this event.
	 */
	@Output() blur: EventEmitter<Event> = new EventEmitter<Event>();

	/**
	 * This emits the standard focus event to the parent so if there's any action to be performed when the user focusses on the
	 * form, it can be bound to this event.
	 */
	@Output() focus: EventEmitter<Event> = new EventEmitter<Event>();

	/**
	 * When the model has changed, this event emitter is triggered to notify the parent component
	 */
	@Output() inputChanged: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * This stores the value that the user has currently entered. Based on the value of updateOn, this value is bound the model.
	 */
	typed: string = '';

	/**
	 * This variable stores the HTML element reference of the input field
	 */
	element: HTMLInputElement;

	/**
	 * This variable stores the focus state of the input field. If the input field is currently focussed on, then this value
	 * will be true, else false.
	 */
	focussed: boolean = false;

	/**
	 * This variable stores the focus state of the input field. If the input field is not currently focussed on, then this value
	 * will be true, else false.
	 */
	blurred: boolean = true;

	/**
	 * This determines whether the form was initialized with it's first ever value. This could be the pre-filled value passed
	 * during form initialization, or just a blank string for starters.
	 */
	initialized: boolean = false;

	/**
	 * Override method definition for onChange, used to implement the ControlValueAccessor interface
	 */
	onChange: any = () => { };

	/**
	 * Override method definition for onTouched, used to implement the ControlValueAccessor interface
	 */
	onTouched: any = () => { };

	constructor(
		private elementRef: ElementRef,
		private service: WAFormElementsService
	) { }

	ngOnInit() {
		// Set default value for design appearance
		this.appearance = this.service.generateAppearanceClass(this.design, this.appearance);
	}

	ngAfterViewInit() {
		this.element = this.elementRef.nativeElement.querySelector('input');
	}

	get value() {
		return this.val;
	}

	set value(val: any) {
		this.typed = val;
		this.service.removeRoleAlert(this.id);
		if (!this.initialized || this.updateOn == 'keyup') {
			this.initialized = true;
			this.setValue();
			this.service.addRoleAlert(this.id);
		}
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	writeValue(value: any): void {
		this.value = value;
		this.typed = value;
		this.touched = this.touched || (!!value && this.focussed);
	}

	setValue() {
		this.val = this.typed;
		this.onChange(this.typed);
		this.onTouched();
	}

	focusElement(event: Event): void {
		this.focussed = true;
		this.blurred = false;
		this.element.focus();
		this.focus.emit(event);
	}

	blurElement(event: Event): void {
		if (this.updateOn == 'blur') { this.setValue(); }
		this.touched = true;
		this.focussed = false;
		this.blurred = true;
		this.blur.emit(event);
	}

	modelChanged(model: string): void {
		this.inputChanged.emit(model);
	}
}