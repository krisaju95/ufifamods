import { Component, Input, forwardRef, ElementRef, Output, EventEmitter, HostBinding, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { WAFormElementsService } from '../common';

@Component({
	selector: 'wa-checkbox',
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => WACheckboxComponent),
		multi: true
	}],
	templateUrl: './wa-checkbox.template.html',
	preserveWhitespaces: false
})
export class WACheckboxComponent implements ControlValueAccessor {

	constructor(
		private elementRef: ElementRef,
		private service: WAFormElementsService
	) { }

	/**
	 * This adds a class to the selector of this component. This class ensures that any global CSS
	 * we may have written for form fields does not override our custom CSS for this component.
	 * Specifically, this helps in avoiding issues where the height, color and border of the field
	 * gets changes due to global CSS.
	 */
	@HostBinding() class: string = "wa-pseudo-form-element";

	/**
	 * This stores the value which will be bound to the form control. If there is any value which needs to be pre-filled
	 */
	@Input('value') val: boolean;

	/**
	 * Pass a string which will be used as the unique identifier for this HTML element. If you do
	 * not pass any value, a randomly generated ID will be attached to the form field element.
	 */
	@Input() id?: string = this.service.generateFormFieldID();;

	/**
	 * Pass a string which will be used as the label for the input field. In case of legacy design, the
	 * label will be used by default as the placeholder as well. In case of material design, if there is
	 * no label passed, the form field will have appropriate behaviour for animations without any
	 * floating label
	 */
	@Input() label?: string = "";

	/**
	 * If you need a more complex label, (say with links embedded within), then pass an ng-template to be rendered
	 * instead of the normal label
	 */
	@Input() labelTemplate: TemplateRef<any>;

	/**
	 * This attribute decides what template to use for the input field. Currently we support three designs: 'legacy'
	 * , 'material' and 'kilo
	 */
	@Input() design?: string = "material";

	/**
	 * Going forward, if we create multiple versions of the same design, having (say) some CSS specific differences
	 * in the appearance, or some minor variations in the logical behaviour, we can pass this optional identifier
	 */
	@Input() designModifier: string;

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
	 * Pass this parameter as true if you want to disable the check-box
	 */
	@Input() disabled: boolean = false;

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
	 * This emits the standard blur event to the parent so if there's any action to be performed when the user blurs the form,
	 * it can be bound to this event.
	 */
	@Output() blur: EventEmitter<void> = new EventEmitter<void>();

	/**
	 * This emits the standard focus event to the parent so if there's any action to be performed when the user focusses on the
	 * form, it can be bound to this event.
	 */
	@Output() focus: EventEmitter<void> = new EventEmitter<void>();

	/**
	 * When the model has changed, this event emitter is triggered to notify the parent component
	 */
	@Output() inputChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

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
	 * The text which is used as the aria-label attribute for the select dropdown. Used for screen readers.
	 */
	ariaLabel: string = this.label;

	/**
	 * Override method definition for onChange, used to implement the ControlValueAccessor interface
	 */
	onChange: any = () => { };

	/**
	 * Override method definition for onTouched, used to implement the ControlValueAccessor interface
	 */
	onTouched: any = () => { };

	ngAfterViewInit() {
		this.element = this.elementRef.nativeElement.querySelector('input');
		this.setAriaLabel();
	}

	get value() {
		return this.val;
	}

	set value(val: any) {
		this.val = val;
		this.service.removeRoleAlert(this.id);
		this.service.addRoleAlert(this.id);
		this.onChange(this.val);
		this.onTouched();
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	writeValue(value: any): void {
		this.value = value;
		this.touched = this.touched || (!!value && this.focussed);
	}

	focusElement(_event: Event): void {
		this.focussed = true;
		this.blurred = false;
		this.element.focus();
		this.focus.emit();
	}

	blurElement(_event: Event): void {
		this.touched = true;
		this.focussed = false;
		this.blurred = true;
		this.blur.emit();
	}

	/**
	 * This method is used to generate the aria-label value for the drop-down
	 */
	setAriaLabel(): void {
		setTimeout(() => {
			this.ariaLabel = this.label.replace(/<\/?[^>]+(>|$)/g, "");
		}, 500);
	}

	modelChanged(model: boolean): void {
		this.inputChanged.emit(model);
	}
}