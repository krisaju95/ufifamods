import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewEncapsulation } from "@angular/core";
import { AbcService, AbcDtmData } from "../utils";

/**
 * This component is used to render button elements (or links disguised as buttons)
 */
@Component({
    selector: "abc-button",
    templateUrl: "./abc-button.template.html",
    styleUrls: [
        "./abc-button.style.scss",
        "../styles/abc-ripple.scss"
    ],
    encapsulation: ViewEncapsulation.None
})
export class AbcButtonComponent {

    /**
     * This sets the ID of the button element. If no value is passed, a dynamic ID is set.
     */
    @Input() id: string = this.service.generateElementID();

    /**
     * This parameter is used to determine the type attribute of the button. Possible values are "button",
     * "submit" and "reset". By default, this is set to "button"
     */
    @Input() type: "button" | "submit" | "reset" = "button";

    /**
     * This parameter lets you toggle between different button themes
     */
    @Input() theme: "red" | "blue" = "blue";

    /**
     * This parameter determines the priority level of the button. This changes the appearance of the button.
     * Primary buttons appear the most prominent (usually solid colors), whereas secondary and tertiary buttons
     * appear less prominent.
     */
    @Input() level: "default" | "primary" | "secondary" | "tertiary" = "default";

    /**
     * This parameter determines whether the button's height should be based on the design properties set in
     * the style sheet (default) or based on the content (auto)
     */
    @Input() height: "default" | "auto" = "default";

    /**
     * If the button is meant to behave like a link, you can pass an href attribute and a link will be displayed
     * which looks exactly like a button.
     */
    @Input() href: string;

    /**
     * If an href is passed, the target attribute of the resulting link can be set with this parameter
     */
    @Input() target: "_blank" | "_parent" | "_self" | "_top" = "_top";

    /**
     * Use the title paramter to provide a more descriptive text that will be visible on hovering over
     * the button/link. If this is just meant for screen readers, use the ariaDescribedby parameter instead.
     * Title attributes help users understand what buttons/links are meant for when the label isn't very informative.
     */
    @Input() title: string = "";

    /**
     * This determines whether the button should occupy the full width of the container
     */
    @Input() fullWidth: "always" | "mobile" | "auto" = "auto";

    /**
     * This parameter determines whether the button should be disabled. Such butons are not part of the tab
     * focus order
     */
    @Input() disabled: boolean = false;

    /**
     * This can be used to display a loader inside the button next to the text. It's useful when a button click
     * leads to an action that takes some time to complete. It gives the user the required feedback to let them
     * know that an process is ongoing
     */
    @Input() showInsetLoader: boolean;

    /**
     * Pass a custom role element to set to the button. Ensure that the value is passed with the angular square
     * bracket notation as [role]="'the custom role'". This prevents the role attribute from being set on the
     * host element.
     */
    @Input() role: string;

    /**
     * Pass a custom tabindex value to set to the button. A tabindex value of -1 removes the element from the
     * tab focus order. Ensure that the value is passed with the angular square bracket notation as [tabindex].
     * This prevents the tabindex from being set on the host element.
     */
    @Input() tabIndex: number;

    /**
     * This parameter can be used to make a button appear disabled but still be "focussable". It's used to ensure
     * that click events can be captured while screen readers are still informed of the disabled state.
     */
    @Input() ariaDisabled: boolean = false;

    /**
     * Set a custom aria-label for the button with this parameter
     */
    @Input() ariaLabel: string = "";

    /**
     * Set a custom aria-label for the button with this parameter
     */
    @Input() ariaDescribedBy: string = "";

    /**
     * This parameter is used to determine whether a button is pressed. This is useful for toggle buttons.
     * 
     * From MDN (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role)
     * --------
     * aria-pressed: Defines the button as a toggle button. The value of aria-pressed describes the state of the
     * button. The values include aria-pressed="false" when a button is not currently pressed, aria-pressed="true"
     * to indicate a button is currently pressed, and aria-pressed="mixed" if the button is considered to be
     * partially pressed. If the attribute is omitted or set to its default value of aria-pressed="undefined",
     * the element does not support being pressed.
     */
    @Input() ariaPressed: boolean;

    /**
     * This parameter is used to determine whether a button has let to a set of additional controls being displayed.
     * This is useful for buttons which open menus.
     * 
     * From MDN (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role)
     * --------
     * aria-expanded: If the button controls a grouping of other elements, the aria-expanded state indicates
     * whether the controlled grouping is currently expanded or collapsed.  If the button has aria-expanded="false"
     * set, the grouping is not currently expanded; If the button has aria-expanded="true" set, it is currently
     * expanded; if the button has aria-expanded="undefined" set or the attribute is ommitted, it is not expandable.
     */
    @Input() ariaExpanded: boolean;

    /**
     * Pass any analytics data for this button
     */
    @Input() DTM: AbcDtmData;

    /**
     * This event emitter is used to notify event handlers that the button has been clicked. It prevents disabled
     * buttons from triggering any click event handlers 
     */
    @Output() clicked: EventEmitter<Event> = new EventEmitter<Event>();

    /**
     * This attribute determines whether the button has been clicked and the click event is yet to be emitted.
     * It helps in preventing multiple clicks of the button.
     */
    active: boolean = false;

    /**
     * Stores the text-direction of the application. This is used to detect orientation for languages like
     * Arabic where the language is written and read from right to left.
     */
    @Input() textDirection: "ltr" | "rtl" = this.service.getTextDirection();

    /**
     * @ignore
     * @param service 
     * @param elementRef 
     */
    constructor(
        private service: AbcService,
        private elementRef: ElementRef
    ) { }

    /**
     * Here we can monitor changes to the fullWidth paramter in order to update the button wrapper
     * classes
     */
    ngOnChanges() {
        const element: HTMLElement = (this.elementRef.nativeElement as HTMLElement);
        if (element) {
            if (this.fullWidth == "always") {
                element.classList.add("abc-button-fullWidth");
                element.classList.remove("abc-button-fullWidthXS");
            } else if (this.fullWidth == "mobile") {
                element.classList.add("abc-button-fullWidthXS");
                element.classList.remove("abc-button-fullWidth");
            }
        }
    }

    /**
     * Set the wrapper class to the host element. This also sets the class to determine whether the button
     * should stretch to the full width of the container or not
     */
    ngAfterViewInit() {
        const element: HTMLElement = (this.elementRef.nativeElement as HTMLElement);
        element.classList.add("abc-button-wrapper");
        if (this.fullWidth == "always") {
            element.classList.add("abc-button-fullWidth");
        } else if (this.fullWidth == "mobile") {
            element.classList.add("abc-button-fullWidthXS");
        }
    }

    /**
     * Set a class to the host element when the button is focussed (used for the focus ring directive)
     * @param _event 
     */
    focusButton(_event: Event) {
        (this.elementRef.nativeElement as HTMLElement).classList.add("abc-button-focussed");
    }

    /**
     * Removes the focus class from the host element on blurring
     * @param _event 
     */
    blurButton(_event: Event) {
        (this.elementRef.nativeElement as HTMLElement).classList.remove("abc-button-focussed");
    }

    /**
     * Listen for click events and prevent clicks from propagating if the button is disabled. If the
     * button is enabled then emit the "clicked" event.
     * @param event 
     */
    @HostListener("click", ["$event"])
    onClick(event: Event): void {
        if (this.disabled || this.ariaDisabled || this.showInsetLoader || this.active) {
            event.stopPropagation();
        } else {
            this.active = true;
            setTimeout(() => {
                this.active = false;
                this.clicked.emit(event);
            }, 150);
        }
    }
}