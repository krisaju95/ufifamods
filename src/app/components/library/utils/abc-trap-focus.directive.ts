import { Directive, ElementRef, HostListener } from '@angular/core';
import { AbcService } from "./abc-service";

/**
 * This constant stores the list of all focussable elements in the DOM.
 */
const focusableElementsString: string = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

/**
 * This directive ensures that once the users focus enters the DOM within the host element,
 * all tab presses after that will be retained within the host and prevent the user from
 * escaping the host element.
 */
@Directive({ selector: "[abcTrapFocus]" })
export class AbcTrapFocusDirective {

	/**
	 * @ignore
	 * @param elementRef 
	 * @param service 
	 */
	constructor(
		private elementRef: ElementRef,
		private service: AbcService
	) { }

	/**
	 * This method checks for button keypresses on or within the host element and ensures that on reaching
	 * the last "focussable" element, the tab focus order cycles back to the first element. Similarly for
	 * shift tabs, once it reached the first element, it will cycle back to the last element.
	 * @param event 
	 */
	@HostListener("keydown", ["$event"])
	onKeyDown(event: KeyboardEvent): void {
		if (this.service.checkIfKeyPressed(event, "TAB")) {
			const focussableElements: any[] = this.elementRef.nativeElement.querySelectorAll(focusableElementsString);
			const visibleElements: any[] = (Array.from(focussableElements)).filter((element: any) => { return window.getComputedStyle(element).display != "none"; });
			const numberOfFocusableItems: number = visibleElements.length;
			const activeElementIndex: number = visibleElements.indexOf(document.activeElement);

			if (event.shiftKey) {
				if (activeElementIndex == 0) {
					visibleElements[numberOfFocusableItems - 1] && visibleElements[numberOfFocusableItems - 1].focus();
					event.preventDefault();
				}

			} else {
				if (activeElementIndex == (numberOfFocusableItems - 1)) {
					visibleElements[0] && visibleElements[0].focus();
					event.preventDefault();
				}
			}
		}
	}
}