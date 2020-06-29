import { Component, Input, forwardRef, ElementRef, Output, EventEmitter, HostBinding, ContentChildren, QueryList, HostListener } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from "@angular/forms";
import { keyCodes } from "../common/key-event-codes";
import { WAOptionComponent } from "./option/wa-option.component";
import { WAFormElementsService } from "../common";

@Component({
	selector: "wa-select",
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => WASelectComponent),
		multi: true
	}],
	templateUrl: "./wa-select.template.html"
})
export class WASelectComponent implements ControlValueAccessor {

	constructor(
		private elementRef: ElementRef,
		private service: WAFormElementsService
	) { }

	/**
	 * This directive retireves all the options that have been configured by the user in the template
	 * as wa-option component instances
	 */
	@ContentChildren(WAOptionComponent) optionsContent: QueryList<WAOptionComponent>;

	/**
	 * Pass a string which will be used as the unique identifier for this HTML element. If you do
	 * not pass any value, a randomly generated ID will be attached to the form field element.
	 */
	@Input() id: string = this.service.generateFormFieldID();

	/**
	 * Pass a string which will be used as the name attribute for this form field. It helps in binding
	 * label elements to the input field.
	 */
	@Input() name: string;

	/**
	 * Pass a string which will be used as the label for the input field. In case of material design, if there is
	 * no label passed, the form field will have appropriate behaviour for animations without any
	 * floating label
	 */
	@Input() label: string;

	/**
	 * This is the form control object which is used to the heavy lifting of determining whether the given input is
	 * invalid. It maintains the full set of attributes of the form control
	 */
	@Input() control: FormControl = new FormControl();

	/**
	 * This parameter decides whether a given form field is mandatory or not. If this value is not passed, it will be assumed
	 * as an optional field by default. Pass the value as true if you wish to make the field mandatory.
	 */
	@Input() required: boolean;

	/**
	 * When there is no form control being used, i.e., in the case of template-driven forms, you can use this parameter to manually decide
	 * whether the form is invalid
	 */
	@Input() invalid: boolean;

	/**
	 * When there is no form control being used, i.e., in the case of template-driven forms, you can use this parameter to manually decide
	 * whether the form should be disbled
	 */
	@Input() disabled: boolean;

	/**
	 * If you want the form control to be set as touched in case there was a value pre-filled at any point, even if the
	 * user did not interact with the form, then set this to true
	 */
	@Input() setAsTouchedIfDirty: boolean = false;

	/**
	 * Pass a string which will be used as an error message. This is displayed to the user in case the control
	 * has invalid status
	 */
	@Input() error: string;

	/**
	 * If you wish to handle the error display with custom logic, then pass this parameter as true and the error message will not
	 * be displayed. The screen-readers will still pick up the message if available.
	 */
	@Input() hideErrorMessage: boolean;

	/**
	 * If you want the options panel to be loaded even before the user clicks on the drop-down field, pass this parameter as
	 * true. Keep in mind that having too many select drop-downs rendered on a single page with this configuration set to
	 * true will have a performance impact and should be avoided as much as possible.
	 */
	@Input() enableEagerLoad: boolean = false;

	/**
	 * This attribute decides what template to use for the input field. Currently we support one design: "material"
	 */
	@Input() design: string = "material";

	/**
	 * Going forward, if we create multiple versions of the same design, having (say) some CSS specific differences
	 * in the appearance, or some minor variations in the logical behaviour, we can pass this optional identifier
	 */
	@Input() designModifier: string = "custom";

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
	 * This option decides if the dropdown should have a default reset option added to the list of options. In native
	 * material dropdowns, this is added by default.
	 */
	@Input() addResetOption: boolean = false;

	/**
	 * Pass a default reset option for the select drop-down
	 */
	@Input() resetOptionText: string = '';

	/**
	 * This option adds a search bar to the options panel so the user can type in a search text to reduce the number of
	 * options visible in the drop-down. This comes in handy when the number of items in the drop-down panel is large.
	 * This is used only in case of custom drop-downs.
	 */
	@Input() enableSearchfilter: boolean;

	/**
	 * Permits two possible values: 'substring', which is the default value and when using this mode, it searches the full string
	 * of every option for the user's search query and returns it in the filtered results; and 'startsWith', which ensures that only
	 * the options who's text values start with the search query will be returned in the results. 
	 */
	@Input() searchType: string = "substring";

	/**
	 * Provide a resource key which will be used to display the placeholder text in the search input field. By
	 * default, this displays the text "Search"
	 */
	@Input() searchFilterPlaceHolder: string = "Search";

	/**
	 * While using the search filter, if the search key returns no results, this key will be displayed to the user
	 * to indicate that there were no options matching his search query.
	 */
	@Input() searchFilterNoResultsText: string = "No results found";

	/**
	 * If this parameter is set to true, the options panel renders as an overlay on mobile phones rather than as a
	 * regular dropdown list.
	 */
	@Input() showOverlayOptionsPanelXS: boolean;

	/**
	 * This stores the value which will be bound to the form control. If there is any value which needs to be pre-filled
	 */
	@Input("value") val: string;

	/**
	 * This emits the standard blur event to the parent so if there"s any action to be performed when the user blurs the form,
	 * it can be bound to this event.
	 */
	@Output() blur: EventEmitter<void> = new EventEmitter<void>();

	/**
	 * This emits the standard focus event to the parent so if there"s any action to be performed when the user focusses on the
	 * form, it can be bound to this event.
	 */
	@Output() focus: EventEmitter<void> = new EventEmitter<void>();

	/**
	 * Notify the parent component in case the selection has been changed
	 */
	@Output() selectionChange: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * This variable stores the HTML element reference of the input field
	 */
	element: HTMLInputElement;

	/**
	 * Stores the reference to the select form"s container
	 */
	elementContainer: HTMLDivElement;

	/**
	 * To stop the floating label animation when the form is initialised with a value, this variable will be used.
	 */
	defaultFloatingLabelState: boolean = false;

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
	 * This variable stores the first touch state of the input field. If the user has touched the field through any form of
	 * interaction at least once, then this value will be set to true. Once this value is set to true, it will never change back
	 * to false.
	 */
	touched: boolean = false;

	/**
	 * Determines if a change in selection was done programmatically (via JS/TS) or manually (by the user)
	 */
	isChangedProgrammatically: boolean = false;

	/**
	 * Stores the list of options to be displayed in the select drop-down
	 */
	options: Array<WAOptionComponent> = [];

	/**
	 * List of options determined based on search filter. This array is used even if the search function isn"t enabled.
	 */
	filteredOptions: Array<WAOptionComponent> = [];

	/**
	 * This variable determines whether or not the options panel should be visible. This variable is uused only in case designModifier
	 * is "native"
	 */
	showOptionsPanel: boolean = false;

	/**
	 * Stores the attributes of the option selected by the user (includes any prefilled option as well)
	 */
	selectedOption: any = {};

	/**
	 * This determines what the lowest possible option index is. The default start index is 0, but when a reset option is added to the
	 * drop-down, then this value is set to -1
	 */
	minOptionIndex: number = 0;

	/**
	 * Since we need to close the dropdown panel when blurring from the field, we face an issue where the dropdown panel closes on trying to select
	 * an option since the drodpown"s blur event gets triggered before the option"s click event. To resolve this, we maintain a state variable. The
	 * usage of this variable is explained in more detail with the JSDOC for the "toggleDropdown" method.
	 */
	optionPanelEventTriggered: boolean = false;

	/**
	 * This value determines whether we display the options panel as an overlay or the default drop-down view
	 */
	showOverlayOptionsPanel: boolean = false;

	/**
	 * When the search filter is enabled, this model stores the text that the user types in to filter the list of options displayed to him
	 */
	optionSearchText: string = "";

	/**
	 * This variable stores the focus state of the search bar input field. If the input field is currently focussed on, then this value
	 * will be true, else false.
	 */
	searchBarFocussed: boolean = false;

	/**
	 * This stores the keys entered by the user and produces a search term with which we can auto select the closest match from the options list. This gets reset after 1 second from the first key press
	 */
	keyupSearchText: string = "";

	/**
	 * In order to parse multiple keypresses that could possibly result in a substring that the user wants to
	 * search for, we provide a time interval of 1 second. This variable stores that timeout object so that
	 * we can clear it whenever required
	 */
	keyupSearchTimeout: any;

	/**
	 * The text which is used as the aria-label attribute for the select dropdown. Used for screen readers.
	 */
	ariaLabel: string = this.label;

	/**
	 * Check whether the form has been completely initialised so that the drop-down can be rendered.
	 */
	initialised: boolean = false;

	/**
	 * Determines whther the browser being use is Internet Explorer
	 */
	isIEBrowser: boolean = this.service.isIEBrowser();

	/**
	 * Checks if the current viewport is mobile
	 */
	isMobileView: boolean = this.service.checkViewPort("mobile");

	/**
	 * Override method definition for onChange, used to implement the ControlValueAccessor interface
	 */
	onChange: any = () => { };

	/**
	 * Override method definition for onTouched, used to implement the ControlValueAccessor interface
	 */
	onTouched: any = () => { };

	ngOnInit() {
		// Set default value for design appearance
		this.appearance = this.service.generateAppearanceClass(this.design, this.appearance);

		// Calls method to check whether the native drop-down should be displayed
		this.checkForNativeDropdown();

		// Sets the first option index in the list. When there is a reset option, it adds another option to
		// the list at the top, with index -1. This logic handles that scenario
		this.minOptionIndex = this.addResetOption ? -1 : 0;

		// Sets default value for defaultFloatingLabelState
		this.defaultFloatingLabelState = !!this.control.value;
	}

	ngAfterViewInit() {
		// Stores the HTML objects for the select box and its container
		this.element = this.elementRef.nativeElement.querySelector("#" + this.id);
		this.elementContainer = this.elementRef.nativeElement.querySelector("#" + this.id + "Container");

		// This fetches the list of options from the HTML and populates it in the options array
		this.generateOptionsList();

		// Sets the default value for the model. This handles the cases where the form needs to be pre-populated
		// with some value
		this.setOptionFromValue(this.val || '');

		// Set aria-label message
		this.setAriaLabel();

		// Once the form control is intialised, we can set defaultFloatingLabelState to false so that animations will
		// be displayed with any interactions thereafter.
		setTimeout(() => {
			this.defaultFloatingLabelState = false;
			this.initialised = true;
		}, 1000);

		// This logic checks if the list of options available to select from has changed. this can happen when the
		// list depends on the value set in a different model. For example, if this list needs to display a set of provinces,
		// the available options might change if another dropdown in the form decided the country. This logic sets the value
		// of touched to false so that any errors are reset. If the expected behaviour is to display errors on changing the list,
		// then remove the line "this.touched = false;"
		this.optionsContent.changes.subscribe(() => {
			this.touched = false;
			this.generateOptionsList();

			if (!!this.val && this.getOptionIndex(this.options, this.val) == -1) {
				this.value = '';
			} else {
				// If the drop-down needs to be pre-filled with any value on changing the list, this logic needs to be removed.
				this.setOptionFromValue(this.val || '');
			}

			// When the options panel has a new list of suggestions, it's quite common that we might have a new label for the form.
			// This logic will reset the aria-label associated to the account
			this.setAriaLabel();
		});
	}

	get value() {
		return this.val;
	}

	set value(val: any) {
		if ((this.val || val) && (this.val != val)) {
			if (this.setAsTouchedIfDirty) {
				this.touched = true;
				this.onTouched();
			}
			this.setOptionFromValue(val);
			if (!this.isChangedProgrammatically) {
				this.selectionChange.emit(val);
			}
		}
		this.service.removeRoleAlert(this.id);
		this.val = val;
		this.onChange(val);
		this.service.addRoleAlert(this.id);
		this.isChangedProgrammatically = false;
	}

	setValue(value: string = '', closeOptionsPanel: boolean = false): void {
		this.value = value;
		if (closeOptionsPanel) {
			this.showOptionsPanel = false;
			this.searchBarFocussed = false;
			this.resetSearchFilter();
			this.focusElement();
			this.setOptionsPanelEnvironment('close');
		}
	}

	/**
	 * This fetches the wa-option components from the ContentChildren directive and assigns it to the
	 * options array.
	 */
	generateOptionsList() {
		this.options = this.optionsContent["_results"];
		this.filteredOptions = this.optionsContent["_results"];
	}

	/**
	 * The pre-fill logic for the dropdown is handled here. It searches for an option with the given
	 * model value and assigns that object as the selected option to display in the dropdown.
	 */
	setOptionFromValue(value: string): void {
		const optionIndex: number = this.getOptionIndex(this.options, value);
		this.selectOption(optionIndex);
	}

	/**
	 * Method to check if native dropdowns should be forced. This is used only when we use material custom
	 * dropdowns on IE since they are not compliant with accessibility guidelines. So if the browser used is
	 * IE, we use native dropdowns even if configured otherwise. If there are any other browsers or devices
	 * on which we need to use native, add the condition here
	 */
	checkForNativeDropdown() {
		if (this.isIEBrowser) {
			this.designModifier = "native";
			this.enableSearchfilter = false;
		}
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	writeValue(value: any): void {
		this.isChangedProgrammatically = true;
		this.value = value;
		this.touched = this.touched || (!!value && this.focussed);
	}

	focusElement(_event?: Event): void {
		if (!this.control.disabled && !this.disabled) {
			this.focussed = true;
			this.blurred = false;
			this.element.focus();
			this.focus.emit();
		}
	}

	blurElement(event?: Event): void {
		if (!(event["relatedTarget"] && event["relatedTarget"].classList && event["relatedTarget"].classList.contains("option-search-filter-input"))) {
			this.touched = true;
			this.focussed = false;
			this.blurred = true;
			this.blur.emit();
			this.searchBarFocussed = false;
			this.resetSearchFilter();
			this.onTouched();
			// If the options panel is visible, then we need to close it.
			if (this.showOptionsPanel) {
				this.showOptionsPanel = false;
				this.setOptionsPanelEnvironment('close');
			}
		}
	}

	/**
	 * This method hides/shows the options panel when using the designModifier "custom". This method gets called on click
	 * of the select dropdown, on clicking an option on the options panel and on blurring the form field. There"s one issue where
	 * if the user clicks on tan option from the panel, the form detects this as a blur event first and destroys the options
	 * panel before we can capture the click event to set the selected option. To resolve this issue, we are using a variable
	 * optionPanelEventTriggered to control this behaviour.
	 * @param _event 
	 */
	toggleDropdown(_event?: MouseEvent | KeyboardEvent): void {
		if (!this.optionPanelEventTriggered && (!this.control.disabled && !this.disabled)) {
			this.showOptionsPanel = !this.showOptionsPanel;
			if (this.showOptionsPanel) {
				// This scrolls the drop-down panel to the currently selected option
				setTimeout(() => { this.scrollToOption("DOWN"); }, 0);
				this.setOptionsPanelEnvironment('open');
			} else {
				this.searchBarFocussed = false;
				this.resetSearchFilter();
				this.setOptionsPanelEnvironment('close');
			}
		}
	}

	/**
	 * This method sets the selected option object and closes the options panel. This also sets the aria-label
	 * with the new data
	 * @param optionIndex
	 */
	selectOption(optionIndex: number): void {
		this.selectedOption = this.options[optionIndex] || ({} as WAOptionComponent);
		this.optionPanelEventTriggered = true;
		this.setAriaLabel();
		setTimeout(() => { this.optionPanelEventTriggered = false; }, 200);
	}

	/**
	 * This method is used to generate the aria-label value for the drop-down
	 */
	setAriaLabel(): void {
		setTimeout(() => {
			this.ariaLabel = this.label;
			if (this.selectedOption["text"]) {
				this.ariaLabel += (" " + this.selectedOption["text"]);
			}
		}, 500);
	}

	/**
	 * This handles all key events for keyboard users
	 * @param event 
	 */
	keyDown(event: KeyboardEvent): void {
		if (!this.control.disabled && !this.disabled) {
			const filteredOptionIndex: number = this.getOptionIndex(this.filteredOptions, this.val);
			switch (event.keyCode) {
				case keyCodes.UP: {
					event.preventDefault();
					if (filteredOptionIndex > this.minOptionIndex) {
						this.setValue(this.filteredOptions[filteredOptionIndex - 1].value);
						this.scrollToOption("UP");
					}
					break;
				}
				case keyCodes.DOWN: {
					event.preventDefault();
					if (filteredOptionIndex < (this.filteredOptions.length - 1)) {
						this.setValue(this.filteredOptions[filteredOptionIndex + 1].value);
						this.scrollToOption("DOWN");
					}
					break;
				}
				case keyCodes.ENTER: {
					if (this.showOptionsPanel) {
						this.showOptionsPanel = false;
						this.searchBarFocussed = false;
						this.resetSearchFilter();
					} else {
						this.toggleDropdown(event);
					}
					break;
				}
				case keyCodes.TAB: {
					if (this.showOptionsPanel) {
						event.preventDefault();
						if (this.searchBarFocussed && this.filteredOptions.length > 0) {
							const optionIndex: number = filteredOptionIndex == -1 ? 0 : filteredOptionIndex;
							this.setValue(this.filteredOptions[optionIndex].value, true);
						} else {
							this.toggleDropdown(event);
							this.focusElement();
						}
					}
				}
				default: {
					// If the user starts typing in character keys, then we need to start auto-selecting the closest match to his
					// search criteria. In case the options panel is open while the user is pressing these keys and we have a search filter
					// enabled, then we need to let the user type into the search field. This is handled by focussing on the search field
					// just as the user begins to type
					if (!(event.ctrlKey || event.shiftKey || event.altKey) && ((event.keyCode >= 97 && event.keyCode <= 122) || (event.keyCode >= 65 && event.keyCode <= 90))) {
						if (this.showOptionsPanel && this.enableSearchfilter) {
							if (!this.searchBarFocussed) {
								this.focusSearchBar();
							}
						} else {
							let enteredKey: string = event.key.toLowerCase();
							const keyupSearchTextLength: number = this.keyupSearchText.length;
							if (!(keyupSearchTextLength == 1 && this.keyupSearchText == enteredKey)) {
								this.keyupSearchText += enteredKey;
							}
							this.getClosestMatch();
							if (this.keyupSearchTimeout) { clearTimeout(this.keyupSearchTimeout); }

							// We maintain a timeout of 1s so all keys that are typed within the second by the user will be picked up sequentially
							// This timer is maintained for 1s from the last key press. After this time expires, we reset the search text so the user
							// can start searching fresh.
							this.keyupSearchTimeout = setTimeout(() => {
								this.keyupSearchText = "";
								clearTimeout(this.keyupSearchTimeout);
							}, 1000);
						}
					}
				}
			}
		}
	}

	/**
	 * When the user types in a search key into the options filter, this method finds all the matches to the value attribute
	 * of the list of options 
	 * @param searchText The search key entered by the user
	 * @param selectFirstOption This decides whether the first match should be selected. We pass this as true for normal user searches,
	 * but we pass false when we"re trying to reset the options list. 
	 */
	filterOptions(searchText: string, selectFirstOption?: boolean): void {
		this.filteredOptions = this.getMatches(searchText, (this.searchType == 'startsWith'));
		if (selectFirstOption) {
			this.scrollToOption("UP");
		}
	}

	/**
	 * As the user types a character key while focussing on the select field, this method will select the closest match
	 * from the options list. This does not run when the user has the optionSearchFilter enabled and the options panel
	 * is visible
	 */
	getClosestMatch(): void {
		const closestMatches: Array<WAOptionComponent> = this.getMatches(this.keyupSearchText, true);
		const closestMatchesArrayLength: number = closestMatches.length;
		if (closestMatchesArrayLength > 0) {
			const firstMatchIndex: number = this.getOptionIndex(this.options, closestMatches[0].value);
			const lastMatchIndex: number = this.getOptionIndex(this.options, closestMatches[closestMatchesArrayLength - 1].value);
			const selectedOptionIndex: number = this.getOptionIndex(this.options, this.val);
			let selectedIndex: number = firstMatchIndex;
			if (selectedOptionIndex >= firstMatchIndex && selectedOptionIndex < lastMatchIndex) {
				closestMatches.some((option: WAOptionComponent) => {
					const optionIndex: number = this.getOptionIndex(this.options, option.value);
					if (optionIndex > selectedOptionIndex) {
						selectedIndex = optionIndex;
						return true;
					}
				})
			}
			this.setValue(this.filteredOptions[selectedIndex].value);
		}
	}

	/**
	 * Returns a list of options that match with a given search text. This method takes care of all languages and accented characters. The comparisons
	 * for accented characters are done by replacing both the search text and the options with their normal English non-accented counter-parts.
	 * @param searchText The search key entered by the user
	 */
	getMatches(searchText: string, startsWith: boolean): Array<WAOptionComponent> {
		const formattedSearchText: string = this.service.replaceAccentedCharacters(searchText.toLowerCase());
		if (startsWith) {
			return this.options.filter((option: WAOptionComponent) => {
				const optionText: string = this.service.replaceAccentedCharacters(option.text.toLowerCase());
				return (optionText.indexOf(formattedSearchText) == 0);
			});
		} else {
			return this.options.filter((option: WAOptionComponent) => {
				const optionText: string = this.service.replaceAccentedCharacters(option.text.toLowerCase());
				return optionText.includes(formattedSearchText);
			});
		}
	}

	/**
	 * Method triggered when the user focusses on the search bar. This method prevents the form field blur
	 * event from being triggered.
	 * @param _event
	 */
	focusSearchBar(_event?: Event) {
		const optionSearchFilterInput: HTMLElement = <HTMLElement>this.elementRef.nativeElement.querySelector("#" + this.id + "OptionSearchField");
		if (optionSearchFilterInput) {
			optionSearchFilterInput.focus();
			this.searchBarFocussed = true;
			this.optionPanelEventTriggered = true;
			setTimeout(() => { this.optionPanelEventTriggered = false; }, 200);
		}
	}

	/**
	 * Method triggered when the user blurs the search bar. This takes care of the scenario when
	 * the field is blurred due to a click event on one of the options by adding a delay.
	 * @param event 
	 */
	blurSearchBar(event: Event) {
		setTimeout(() => {
			this.searchBarFocussed = false;
			if (!this.optionPanelEventTriggered) {
				this.blurElement(event);
			}
		}, 100);
	}

	/**
	 * This method resets the search filter. So all the options will be populated again and the correct search index is assigned
	 * to the selectedOptionIndex variable. This is called whenever the options panel is closed which can be triggered either on a blur
	 * event or when the user chooses an option from the options list.
	 */
	resetSearchFilter(): void {
		this.optionSearchText = "";
		this.filterOptions("", false);
	}

	/**
	 * This method scrolls the options panel up or down when using arrow keys. This also handles the case when an option has been selected
	 * and the panel needs to be scrolled to the selected option for better UX.
	 * @param arrowDirection 
	 */
	scrollToOption(arrowDirection: string): void {
		const selectedOptionIndex = this.getOptionIndex(this.filteredOptions, this.val);
		if (this.showOptionsPanel && this.design == "material" && this.designModifier == "custom" && selectedOptionIndex >= this.minOptionIndex) {
			const options: Array<HTMLElement> = this.elementRef.nativeElement.querySelectorAll(".wa-form-element-option");
			const activeOptionIndex: number = this.addResetOption ? selectedOptionIndex + 1 : selectedOptionIndex;
			const activeOption: HTMLElement = options[activeOptionIndex];
			const optionsPanel: HTMLElement = this.elementRef.nativeElement.querySelector(".wa-form-element-options-list");
			if ((activeOption && optionsPanel) && !this.isVisibleInResultsPanel(activeOption, optionsPanel)) {
				if (arrowDirection == "UP") {
					optionsPanel.scrollTop = activeOption.offsetTop;
				} else if (arrowDirection == "DOWN") {
					optionsPanel.scrollTop = (activeOption.clientHeight - (optionsPanel.clientHeight - activeOption.offsetTop));
				}
			}
		}
	}

	/**
	 * Finds the index of a given option in the list of options
	 * @param options
	 */
	getOptionIndex(options: Array<WAOptionComponent>, value: string): number {
		return options.findIndex((option: WAOptionComponent) => (option["value"] == value));
	}

	/**
	 * This method checks if the active option is visible on the options panel. Since the options panel gets a maximum
	 * height assigned to it, we need to check if a given option is visible to scroll the options panel and bring the
	 * selected option into view
	 * @param option The HTML element of the active option
	 * @param optionsPanel The HTML element for the options panel
	 */
	isVisibleInResultsPanel(option: HTMLElement, optionsPanel: HTMLElement): boolean {
		return (
			((optionsPanel.scrollTop + optionsPanel.clientHeight - option.offsetTop) >= option.clientHeight) &&
			(optionsPanel.scrollTop < option.offsetTop)
		);
	}

	/**
	 * This method handles the logic for the overlay panel. This includes the following decisions:
	 * 1. Whether or not the drop-down should be displayed as an overlay
	 * 2. Sets the current state of whether the overlay is displayed or not (read below for why this was done)
	 * 	  NOTE: The above behaviour was written because on tablet devices, we had an issue where on clicking the search box of the
	 * 	        drop-down panel, when the keyboard shows up, it reduces the size of the window and that leads to the overlay panel
	 * 		    showing up instead, due to which the browser navigation logic written to handle the back button/swipe on phones would
	 * 		    get triggered and send the user back to the previous page whenever an option was selected.
	 * 3. Handling browser navigation by creating a new state when using the options panel as an overlay. More details within the method
	 * @param state Possible values are 'open' and 'close'
	 */
	setOptionsPanelEnvironment(state: string) {
		if (this.showOverlayOptionsPanelXS && this.isMobileView && !this.isIEBrowser) {
			if (state == 'open' && !this.showOverlayOptionsPanel) {
				this.showOverlayOptionsPanel = true;

				// If we use the overlay panel on mobile, we need to prevent the browser from storing the scroll position, create a new
				// dummy state and then prevent the background from scrolling. We need to prevent the scroll position from being stored
				// by setting history.scrollRestoration to "manual" since if the user tries to press the back button after opening the
				// drop-down panel and scrolls down before selecting an option, then once the panel is closed, the page scrolls back up
				// or down to the previous scroll position and this looks bad
				history.scrollRestoration = "manual";
				history.pushState({ obsolete: true }, document.title, location.href);
			} else if (state == 'close' && this.showOverlayOptionsPanel) {
				this.showOverlayOptionsPanel = false;

				// If we use the overlay panel, then on closing it, we need to go back to the original state that the user was one so that
				// the user isn"t hindered when using the browser navigation buttons
				history.go(-1);
				history.scrollRestoration = "auto";
			}
		}
	}

	/**
	 * Detect when the user start's a browser navigation flow. When the user tries to navigate using the browser's navigation
	 * options, we need to close the options panel
	 */
	@HostListener("window:popstate")
	onPopState() {
		this.showOptionsPanel = false;
		this.searchBarFocussed = false;
		this.resetSearchFilter();
	}

	/**
	 * Detect when the user resizes their browser or changes the orientation of their device. This helps in resetting the viewport
	 * parameters
	 */
	@HostListener("window:resize")
	@HostListener("window:orientationchange")
	onResize() {
		this.isMobileView = this.service.checkViewPort('mobile');
	}

	/**
	 * If the user presses the escape key while the dropdown panel is open, the panel should be closed
	 * while retaining focus on the drop-down field
	 */
	@HostListener("document:keydown.escape")
	onEscape() {
		if (this.showOptionsPanel) {
			this.toggleDropdown();
			this.focusElement();
		}
	}
}