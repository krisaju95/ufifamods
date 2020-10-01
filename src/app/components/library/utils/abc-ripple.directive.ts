import { Directive, ElementRef, HostListener } from '@angular/core';
import { AbcService } from './abc-service';

/**
 * This directive is used to inject riplles on clicking elements like
 * buttons (similar to the Material Button Ripple effect)
 */
@Directive({
    selector: "[abcRipple]"
})
export class AbcRippleDirective {

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
     * This method checks for mouse clicks on the host element and then injects
     * the ripple effect on the point at which the element was clicked.
     * @param event 
     */
    @HostListener("click", ["$event"])
    onClick(event: MouseEvent): void {
        try {
            const element: HTMLElement = this.elementRef.nativeElement;
            const theme: string = element.getAttribute("abc-ripple-theme") || "dark";
            const target: HTMLElement = (event.target as HTMLElement)
            const rect: DOMRect = this.service.getBoundingClientRect(target);
            const x: number = event.clientX - rect.x;
            const y: number = event.clientY - rect.y;

            const ripple: HTMLSpanElement = document.createElement("span");
            ripple.classList.add("abc-ripple");
            ripple.classList.add(`abc-ripple-theme-${theme}`);
            ripple.style.left = x + "px";
            ripple.style.top = y + "px";

            element.appendChild(ripple);

            setTimeout(() => { ripple.parentElement.removeChild(ripple) }, 1000);
        } catch (error) { }
    }
}