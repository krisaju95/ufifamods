import {
    Injectable, Injector, ComponentFactoryResolver,
    EmbeddedViewRef, ApplicationRef, Component,
    TemplateRef, ComponentRef, HostListener, ElementRef
} from '@angular/core';
import { AbcService } from './abc-service';

/**
 * The overlay target interface is used to configure the type of overlay you wish to render.
 * This is useful when you want to align the overlay with respect to another element or you
 * wish to make changes to other visible elements in the DOM.
 */
export interface AbcOverlayTarget {
    /**
     * If you want to align the overlay to another element in the DOM
     */
    element: HTMLElement;

    /**
     * Should the overlay be positioned above or below the "element"
     */
    position?: 'top' | 'bottom';

    /**
     * Should it always follow the value of "position" or can it re-align to the top if there's no scroll
     * space at the bottom of the element
     */
    strictPosition?: boolean;

    /**
     * If there needs to be some margin between the overlay and the "element"
     */
    margin?: number;

    /**
     * Should the overlay position be re-calculated if the user scrolls the window
     */
    reAlignElementOnScroll?: boolean;

    /**
     * Should the background scroll be locked for all viewports
     */
    blockBackgroundScroll?: boolean;

    /**
     * Should the background scroll be locked specifically for mobile
     */
    blockBackgroundScrollMobileOnly?: boolean;

    /**
     * If the overlay is within a dialog, should the dialog scroll be locked
     */
    blockParentDialogScroll?: boolean;

    /**
     * If an element within the overlay needs to have a max-height set based on the available space
     * in the window, pass the selector of that element
     */
    setMaxHeightToElement?: string;
}

/**
 * This service is used to create an overlay element over the DOM dynamically.
 */
@Injectable()
export class AbcOverlay {

    /**
     * This stores the reference to the overlay created for displaying toast messages.
     * This allows multiple toast messages to be displayed one below the other
     */
    toastMessageOverlayRef: ComponentRef<AbcOverlayComponent>;

    /**
     * @ignore
     * @param componentFactoryResolver 
     * @param appRef 
     * @param injector 
     */
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    /**
     * Pass the template reference for the element you wish to render within the overlay. You can
     * also pass a target element if you want to align the overlay to another element
     * @param template 
     * @param target 
     * @param type 
     */
    injectOverlay(template: TemplateRef<any>, target?: AbcOverlayTarget, type?: string): {
        overlayRef: ComponentRef<AbcOverlayComponent>,
        templateRef: TemplateRef<any>,
        index: number
    } {
        if (type != "toast" || !this.toastMessageOverlayRef) {
            const componentRef: ComponentRef<AbcOverlayComponent> = this.createOverlayComponent();
            componentRef.instance.templates = [template];
            componentRef.instance.target = target;
            componentRef.instance.type = type;
            if (type == "toast") {
                this.toastMessageOverlayRef = componentRef;
            }

            return {
                overlayRef: componentRef,
                templateRef: template,
                index: componentRef.instance.templates.length
            };

        } else {
            this.toastMessageOverlayRef.instance.templates.push(template);

            return {
                overlayRef: this.toastMessageOverlayRef,
                templateRef: template,
                index: this.toastMessageOverlayRef.instance.templates.length
            };
        }
    }

    /**
     * If you just want to create a background fade overlay to bring attention to a specific
     * element of the screen, then call this method and pass the element reference as a parameter.
     * NOTE: This temporarily modifies the z-index of the element while the overlay is visible
     */
    showElementFocusHighlightOverlay(element: HTMLElement): ComponentRef<AbcOverlayComponent> {
        if (element) {
            const componentRef: ComponentRef<AbcOverlayComponent> = this.createOverlayComponent();
            componentRef.instance.highlightElementOnFocus = element;

            return componentRef;
        }
    }

    /**
     * Call this method when you wish to remove the overlay from the DOM
     * @param componentRef 
     */
    removeOverlay(componentRef: ComponentRef<AbcOverlayComponent>): void {
        if (componentRef) {
            this.appRef.detachView(componentRef.hostView);
            componentRef.destroy();
        }
    }

    /**
     * This is a private method that creates a component in the DOM dynamically
     */
    private createOverlayComponent(): ComponentRef<AbcOverlayComponent> {
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(AbcOverlayComponent)
            .create(this.injector);

        this.appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        document.body.appendChild(domElem);

        return componentRef
    }
}

/**
 * This is the component that the overlay dynamically injects. It projects the template that is passed
 * and handles all the alignment logic
 */
@Component({
    selector: "abc-overlay",
    template: `<ng-container *ngFor="let template of templates" [ngTemplateOutlet]="template"></ng-container>`,
    styleUrls: ["./abc-overlay.style.scss"]
})
export class AbcOverlayComponent {

    /**
     * This is used to identify the type of overlay
     */
    type: string;

    /**
     * This stores the set of ng-templates being rendered in the overlay
     */
    templates: TemplateRef<any>[] = [];

    /**
     * This stores the target config object for the overlay
     */
    target: AbcOverlayTarget;

    /**
     * This stores a reference to the body element of the HTML DOM
     */
    body: HTMLElement = document.querySelector("body");

    /**
     * This stores a reference to the dialog component (if the overlay was
     * within a dialog)
     */
    dialogRef: HTMLElement;

    /**
     * This attribute is used to set focus to a given element by simply fading out the background
     * content with a translucent overlay
     */
    highlightElementOnFocus: HTMLElement;

    /**
     * When you use the highlight element option, then we set a temporary z-index to the highlighted element.
     * In such cases, we store the initial z-index in this variable so that once it's closed we can assign
     * it back to the element
     */
    initialZindex: string;

    /**
     * @ignore
     * @param elementRef 
     * @param service 
     */
    constructor(
        public elementRef: ElementRef,
        private service: AbcService
    ) { }

    /**
     * Prepares the DOM for a new overlay. This also injects necessary classes to related elements
     */
    ngAfterViewInit() {
        this.alignElementToTarget();
        const element: HTMLElement = this.elementRef.nativeElement;
        if (this.target) {
            if (this.target.blockBackgroundScroll) {
                element.classList.add("abc-overlay-scroll-block-enabled");
                this.blockBackgroundScroll(this.body);
            } else if (this.target.blockBackgroundScrollMobileOnly) {
                element.classList.add("abc-overlay-scroll-block-xs-enabled");
                this.body.classList.add("abc-overlay-scroll-block-xs");
            }

            if (this.target.blockParentDialogScroll) {
                const dialog: HTMLElement = <HTMLElement>Array.from(this.body.querySelectorAll("abc-dialog")).find((dialog: HTMLElement) => {
                    return dialog.contains(this.target.element);
                });

                if (dialog) {
                    this.dialogRef = dialog;
                    const relevantOverlays: number = +(dialog.getAttribute("abc-relevant-overlays") || "0") + 1;
                    dialog.setAttribute("abc-relevant-overlays", (relevantOverlays).toString());

                    const dialogWrapper: HTMLElement = this.dialogRef.querySelector(".abc-theme-dialog");
                    const dialogOverlay: HTMLElement = this.dialogRef.querySelector(".abc-dialog-overlay");
                    const dialogContent: HTMLElement = this.dialogRef.querySelector(".abc-dialog");
                    const dialogBody: HTMLElement = this.dialogRef.querySelector(".abc-dialog-body");
                    if (!dialogWrapper.classList.contains("abc-dialog-has-target-parent")) {
                        this.blockBackgroundScroll(dialogOverlay);
                    }
                    if (!dialogContent.classList.contains("abc-dialog-content-scrollbar-disabled")) {
                        this.blockBackgroundScroll(dialogBody);
                    }

                    dialog.classList.add("abc-dialog-close-disabled");
                }
            }
        } else {
            element.classList.add("abc-overlay-fixed-element");

            if (this.highlightElementOnFocus) {
                element.classList.add("abc-overlay-fade-background");
                this.initialZindex = this.highlightElementOnFocus.style.zIndex;
                this.highlightElementOnFocus.style.zIndex = "1001";
            }
        }

        if (this.type == "toast") {
            element.classList.add("abc-higher-order-overlay");
        }
    }

    /**
     * This method is responsible for aligning the overlay on the screen to a target element (if provided)
     */
    alignElementToTarget() {
        if (this.target && this.elementRef && this.elementRef.nativeElement) {
            const element: HTMLElement = this.elementRef.nativeElement;
            const targetElement: HTMLElement = this.target.element;
            const body: HTMLElement = document.body;
            const targetElementRect: DOMRect = this.service.getBoundingClientRect(targetElement);
            const positionMargin: number = this.target.margin || 0
            const positionModifier: number = this.target.position == "top" ? -positionMargin : (targetElement.clientHeight + positionMargin);
            const windowScrollX: number = window.scrollX || window.pageXOffset;
            const windowScrollY: number = window.scrollY || window.pageYOffset;

            if (this.target.setMaxHeightToElement && this.target.setMaxHeightToElement) {
                const maxHeightElement: HTMLElement = this.elementRef.nativeElement.querySelector(this.target.setMaxHeightToElement);
                const isOverflowHidden: boolean = (window.getComputedStyle(body).overflow == "hidden");
                const bodyHeight: number = isOverflowHidden ? body.clientHeight : body.scrollHeight;
                maxHeightElement.style.maxHeight = "";
                const currentMaxHeight: number = +(window.getComputedStyle(maxHeightElement).maxHeight.split("px")[0]);
                maxHeightElement.style.maxHeight = Math.min(currentMaxHeight, (bodyHeight - 50)) + "px";
            }

            element.classList.add("abc-overlay-aligned-element");
            element.style.left = windowScrollX + targetElementRect.x + "px";
            element.style.width = targetElementRect.width + "px";

            if (this.target.position == "top"
                || (!this.target.strictPosition
                    && ((element.clientHeight + targetElementRect.y + positionModifier) > window.innerHeight)
                    && (targetElementRect.y > (window.innerHeight - targetElementRect.y - targetElementRect.height)))) {
                if ((element.clientHeight + 20) > targetElementRect.y) {
                    element.style.top = (windowScrollY + 20) + "px";
                } else {
                    element.style.top = (windowScrollY + targetElementRect.y - element.clientHeight) + "px";
                }
            }
            else {
                const isOverflowHidden: boolean = (window.getComputedStyle(body).overflow == "hidden");
                const bodyHeight: number = isOverflowHidden ? body.clientHeight : body.scrollHeight;
                const windowScrollOffset: number = isOverflowHidden ? 0 : windowScrollY;
                if ((windowScrollOffset + targetElementRect.y + positionModifier + element.clientHeight + 20) > bodyHeight) {
                    element.style.top = (windowScrollY + window.innerHeight - element.clientHeight - 20) + "px";
                } else {
                    element.style.top = (windowScrollY + targetElementRect.y + positionModifier) + "px";
                }
            }
        }
    }

    /**
     * This method is called in order to set the background scroll as locked for a given element
     * @param element 
     */
    blockBackgroundScroll(element: HTMLElement): void {
        if (element) {
            const currentElementPaddingRight: number = +(window.getComputedStyle(element).paddingRight.split("px")[0]);
            element.style.paddingRight = (currentElementPaddingRight + this.service.getScrollBarWidth(element)) + "px";
            element.classList.add("abc-overlay-scroll-block");
        }
    }

    /**
     * This method is called in order to unlock the background scroll of a given element
     * @param element 
     */
    allowBackgroundScroll(element: HTMLElement): void {
        if (element) {
            element.style.paddingRight = "";
            element.classList.remove("abc-overlay-scroll-block");
        }
    }

    /**
     * Reset the DOM elements around the overlay on removing the overlay from the view
     */
    ngOnDestroy() {
        if (this.target) {
            const overlayElements: any = document.querySelectorAll(".abc-overlay-scroll-block-enabled") || [];
            const overlayXsElements: any = document.querySelectorAll(".abc-overlay-scroll-block-xs-enabled") || [];
            if (this.target.blockBackgroundScroll && overlayElements.length <= 1) {
                this.body.classList.remove("abc-overlay-scroll-block");
            } else if (this.target.blockBackgroundScrollMobileOnly && overlayXsElements.length <= 1) {
                this.body.classList.remove("abc-overlay-scroll-block-xs");
            }
            if (this.target.blockParentDialogScroll && this.dialogRef) {
                const dialogWrapper: HTMLElement = this.dialogRef.querySelector(".abc-theme-dialog");
                const dialogOverlay: HTMLElement = this.dialogRef.querySelector(".abc-dialog-overlay");
                const dialogContent: HTMLElement = this.dialogRef.querySelector(".abc-dialog");
                const dialogBody: HTMLElement = this.dialogRef.querySelector(".abc-dialog-body");
                if (!dialogWrapper.classList.contains("abc-dialog-has-target-parent")) {
                    this.allowBackgroundScroll(dialogOverlay);
                }
                if (!dialogContent.classList.contains("abc-dialog-content-scrollbar-disabled")) {
                    this.allowBackgroundScroll(dialogBody);
                }
                const relevantOverlays: number = +(this.dialogRef.getAttribute("abc-relevant-overlays") || "1") - 1;
                this.dialogRef.setAttribute("abc-relevant-overlays", (relevantOverlays).toString());
                if (relevantOverlays == 0) {
                    this.dialogRef.classList.remove("abc-dialog-close-disabled");
                }
            }
        } else if (this.highlightElementOnFocus) {
            this.highlightElementOnFocus.style.zIndex = this.initialZindex;
        }
    }

    /**
     * On browser scroll and resize events, re-align the overlay if required
     */
    @HostListener("window:scroll")
    @HostListener("window:resize")
    @HostListener("window:orientationchange")
    onScroll() {
        if (this.target && this.target.reAlignElementOnScroll) {
            this.alignElementToTarget();
        }
    }
}