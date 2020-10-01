import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { AbcService } from "../utils";

/**
 * This directive is used to control the display of a focus ring around active DOM elements
 * This ring is configured to display only when the user is navigating through the application
 * with their keyboard.
 * 
 * NOTE: If you wish to always show the focus ring on the active element irrespective of whether
 * the user is using their keyboard or their mouse, you can remove the directive and just place
 * the class "abc-focus-ring-active" on the body element of your page
 */
@Component({
	selector: "abc-focus-ring",
	template: ``,
	styleUrls: ["./abc-focus-ring.style.scss"],
	encapsulation: ViewEncapsulation.None
})
export class AbcFocusRingComponent {

	/**
	 * This stores the reference to the body element of the HTML DOM
	 */
	body: HTMLElement = document.querySelector("body");

	/**
	 * This stores the current state of an operation to ensure multiple operations
	 * don't run at the same time
	 */
	operationComplete: boolean = true;

	/**
	 * @ignore
	 * @param service 
	 */
	constructor(private service: AbcService) { }

	/**
	 * This method sets the focus ring as visible
	 */
	showFocusRing(): void {
		setTimeout(() => { this.body.classList.add("abc-focus-ring-active"); }, 150);
	}

	/**
	 * This method sets the focus ring as invisible
	 */
	hideFocusRing(): void {
		this.body.classList.remove("abc-focus-ring-active");
	}

	/**
	 * This method ensures that click and keypress events are not detected simultaneously
	 */
	startOperationState(): void {
		this.operationComplete = false;
		setTimeout(() => { this.operationComplete = true; }, 100);
	}

	/**
	 * This method detects all key presses and determines whether to hide or show the
	 * focus ring
	 * @param event 
	 */
	@HostListener("body:keydown", ["$event"])
	onKeyDown(event: KeyboardEvent): void {
		this.startOperationState();
		if (this.service.checkIfKeyPressed(event, ["TAB", "ENTER"])) {
			this.showFocusRing();
		}
	}

	/**
	 * This method makes the focus ring invisible if the user starts using their mouse. This
	 * is done so that the focus ring is only visible for keyboard navigation
	 * @param _event 
	 */
	@HostListener("body:click", ["$event"])
	onClick(_event: Event): void {
		if (this.operationComplete) {
			this.hideFocusRing();
		}
	}
}