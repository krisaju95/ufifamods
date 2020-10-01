import { Component, Input, ElementRef, Output, EventEmitter, TemplateRef, Injector, ComponentRef } from "@angular/core";
import { AbcService, AbcFormFieldAffix, screenReaderClass, icons, translations, AbcDtmData } from '../../utils';
import { FormControl, NgControl, NgModel } from '@angular/forms';
import { AbcOverlay, AbcOverlayComponent } from '../../utils/abc-overlay.component';
import { TranslateService } from '@ngx-translate/core';

/**
 * This is the base component that all form field components inherit from. It contains
 * properties that are commonly used by all form elements
 */
@Component({
	selector: "abc-form-field",
	template: ``
})
export class AbcFormFieldComponent {

	/**
	 * Input bunding to fetch the control name for this form-field
	 */
	@Input() formControlName: string;

	/**
	 * This stores the value which will be bound to the form control. If there is any value which needs to be pre-filled
	 */
	@Input("value") val: any;

	/**
	 * Pass a string which will be used as the unique identifier for this HTML element. If you do
	 * not pass any value, a randomly generated ID will be attached to the form field element.
	 */
	@Input() id?: string = this.service.generateElementID();

	/**
	 * Pass a string which will be used as the label for the input field. In case of legacy design, the
	 * label will be used by default as the placeholder as well. In case of material design, if there is
	 * no label passed, the form field will have appropriate behaviour for animations without any
	 * floating label
	 */
	@Input() label?: string = "";

	/**
	 * Pass a string which will be used as the name attribute for this form field. It helps in binding
	 * label elements to the input field.
	 */
	@Input() name: string;

	/**
	 * Pass a text-transform value if the input field needs to have a particular text case
	 */
	@Input() textTransform: "none" | "uppercase" | "lowercase" | "capitalize" = "none";

	/**
	 * This is the form control object which is used to the heavy lifting of determining whether the given input is
	 * invalid. It maintains the full set of attributes of the form control
	 */
	@Input() control?: FormControl | NgControl | NgModel = new FormControl();

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
	 * If any element needs to be displayed as a prefix within the form-field, pass it as a prefix
	 */
	@Input() prefix: AbcFormFieldAffix;

	/**
	 * If any element needs to be displayed as a suffix within the form-field, pass it as a suffix
	 */
	@Input() suffix: AbcFormFieldAffix;

	/**
	 * If any element needs to be displayed as a prefix within the form-field, pass it as a prefix
	 */
	@Input() inlinePrefix: AbcFormFieldAffix;

	/**
	 * If you want the input to be displayed in a different format that what was entered, pass an ng-template reference
	 * with the required display content
	 */
	@Input() displayFormattedInput: TemplateRef<any>;

	/**
	 * This variable stores the first touch state of the input field. If the user has touched the field through any form of
	 * interaction at least once, then this value will be set to true. Once this value is set to true, it will never change back
	 * to false.
	 */
	@Input() touched: boolean = false;

	/**
	 * This parameter should be set as true if the form-field needs to be appear as disabled.
	 */
	@Input() disabled: boolean = false;

	/**
	 * This parameter should be set as true if the form-field needs to be appear as a read only field.
	 */
	@Input() readOnly: boolean = false;

	/**
	 * Pass a string which will be used as a hint message. This is displayed to the user as long as the form field
	 * is not in an invalid state
	 */
	@Input() hint: string = "";

	/**
	 * Pass a string which will be used as an error message. This is displayed to the user in case the control
	 * has invalid status
	 */
	@Input() error: string = "";

	/**
	 * Stores the text-direction of the application. This is used to detect orientation for languages like
	 * Arabic where the language is written and read from right to left.
	 */
	@Input() textDirection: "ltr" | "rtl" = this.service.getTextDirection();

	/**
	 * If you want the background to be faded with a translucent overlay whenever this element is in focus, then set this to true
	 */
	@Input() showHighlightOverlay: boolean = false;

	/**
	 * If you wish to handle the error display with custom logic, then pass this parameter as true and the error message will not
	 * be displayed. The screen-readers will still pick up the message if available.
	 */
	@Input() hasSubscript: boolean = true;

	/**
	 * Pass a custom aria-label if you want the form element to read out a more descriptive label that the one displayed
	 */
	@Input() ariaLabel: string = "";

	/**
	 * This interface is used for passing analytics data
	 */
	@Input() DTM: AbcDtmData;

	/**
	 * This emits the standard blur event to the parent so if there"s any action to be performed when the user blurs the form,
	 * it can be bound to this event.
	 */
	@Output() blur: EventEmitter<Event> = new EventEmitter<Event>();

	/**
	 * This emits the standard focus event to the parent so if there"s any action to be performed when the user focusses on the
	 * form, it can be bound to this event.
	 */
	@Output() focus: EventEmitter<Event> = new EventEmitter<Event>();

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
	 * When you set the form field to e highlighted by overlaying/fading the background, the created overlay is stored in this
	 * attribute of the component (refer to showHighlightOverlay)
	 */
	highlightOverlayRef: ComponentRef<AbcOverlayComponent>;

	/**
	 * This string stores the class used to determine screen reader elements. It ensures that elements is not
	 * visible to regular users but is still picked up assisstive technology.
	 */
	screenReaderClass: string = screenReaderClass;

	/**
	 * This stores the list of common i18n resource keys used accross the application
	 */
	translations: any = translations;

	/**
	 * This stores the set of icon font classes used in the components
	 */
	icons: any = icons;

	/**
	 * Override method definition for onChange, used to implement the ControlValueAccessor interface
	 */
	onChange: any = () => { };

	/**
	 * Override method definition for onTouched, used to implement the ControlValueAccessor interface
	 */
	onTouched: any = () => { };

	/**
	 * @ignore
	 * @param elementRef 
	 * @param service 
	 * @param abcOverlay 
	 * @param translate 
	 * @param injector 
	 */
	constructor(
		public elementRef: ElementRef,
		public service: AbcService,
		public abcOverlay: AbcOverlay,
		public translate: TranslateService,
		public injector: Injector
	) { }

	/**
	 * Set the form control
	 */
	ngOnInit() {
		this.setNgControl();
	}

	/**
	 * This method fetches the form control or ngModel reference from the parent container
	 */
	setNgControl(): void {
		try {
			this.control = this.injector.get(NgControl) || new FormControl();
		} catch (error) {
			this.control = new FormControl();
		}
	}

	/**
	 * This registers the onChange function to the form control.
	 * @param fn 
	 */
	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	/**
	 * This registers the onTouch function to the form control.
	 * @param fn 
	 */
	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	/**
	 * This is used to set the form control as enabled/disabled
	 * @param isDisabled 
	 */
	setDisabledState(isDisabled: boolean) {
		this.disabled = isDisabled;
	}

	/**
	 * This method is called when the form element is focussed.
	 * @param _event 
	 */
	focusElement(_event: Event): void {
		if (!this.disabled && !this.control.disabled) {
			this.focussed = true;
			this.blurred = false;
			this.element && this.element.focus();
			this.focus.emit();
		}
	}

	/**
	 * This method is called when the form element is blurred.
	 * @param _event 
	 */
	blurElement(_event: Event): void {
		this.onTouched();
		this.touched = true;
		this.focussed = false;
		this.blurred = true;
		this.blur.emit();
	}
}