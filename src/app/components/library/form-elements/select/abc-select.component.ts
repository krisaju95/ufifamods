import { Component, Input, forwardRef, Output, EventEmitter, ContentChildren, QueryList, HostListener, ViewEncapsulation, ViewChild, TemplateRef, ComponentRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AbcKeyboardEvent, translations } from "../../utils";
import { AbcOptionComponent } from "./abc-option.component";
import { AbcOverlayComponent } from '../../utils/abc-overlay.component';
import { AbcFormFieldComponent } from '../form-field';

/**
 * BETA - If you want to allow the user to dismiss a drop-down by clicking the back button
 * of their phone (or swiping back), then set this to true. Set as false if you would
 * like to disable it
 */
const enableMobileBackButtonToDismiss: boolean = true;

/**
 * This component is used to render a drop-down. It supports rendering of native drop-downs and custom
 * drop-downs.
 */
@Component({
	selector: "abc-select",
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => AbcSelectComponent),
		multi: true
	}],
	templateUrl: "./abc-select.template.html",
	styleUrls: [
		"./abc-select.style.scss",
		"../../styles/abc-ripple.scss",
		"../../styles/abc-common.scss",
		"../styles/abc-form-element.label.scss",
		"../styles/abc-form-element.underline.scss",
		"../styles/abc-form-element.appearances.scss",
		"../styles/abc-form-element.affix.scss"
	],
	encapsulation: ViewEncapsulation.None
})
export class AbcSelectComponent extends AbcFormFieldComponent implements ControlValueAccessor {

	/**
	 * This attribute fetches the reference to the optionsPanel template from the component
	 */
	@ViewChild("optionsPanel") optionsPanel: TemplateRef<any>;

	/**
	 * This directive retireves all the options that have been configured by the user in the template
	 * as abc-option component instances
	 */
	@ContentChildren(AbcOptionComponent) optionsContent: QueryList<AbcOptionComponent>;

	/**
	 * If you want the form control to be set as touched in case there was a value pre-filled at any point, even if the
	 * user did not interact with the form, then set this to true
	 */
	@Input() setAsTouchedIfDirty: boolean = false;

	/**
	 * This attribute decides what template to use for the input field. Currently we support one design: "material"
	 */
	@Input() design: "material" = "material";

	/**
	 * Going forward, if we create multiple versions of the same design, having (say) some CSS specific differences
	 * in the appearance, or some minor variations in the logical behaviour, we can pass this optional identifier
	 */
	@Input() designModifier: "custom" | "native" = "custom";

	/**
	 * If there are multiple variations for a given design, this parameter can handle it. For example, in Material design, we
	 * have multiple variations for the input form like "standard", "borderless" etc. "standard" has a border around the form field.
	 * "borderless" just has the underline below the form, but no border around it. you can configure more variations if required using
	 * this parameter. the default value is "standard".
	 */
	@Input() appearance: "standard" | "borderless" | "condensed" = "standard";

	/**
	 * This option decides if the dropdown should have a default reset option added to the list of options. In native
	 * material dropdowns, this is added by default.
	 */
	@Input() addResetOption: boolean = false;

	/**
	 * Pass a default reset option for the select drop-down
	 */
	@Input() resetOptionText: string = "";

	/**
	 * This option adds a search bar to the options panel so the user can type in a search text to reduce the number of
	 * options visible in the drop-down. This comes in handy when the number of items in the drop-down panel is large.
	 * This is used only in case of custom drop-downs.
	 */
	@Input() enableSearchFilter: boolean;

	/**
	 * Permits two possible values: "substring", which is the default value and when using this mode, it searches the full string
	 * of every option for the user"s search query and returns it in the filtered results; and "startsWith", which ensures that only
	 * the options who"s text values start with the search query will be returned in the results. 
	 */
	@Input() searchType: "startsWith" | "substring" = "substring";

	/**
	 * Provide a resource key which will be used to display the placeholder text in the search input field. By
	 * default, this displays the text "Search"
	 */
	@Input() searchFilterPlaceHolder: string = translations.dropdownSearchFilter.placeholder;

	/**
	 * While using the search filter, if the search key returns no results, this key will be displayed to the user
	 * to indicate that there were no options matching his search query.
	 */
	@Input() searchFilterNoResultsText: string = translations.dropdownSearchFilter.noResultsFound;

	/**
	 * Notify the parent component in case the selection has been changed
	 */
	@Output() change: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * This stores the appearance class(es) for the form field
	 */
	appearanceClass: string = "";

	/**
	 * Determines if a change in selection was done programmatically (via JS/TS) or manually (by the user)
	 */
	isChangedProgrammatically: boolean = false;

	/**
	 * Stores the list of options to be displayed in the select drop-down
	 */
	options: Array<AbcOptionComponent> = [];

	/**
	 * List of options determined based on search filter. This array is used even if the search function isn"t enabled.
	 */
	filteredOptions: Array<AbcOptionComponent> = [];

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
	 * This variable stores the reference to the optionsPanel component
	 */
	optionsPanelRef: ComponentRef<AbcOverlayComponent>;

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
	 * Check whether the form has been completely initialised so that the drop-down can be rendered.
	 */
	initialised: boolean = false;

	/**
	 * Checks if the current viewport is mobile
	 */
	isMobileView: boolean = this.service.checkViewPort("mobile");

	/**
	 * This parameter checks if the current browser history state was manually added by the drop-down
	 */
	isDummyHistoryState: boolean = false;

	/**
	 * Fetch the form control from the parent container, set the appearance class string, check if the
	 * drop-down should be native and set the minOptionIndex
	 */
	ngOnInit() {
		this.setNgControl();

		// Set default value for design appearance
		this.appearanceClass = this.service.generateAppearanceClass(this.design, this.appearance);

		// Calls method to check whether the native drop-down should be displayed
		this.checkForNativeDropdown();

		// Sets the first option index in the list. When there is a reset option, it adds another option to
		// the list at the top, with index -1. This logic handles that scenario
		this.minOptionIndex = this.addResetOption ? -1 : 0;
	}

	/**
	 * Set the appearance class string, check if the drop-down should be native and set the minOptionIndex
	 */
	ngOnChanges() {
		// Set default value for design appearance
		this.appearanceClass = this.service.generateAppearanceClass(this.design, this.appearance);

		// Calls method to check whether the native drop-down should be displayed
		this.checkForNativeDropdown();

		// Sets the first option index in the list. When there is a reset option, it adds another option to
		// the list at the top, with index -1. This logic handles that scenario
		this.minOptionIndex = this.addResetOption ? -1 : 0;
	}

	/**
	 * Store the reference to the drop-down element and fetch the drop-down options from the
	 * parent container
	 */
	ngAfterViewInit() {
		// Stores the HTML objects for the select box and its container
		this.element = this.elementRef.nativeElement.querySelector("#" + this.id);

		setTimeout(() => {
			// This fetches the list of options from the HTML and populates it in the options array
			this.generateOptionsList();

			// Sets the default value for the model. This handles the cases where the form needs to be pre-populated
			// with some value
			this.setOptionFromValue(this.val || "");

			// Once the form control is intialised, we set this variable to true.
			this.initialised = true;

			// This logic checks if the list of options available to select from has changed. this can happen when the
			// list depends on the value set in a different model. For example, if this list needs to display a set of provinces,
			// the available options might change if another dropdown in the form decided the country. This logic sets the value
			// of touched to false so that any errors are reset. If the expected behaviour is to display errors on changing the list,
			// then remove the line "this.touched = false;"
			this.optionsContent.changes.subscribe(() => {
				this.touched = false;
				this.generateOptionsList();

				if (!!this.val && this.getOptionIndex(this.options, this.val) == -1) {
					this.value = "";
				} else {
					// If the drop-down needs to be pre-filled with any value on changing the list, this logic needs to be removed.
					this.setOptionFromValue(this.val || "");
				}
			});
		}, 0);
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
		if ((this.val || val) && (this.val != val)) {
			if (this.setAsTouchedIfDirty) {
				this.touched = true;
				this.onTouched();
			}
			this.setOptionFromValue(val);
			if (!this.isChangedProgrammatically) {
				this.change.emit(val);
			}
		}
		this.service.removeRoleAlert(this.id);
		this.val = val;
		this.onChange(val);
		this.service.addRoleAlert(this.id);
		this.isChangedProgrammatically = false;
	}

	/**
	 * This method sets the value of the form control when a new option is selected
	 * @param option 
	 * @param closeOptionsPanel 
	 */
	setValue(option: AbcOptionComponent | string, closeOptionsPanel: boolean = false): void {
		if (!((option instanceof AbcOptionComponent) && option.disabled)) {
			this.value = (option instanceof AbcOptionComponent) ? option.value : "";
			if (closeOptionsPanel) {
				this.setOptionsPanelVisibility(false);
				this.searchBarFocussed = false;
				this.resetSearchFilter();
				this.focusElement();
			}
		} else {
			this.optionPanelEventTriggered = true;
			setTimeout(() => { this.optionPanelEventTriggered = false; }, 200);
		}
	}

	/**
	 * This fetches the abc-option components from the ContentChildren directive and assigns it to the
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
		if (this.service.isIEBrowser()) {
			this.designModifier = "native";
			this.enableSearchFilter = false;
		}
	}

	/**
	 * This method writes a value to the form control when changed by the parent container
	 * @param value 
	 */
	writeValue(value: any): void {
		this.isChangedProgrammatically = true;
		this.value = value;
		this.touched = this.touched || (!!value && this.focussed);
	}

	/**
	 * This method is called when the form control is focussed or when we want to manually
	 * place the focus on the control
	 * @param _event 
	 */
	focusElement(_event?: Event): void {
		if (!this.control.disabled && !this.disabled && !this.readOnly) {
			this.focussed = true;
			this.blurred = false;
			this.element.focus();
			this.focus.emit();
			if (this.showHighlightOverlay && !this.highlightOverlayRef && this.appearance != "borderless") {
				this.highlightOverlayRef = this.abcOverlay.showElementFocusHighlightOverlay(this.elementRef.nativeElement.querySelector(".abc-form-element-wrapper"));
			}
		}
	}

	/**
	 * This method is called when the form control is blurred
	 */
	blurElement(event?: Event): void {
		setTimeout(() => {
			if (!(event["relatedTarget"]
				&& event["relatedTarget"].classList
				&& event["relatedTarget"].classList.contains("option-search-filter-input"))) {
				this.touched = true;
				this.focussed = false;
				this.blurred = true;
				this.blur.emit();
				this.searchBarFocussed = false;
				this.resetSearchFilter();
				this.onTouched();
				// If the options panel is visible, then we need to close it.
				if (this.showOptionsPanel) {
					this.setOptionsPanelVisibility(false);
					if (this.highlightOverlayRef) {
						this.abcOverlay.removeOverlay(this.highlightOverlayRef);
						this.highlightOverlayRef = null;
					}
				}
			}
		}, 150);
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
		if (!this.optionPanelEventTriggered && (!this.control.disabled && !this.disabled && !this.readOnly)) {
			this.setOptionsPanelVisibility(!this.showOptionsPanel);
			if (this.showOptionsPanel) {
				// This scrolls the drop-down panel to the currently selected option
				setTimeout(() => { this.scrollToOption("DOWN"); }, 0);
			} else {
				this.searchBarFocussed = false;
				this.resetSearchFilter();
			}
		}
	}

	/**
	 * This method sets the visibility of the options panel
	 * @param state 
	 */
	setOptionsPanelVisibility(state: boolean) {
		this.showOptionsPanel = state;
		if (state) {
			this.setOptionsPanelEnvironment("open");
			const element: HTMLElement = this.elementRef.nativeElement.querySelector(".abc-form-element-wrapper");
			this.optionsPanelRef = this.abcOverlay.injectOverlay(this.optionsPanel, {
				element: element,
				position: "bottom",
				margin: 2,
				strictPosition: this.enableSearchFilter,
				reAlignElementOnScroll: !this.enableSearchFilter,
				blockParentDialogScroll: true,
				blockBackgroundScrollMobileOnly: this.enableSearchFilter,
				setMaxHeightToElement: ".abc-form-element-options-panel"
			}).overlayRef;
		} else {
			this.setOptionsPanelEnvironment("close");
			const optionsPanelRef: HTMLElement = this.optionsPanelRef && this.optionsPanelRef.instance.elementRef.nativeElement;
			const optionsPanelContainer: HTMLElement = optionsPanelRef && optionsPanelRef.querySelector(".abc-form-element-options-panel-container");
			setTimeout(() => { optionsPanelContainer && optionsPanelContainer.classList.add("closing"); }, 50);
			setTimeout(() => { this.abcOverlay.removeOverlay(this.optionsPanelRef); }, 400);
		}
	}

	/**
	 * This method sets the selected option object and closes the options panel. This also sets the aria-label
	 * with the new data
	 * @param optionIndex
	 */
	selectOption(optionIndex: number): void {
		this.selectedOption = this.options[optionIndex] || ({} as AbcOptionComponent);
		this.optionPanelEventTriggered = true;
		setTimeout(() => { this.optionPanelEventTriggered = false; }, 200);
	}

	/**
	 * This handles all key events for keyboard users
	 * @param event 
	 */
	keyDown(event: KeyboardEvent): void {
		if (!this.control.disabled && !this.disabled && !this.readOnly) {
			const filteredOptionIndex: number = this.getOptionIndex(this.filteredOptions, this.val);
			const keyBoardEvent: AbcKeyboardEvent = this.service.getKeyPressed(event);
			switch (keyBoardEvent) {
				case "UP": {
					// On pressing the arrow up key, set the selected option as the previous index
					// to what is currently selected. This also checks for disabled options
					event.preventDefault();
					if (filteredOptionIndex > this.minOptionIndex) {
						this.filteredOptions
							.slice(0, filteredOptionIndex).reverse()
							.some((option: AbcOptionComponent) => {
								if (!option.disabled) {
									this.setValue(option);
									this.scrollToOption("UP");
									return true;
								}
								return false;
							});
					}
					break;
				}
				case "DOWN": {
					// On pressing the arrow down key, set the selected option as the previous index
					// to what is currently selected. This also checks for disabled options
					event.preventDefault();
					this.filteredOptions
						.slice(filteredOptionIndex + 1, this.filteredOptions.length)
						.some((option: AbcOptionComponent) => {
							if (!option.disabled) {
								this.setValue(option);
								this.scrollToOption("DOWN");
								return true;
							}
							return false;
						});
					break;
				}
				case "SPACE": {
					// On pressing the space key, prevent the browser from scrolling down and the rest
					// of the logic is the same as the ENTER key defined below (that's why there isn't
					// a break statement in this case)
					event.preventDefault();
				}
				case "ENTER": {
					// On pressing the enter key, if the drop-down is open, the close and reset the search bar.
					// If the options panel was closed, then just open it
					if (this.showOptionsPanel) {
						this.setOptionsPanelVisibility(false);
						this.resetSearchFilter();
						if (this.searchBarFocussed) {
							this.searchBarFocussed = false;
							this.focusElement(event);
						}
					} else {
						this.toggleDropdown(event);
					}
					break;
				}
				case "TAB": {
					// If the options panel is open, stop the default tab order
					if (this.showOptionsPanel) {
						event.preventDefault();

						// If there's a search bar and it's currently not in focus, on clicking tab from the drop-down,
						// place the focus on the search bar (except for shift tab)
						if (this.enableSearchFilter && !this.searchBarFocussed && !event.shiftKey) {
							this.focusSearchBar();
						} else {
							// If the search bar is focussed and there are currently some options displayed, then select the current
							// active option (except if that option is disabled). Then close the drop-down and focus back on the
							// drop-down
							if (this.searchBarFocussed && this.filteredOptions.length > 0 && filteredOptionIndex > -1) {
								const selectedOption: AbcOptionComponent = this.filteredOptions[filteredOptionIndex];
								if (!selectedOption.disabled) {
									this.setValue(selectedOption, true);
									break;
								}
							}
							this.toggleDropdown(event);
							this.focusElement();
							break;
						}
					}
				}
				default: {
					// If the user starts typing in character keys, then we need to start auto-selecting the closest match to his
					// search criteria. In case the options panel is open while the user is pressing these keys and we have a search filter
					// enabled, then we need to let the user type into the search field. This is handled by focussing on the search field
					// just as the user begins to type
					if (!(event.ctrlKey || event.shiftKey || event.altKey) && ((event.keyCode >= 97 && event.keyCode <= 122) || (event.keyCode >= 65 && event.keyCode <= 90))) {
						if (this.showOptionsPanel && this.enableSearchFilter) {
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
		this.filteredOptions = this.getMatches(searchText, (this.searchType == "startsWith"));
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
		const closestMatches: Array<AbcOptionComponent> = this.getMatches(this.keyupSearchText, true);
		const closestMatchesArrayLength: number = closestMatches.length;
		if (closestMatchesArrayLength > 0) {
			const firstMatchIndex: number = this.getOptionIndex(this.options, closestMatches[0].value);
			const lastMatchIndex: number = this.getOptionIndex(this.options, closestMatches[closestMatchesArrayLength - 1].value);
			const selectedOptionIndex: number = this.getOptionIndex(this.options, this.val);
			let selectedIndex: number = firstMatchIndex;
			if (selectedOptionIndex >= firstMatchIndex && selectedOptionIndex < lastMatchIndex) {
				closestMatches.some((option: AbcOptionComponent) => {
					const optionIndex: number = this.getOptionIndex(this.options, option.value);
					if (optionIndex > selectedOptionIndex) {
						selectedIndex = optionIndex;
						return true;
					}
				})
			}
			this.setValue(this.filteredOptions[selectedIndex]);
		}
	}

	/**
	 * Returns a list of options that match with a given search text. This method takes care of all languages and accented characters. The comparisons
	 * for accented characters are done by replacing both the search text and the options with their normal English non-accented counter-parts.
	 * @param searchText The search key entered by the user
	 */
	getMatches(searchText: string, startsWith: boolean): Array<AbcOptionComponent> {
		const formattedSearchText: string = this.service.replaceAccentedCharacters(searchText.toLowerCase());
		const method: Function = startsWith ? (text1: string, text2: string) => {
			return (text1.indexOf(text2) == 0);
		} : (text1: string, text2: string) => {
			return (text1.includes(text2));
		}
		return this.options.filter((option: AbcOptionComponent) => {
			const optionText: string = this.service.replaceAccentedCharacters(option.text.toLowerCase());
			return method(optionText, formattedSearchText);
		});
	}

	/**
	 * Method triggered when the user focusses on the search bar. This method prevents the form field blur
	 * event from being triggered.
	 * @param _event
	 */
	focusSearchBar(_event?: Event) {
		const optionsPanelRef: HTMLElement = this.optionsPanelRef.instance.elementRef.nativeElement;
		const optionSearchFilterInput: HTMLElement = <HTMLElement>optionsPanelRef.querySelector("#" + this.id + "OptionSearchField");
		if (optionSearchFilterInput) {
			optionSearchFilterInput.focus();
			this.searchBarFocussed = true;
			this.optionPanelEventTriggered = true;
			setTimeout(() => { this.optionPanelEventTriggered = false; }, 300);
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
		if (this.optionsPanelRef) {
			const selectedOptionIndex = this.getOptionIndex(this.filteredOptions, this.val);
			const optionsPanelRef: HTMLElement = this.optionsPanelRef.instance.elementRef.nativeElement;
			const options: any = optionsPanelRef.querySelectorAll(".abc-form-element-option");
			const activeOptionIndex: number = this.addResetOption ? selectedOptionIndex + 1 : selectedOptionIndex;
			const activeOption: HTMLElement = options[activeOptionIndex];
			const optionsPanel: HTMLElement = optionsPanelRef.querySelector(".abc-form-element-options-list");
			if (this.showOptionsPanel && this.design == "material" && this.designModifier == "custom" && selectedOptionIndex >= this.minOptionIndex) {
				if ((activeOption && optionsPanel) && !this.isVisibleInResultsPanel(activeOption, optionsPanel)) {
					if (arrowDirection == "UP") {
						optionsPanel.scrollTop = activeOption.offsetTop;
					} else if (arrowDirection == "DOWN") {
						optionsPanel.scrollTop = (activeOption.clientHeight - (optionsPanel.clientHeight - activeOption.offsetTop));
					}
				}
			} else if (selectedOptionIndex == -1) {
				optionsPanel.scrollTop = 0;
			}
		}
	}

	/**
	 * Finds the index of a given option in the list of options
	 * @param options
	 */
	getOptionIndex(options: Array<AbcOptionComponent>, value: string): number {
		return options.findIndex((option: AbcOptionComponent) => (option["value"] == value));
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
	 * This method ensures that the user is able to use the back button to close the drop-down
	 * This is applicable only for the custom drop-down. For native drop-downs, it behaves as
	 * per the default settings of the OS
	 * @param state Possible values are "open" and "close"
	 */
	setOptionsPanelEnvironment(state: string) {
		if (this.designModifier == "custom") {
			if (state == "open" && !this.showOverlayOptionsPanel) {
				setTimeout(() => { this.showOverlayOptionsPanel = true; }, 200);
				/**
				 * If we use the overlay panel on mobile, we need to prevent the browser from storing thescroll
				 * position, create a new dummy state and then prevent the background from scrolling. We need to
				 * prevent the scroll position from being stored by setting history.scrollRestoration to "manual"
				 * since if the user tries to press the back button after opening the drop-down panel and scrolls
				 * down before selecting an option, then once the panel is closed, the page scrolls back up or
				 * down to the previous scroll position and this looks bad
				 */
				if (enableMobileBackButtonToDismiss && this.isMobileView && !this.isDummyHistoryState) {
					this.isDummyHistoryState = true;
					history.scrollRestoration = "manual";
					history.pushState({ obsolete: true }, document.title, location.href);
				}
			} else if (state == "close" && this.showOverlayOptionsPanel) {
				this.showOverlayOptionsPanel = false;
				// If we use the overlay panel, then on closing it, we need to go back to the original state that the user was one so that
				// the user isn"t hindered when using the browser navigation buttons
				if (enableMobileBackButtonToDismiss && this.isDummyHistoryState) {
					history.back();
					history.scrollRestoration = "auto";
					this.isDummyHistoryState = false;
				}
			}
		}
	}

	/**
	 * If the component is removed from the DOM, ensure that the drop-down panel is alos destroyed
	 */
	ngOnDestroy() {
		if (this.showOptionsPanel) {
			this.setOptionsPanelVisibility(false);
		}
	}

	/**
	 * Detect when the user start"s a browser navigation flow. When the user tries to navigate using the browser"s navigation
	 * options, we need to close the options panel
	 */
	@HostListener("window:popstate")
	onPopState() {
		if (enableMobileBackButtonToDismiss && this.showOverlayOptionsPanel && this.isDummyHistoryState) {
			this.isDummyHistoryState = false;
			this.setOptionsPanelVisibility(false);
			this.searchBarFocussed = false;
			this.resetSearchFilter();
		}
	}

	/**
	 * Detect when the user resizes their browser or changes the orientation of their device. This helps in resetting the viewport
	 * parameters
	 */
	@HostListener("window:resize")
	@HostListener("window:orientationchange")
	onResize() {
		this.isMobileView = this.service.checkViewPort("mobile");
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