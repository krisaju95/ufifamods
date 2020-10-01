import { Component, Input, forwardRef, Output, EventEmitter, ContentChildren, QueryList, HostListener } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AbcToggleOptionComponent } from "./abc-toggle-option.component";
import { AbcFormFieldComponent } from '../form-elements';

/**
 * This component is used to render toggle switches
 */
@Component({
	selector: "abc-toggle",
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => AbcToggleComponent),
		multi: true
	}],
	templateUrl: "./abc-toggle.template.html",
	styleUrls: [
		"../styles/abc-common.scss",
		"./abc-toggle.style.scss"
	],
	preserveWhitespaces: false
})
export class AbcToggleComponent extends AbcFormFieldComponent implements ControlValueAccessor {

	/**
	 * This directive retireves all the options that have been configured by the user in the template
	 * as abc-option component instances
	 */
	@ContentChildren(AbcToggleOptionComponent) toggleOptionsContent: QueryList<AbcToggleOptionComponent>;

	/**
	 * This stores the value which will be bound to the form control. If there is any value which needs to be pre-filled
	 */
	@Input("modelValue") val: any;

	/**
	 * Pass a string which will be used as the unique identifier for this HTML element. If you do
	 * not pass any value, a randomly generated ID will be attached to the form field element.
	 */
	@Input() id?: string = this.service.generateElementID();

	/**
	 * Pass a string which will be used as the name attribute for this form field. It helps in binding
	 * label elements to the input field.
	 */
	@Input() name: string;

	/**
	 * This is the set of options used in the toggle
	 */
	@Input() options?: AbcToggleOptionComponent[] = [];

	/**
	 * This attribute decides what template to use for the toggle. Currently we support two
	 * designs: "default" and "kilo"
	 */
	@Input() design?: "default" | "kilo" = "default";

	/**
	 * This parameter determines whether a subscript will be displayed with this toggle. This includes
	 * error messages or hints. This is more to add the placeholder space for the sub-script, so if this
	 * is set to false and you pass a sub-script message, it will still be displayed but will push the
	 * content below.
	 */
	@Input() hasSubscript: boolean = false;

	/**
	 * When the model has changed, this event emitter is triggered to notify the parent component
	 */
	@Output() toggled: EventEmitter<boolean> = new EventEmitter<boolean>();

	/**
	 * This stores the active option index based on the state of the toggle switch
	 */
	activeOptionIndex: number = 0;

	/**
	 * Fetch the toggle options from the parent and subscribe for changes
	 */
	ngAfterViewInit() {
		(this.elementRef.nativeElement as HTMLElement).classList.add("abc-form-element");
		this.setToggleOptions();
		this.toggleOptionsContent.changes.subscribe(() => {
			this.setToggleOptions();
		});
	}

	/**
	 * Gets the current value of the form control
	 */
	get modelValue() {
		return this.val;
	}

	/**
	 * Sets a value to the form control
	 */
	set modelValue(val: any) {
		this.val = val;
		this.setActiveOptionIndex(val);
		this.onChange(this.val);
		this.onTouched();
	}

	/**
	 * Writes a value to the form control if passed from the parent
	 * @param value 
	 */
	writeValue(value: any): void {
		this.modelValue = value;
	}

	/**
	 * Emits and event whenever the model value has changed
	 * @param model 
	 */
	modelChanged(model: boolean): void {
		this.toggled.emit(model);
	}

	/**
	 * This method is called when the user interacts with the toggle switch and the value
	 * needs to be updated. For boolean values, simply switch to the negated value of the boolean.
	 * For non-boolean (usually string) values, set the value to the model and update the active
	 * index
	 * @param _event 
	 * @param value 
	 */
	toggle(_event: Event, value?: any): void {
		if (typeof this.modelValue == "boolean") {
			this.modelValue = !this.modelValue;
		} else if (value) {
			this.modelValue = value;
			this.setActiveOptionIndex(value);
		}
		setTimeout(() => {
			const input: HTMLInputElement = this.elementRef.nativeElement.querySelector("input[aria-checked='true']") as HTMLInputElement;
			input && input.focus();
		});
	}

	/**
	 * This method sets the toggle options into the component. It also decides the number of options to display
	 * to the user based on the design. The default design supports just two options as it's the simplest form
	 * of a toggle
	 */
	setToggleOptions() {
		setTimeout(() => {
			const options: AbcToggleOptionComponent[] = this.toggleOptionsContent["_results"];
			const numberOfOptions: number = (this.design == "default") ? 2 : options.length;
			this.options = options.slice(0, numberOfOptions);
			this.setToggleOptionWidth();
			this.setActiveOptionIndex(this.modelValue);
		});
	}

	/**
	 * This method sets the current active index, i.e., the index of the active option from the
	 * list of options
	 * @param value 
	 */
	setActiveOptionIndex(value: any): void {
		if (typeof this.modelValue == "boolean") {
			this.activeOptionIndex = +value;
		} else {
			this.activeOptionIndex = this.options.findIndex((option) => {
				return option.value == value;
			});
		}
	}

	/**
	 * This method sets the width of each toggle option when using the kilo design which contains text within the labels. This
	 * is done to ensure that the options are all of the same width.
	 */
	setToggleOptionWidth(): void {
		setTimeout(() => {
			const toggleOptionWidths: number[] = [];
			const toggleOptions: HTMLElement[] = this.elementRef.nativeElement.querySelectorAll(".abc-toggle-option-text");
			toggleOptions.forEach((option: HTMLElement) => {
				toggleOptionWidths.push(option.clientWidth);
			});

			if (toggleOptionWidths.length > 0) {
				const maxOptionWidth: number = Math.max(...toggleOptionWidths);
				toggleOptions.forEach((option: HTMLElement) => {
					const optionContainer: HTMLElement = option.parentElement;
					const currentWidth: number = +(window.getComputedStyle(optionContainer).width.split("px")[0]);
					optionContainer.style.width = Math.max(maxOptionWidth, currentWidth) + "px";
				});
			}
		}, 0);
	}

	/**
	 * This detects for ENTER and SPACE key presses in order to toggle the
	 * options
	 * @param event 
	 */
	@HostListener("keydown.enter", ["$event"])
	@HostListener("keydown.space", ["$event"])
	onKeyDown(event: KeyboardEvent): void {
		if (typeof this.modelValue == "boolean") {
			this.toggle(event);
		} else {
			const nextIndex: number = (this.activeOptionIndex < (this.options.length - 1)) ? this.activeOptionIndex + 1 : 0;
			this.toggle(event, this.options[nextIndex].value);
		}
	}
}