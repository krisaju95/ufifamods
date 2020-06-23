import { Component, Input, forwardRef, ElementRef, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { WAFormElementsService } from '../common';

@Component({
	selector: 'wa-radio-button',
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => WARadioButtonComponent),
		multi: true
	}],
	templateUrl: './wa-radio-button.template.html',
	preserveWhitespaces: false
})
export class WARadioButtonComponent implements ControlValueAccessor {

	constructor(
		private elementRef: ElementRef,
		private service: WAFormElementsService
	) { }

	/**
	 * This stores the value which will be bound to the form control. If there is any value which needs to be pre-filled
	 */
	@Input('modelValue') val: boolean;

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
	 * If you need a more complex label, (say with links embedded within), then pass an ng-template to be rendered
	 * instead of the normal label
	 */
	@Input() labelTemplate: TemplateRef<any>;

	/**
	 * Pass the value associated to the radio button
	 */
	@Input() value: string = "";

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
	 * This variable stores the first touch state of the input field. If the user has touched the field through any form of
	 * interaction at least once, then this value will be set to true. Once this value is set to true, it will never change back
	 * to false.
	 */
	@Input() touched: boolean = false;

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
	@Output() selectionChange: EventEmitter<boolean> = new EventEmitter<boolean>();

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
	 * Override method definition for onChange, used to implement the ControlValueAccessor interface
	 */
	onChange: any = () => { };

	/**
	 * Override method definition for onTouched, used to implement the ControlValueAccessor interface
	 */
	onTouched: any = () => { };

	ngAfterViewInit() {
		this.element = this.elementRef.nativeElement.querySelector('input');
	}

	get modelValue() {
		return this.val;
	}

	set modelValue(val: any) {
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
		this.modelValue = value;
	}

	focusElement(_event: Event): void {
		this.focussed = true;
		this.blurred = false;
		this.element.focus();
	}

	blurElement(_event: Event): void {
		this.touched = true;
		this.focussed = false;
		this.blurred = true;
		this.blur.emit();
	}

	modelChanged(model: boolean): void {
		this.selectionChange.emit(model);
	}
}