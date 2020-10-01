import {
	Component, Type, ComponentFactoryResolver, ViewChild,
	OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef,
	ElementRef, TemplateRef, HostListener, ViewEncapsulation
} from '@angular/core';
import { InsertionDirective } from './abc-insertion.directive';
import { AbcDialogRef } from "./abc-dialog.ref";
import { AbcDialogCTA, AbcDialogLoader } from './abc-dialog.config';
import { Subscription } from 'rxjs';
import { AbcDtmData, icons, translations, screenReaderClass, AbcService } from "../utils";

/**
 * BETA - If you want to allow the user to dismiss a drop-down by clicking the back button
 * of their phone (or swiping back), then set this to true. Set as false if you would
 * like to disable it
 */
const enableBackButtonToDismiss: boolean = true;

/**
 * This component is dynamically injected into the DOM whenver a new dialog is opened
 */
@Component({
	selector: 'abc-dialog',
	templateUrl: './abc-dialog.template.html',
	styleUrls: [
		"../styles/abc-common.scss",
		"./styles/abc-dialog.style.scss",
		"./styles/abc-dialog.appearances.scss"
	],
	encapsulation: ViewEncapsulation.None
})
export class AbcDialogComponent implements AfterViewInit, OnDestroy {

	/**
	 * This checks the DOM for the DOM element which will render the dialog
	 * body when using a component. The DOM element is identified by using
	 * the insertionDirective
	 */
	@ViewChild(InsertionDirective) insertionPoint: InsertionDirective;

	/**
	 * This stores the unique index of the dialog.
	 */
	dialogRefIndex: number;

	/**
	 * This is the unique ID of the dialog. You can pass it as a parameter
	 * when you open the dialog as part of the AbcDialogConfig or an auto-generated
	 * ID will be assigned to it by default if no ID is passed. It is also used to
	 * generate IDs for all the major elements in the dialog like the header,
	 * footer, body, close button etc.
	 */
	id: string;

	/**
	 * This stores the last active element in the DOM. When the dialog is closed,
	 * we move the browser focus to this element. This is useful for accessibility users.
	 */
	lastActiveElement: HTMLElement = this.getLastActiveElement();

	/**
	 * This parameter is used as the heading of the dialog.
	 */
	heading: string = "";

	/**
	 * Headings are useful for screen-readers so it's always recommended to have one for dialogs, but if the
	 * heading should not be displayed for regular users, set this opton to true. By default, this is set to
	 * false.
	 */
	hideHeading: boolean = false;

	/**
	 * This parameter determines the width of the dialog on desktop and tablet viewports.
	 * On mobile, dialogs are always full width. Possible values are '480' (480px), '560' (560px),
	 * '640' (640px), '720' (720px).
	 */
	size: number = 480;

	/**
	 * If you want to inject a component to be displayed as the body of the dialog,
	 * pass it as the component in the AbcDialogConfig.
	 */
	childComponentType: Type<any>;

	/**
	 * When using a component to render the body of the dialog, this variable is used to
	 * reference that component so when the dialog is closed, the component can be destroyed
	 * by calling its ngOnDestroy life-cycle hook.
	 */
	componentRef: ComponentRef<any>;

	/**
	 * If you want to inject a template to be displayed as the body of the dialog,
	 * pass it as the template in the AbcDialogConfig.
	 */
	templateRef: TemplateRef<any>;

	/**
	 * If you want to simply pass a resource key to be rendered in the body of the dialog,
	 * pass the resource key as bodyText in AbcDialogConfig.
	 */
	bodyText: string;

	/**
	 * This helps in toggling between different designs for the dialog. Currently, we have
	 * two designs - "default" and "kilo"
	 */
	theme: string = "default";

	/**
	 * This helps in toggling between different typography themes for the dialog. Currently, we have
	 * two typography sets - "default" and "kilo"
	 */
	typography: string = "default";

	/**
	 * If the dialog should stretch full screen on mobile viewports irrespective of the content
	 * of the body, then pass the value as true. If the dialog should only occupy the height of the
	 * content, pass the value as false. By default, all dialogs will have this value set to true
	 * since that's usually the requirment.
	 */
	fullScreenOnMobile: boolean = true;

	/**
	 * If the dialog body should have a scroll-bar when the content overflows, then pass this
	 * parameter as true. If instead the dialog overlay should scroll, then pass this as false in the
	 * AbcDialogConfig. By default, all dialogs will have this value set as true.
	 */
	contentScrollEnabled: boolean = true;

	/**
	 * Use this parameter to determine whether clicking on the dialog overlay should close the dialog.
	 * This is set to true by default. This can be dynamically changed if required by using the
	 * AbcDialogRef method updateDialogConfig and setting it to false. This feature is useful when you
	 * wish to block overlay clicks while an API call is on-going.
	 */
	overlayClickEnabled: boolean = true;

	/**
	 * Use this parameter to block the user from being able to close any dialogs. This will remove the
	 * cross button in the header of the dialog and will prevent all manual close events by the user.
	 * This is useful when the user's session has expired for example and they should no longer be
	 * allowed to interact with the application until they click on a CTA.
	 */
	dialogCloseEnabled: boolean = true;

	/**
	 * This is the list of CTA buttons to be displayed in the footer of the dialog. Each CTA is of type
	 * AbcDialogCTA. More details of this model can be found in abc-dialog.config
	 */
	CTAs: AbcDialogCTA[] = [];

	/**
	 * If you wish to pass a template to be displayed in the footer of the dialog, use this parameter.
	 * It supports any basic HTML and is useful when you need to have any additional content displayed
	 * in the footer other than the usualy CTAs.
	 */
	footerTemplate: TemplateRef<any>;

	/**
	 * Pass a class (or classes) for any customisation for the entire dialog
	 */
	dialogCustomClass?: string = "";

	/** Pass a class (or classes) if any customisations need to be done to the overlay of the dialog
	 */
	overlayClass?: string;

	/**
	 * Pass a class (or classes) if any customisations need to be done to the body of the dialog
	 */
	bodyPanelClass: string = "";

	/**
	 * Pass a class (or classes) if any customisations need to be done to the footer of the dialog
	 */
	footerPanelClass: string = "";

	/**
	 * To add data analytics tracking values to the close button of the dialog, use this parameter of
	 * type AbcDtmData. More details of this model in abc-dialog.config
	 */
	closeButtonDTM: AbcDtmData = {};

	/**
	 * This parameter is used when the dialog is being closed. It helps in setting the fade out
	 * animation of the dialog
	 */
	closing: boolean = false;

	/**
	 * This object is used for configuring the loader displayed within the dialog. This is useful
	 * when you want to prevent user interactions during an asynchronous process
	 */
	loader: AbcDialogLoader = { showLoader: false };

	/**
	 * This parameter is used for determining whether the entry animation should be used for a
	 * dialog component. This useful when the dialog is opened with a loader from the start
	 */
	animateLoader: boolean = true;

	/**
	 * This determines whether the dialog should be closed in case the app navigates to a new page either
	 * by user interaction or when we programmatically navigate the user. By default this will be set to true
	 */
	closeOnNavigation: boolean;

	/**
	 * Stores the reference to the dialogRef.onClose subscription
	 */
	onClose: Subscription;

	/**
	 * This stores the URL at the time of opening the dialog
	 */
	initialUrlPathname: string = window.location.pathname;

	/**
	 * This object is used to control the scroll box shadow display
	 */
	scrollBoxShadow: { top: boolean, bottom: boolean } = { top: false, bottom: false };

	/**
	 * This stores the set of icon font classes used in the components
	 */
	icons: any = icons;

	/**
	 * This is used to store the set of resource keys used for translations
	 */
	translations: any = translations;

	/**
	 * This string stores the class used to determine screen reader elements. It ensures that elements is not
	 * visible to regular users but is still picked up assisstive technology.
	 */
	screenReaderClass: string = screenReaderClass;

	/**
	 * Stores the text-direction of the application. This is used to detect orientation for languages like
	 * Arabic where the language is written and read from right to left.
	 */
	textDirection: "ltr" | "rtl" = this.service.getTextDirection();

	/**
	 * This attribute stores the reference to the targetted parent element for the dialog (if any)
	 */
	targetParent: any;

	/**
	 * This parameter checks if the current browser history state was manually added by the dialog
	 */
	isDummyHistoryState: boolean = false;

	/**
	 * @ignore
	 * @param componentFactoryResolver 
	 * @param cd 
	 * @param elementRef 
	 * @param dialogRef 
	 * @param service 
	 */
	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private cd: ChangeDetectorRef,
		public elementRef: ElementRef,
		private dialogRef: AbcDialogRef,
		private service: AbcService
	) { }

	/**
	 * Set the dialog environment once it is rendered in the DOM. This includes setting the dummy
	 * history state, the scroll box shadows, the initial focus state and subscribing to dialog
	 * close events
	 */
	ngAfterViewInit(): void {
		this.setDummyHistoryState();
		this.toggleScrollBoxShadows();
		this.setInitialFocusState();
		this.loadChildComponent();
		this.cd.detectChanges();
		this.onClose = this.dialogRef.onClose.subscribe((data: any) => {
			this.dialogCloseEnabled = true;
			this.close(data);
			this.onClose.unsubscribe();
		});
	}

	/**
	 * This method sets a dummy state in the browser history so that clicking the browser
	 * back button can be used to dismiss just the dialog rather than navigating back to
	 * the previous page
	 */
	setDummyHistoryState() {
		if (enableBackButtonToDismiss && !this.isDummyHistoryState) {
			this.isDummyHistoryState = true;
			history.scrollRestoration = "manual";
			history.pushState({ obsolete: true }, document.title, location.href);
		}
	}

	/**
	 * This method is used to reset the dummy history state injected when opening the dialog
	 */
	resetDummyHistoryState() {
		if (enableBackButtonToDismiss && this.isDummyHistoryState) {
			this.isDummyHistoryState = false;
			history.back();
			history.scrollRestoration = "auto";
		}
	}

	/**
	 * Store the last element which was in focus so that once the dialog is
	 * closed, the browser focus can be placed on this element
	 */
	getLastActiveElement(): HTMLElement {
		return <HTMLElement>document.activeElement;
	}

	/**
	 * This moves the browser focus to the heading of the dialog. If no heading is present
	 * (for some reason), the focus is placed on the main dialog container
	 */
	setInitialFocusState(): void {
		setTimeout(() => {
			if (this.elementRef.nativeElement.querySelector(".abc-dialog-heading")) {
				(<HTMLElement>this.elementRef.nativeElement.querySelector(".abc-dialog-heading")).focus();
			} else {
				(<HTMLElement>this.elementRef.nativeElement.querySelector("#" + this.id)).focus();
			}
		}, 500);
	}

	/**
	 * This method checks if the dialog overlay was clicked. If overlayClickEnabled is true,
	 * then the dialog is closed
	 * @param _event
	 */
	onOverlayClick(_event: MouseEvent): void {
		if (this.overlayClickEnabled
			&& !this.loader.showLoader
			&& !(this.elementRef.nativeElement as HTMLElement).classList.contains("abc-dialog-close-disabled")) {
			this.close();
		}
	}

	/**
	 * This method is used to stop an overlay click for being detected if the user actually
	 * clicked on the body of the dialog
	 * @param event 
	 */
	onDialogClick(event: MouseEvent): void {
		event.stopPropagation();
	}

	/**
	 * If a component is used for rendering the body of the dialog, this method injects the
	 * component and sets the reference to the component
	 */
	loadChildComponent(): void {
		if (this.childComponentType) {
			const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.childComponentType);
			const viewContainerRef = this.insertionPoint.viewContainerRef;
			viewContainerRef.clear();
			this.componentRef = viewContainerRef.createComponent(componentFactory);
		}
	}

	/**
	 * This is used to determine when any of the footer CTAs are clicked. It emits the CTA
	 * object back to the dialogRef. You can observe events on these CTAs by subscribing to
	 * dialogCTAClick observable. If you want any of the CTAs to simply close the dialog,
	 * pass the callback string as "close" in the CTA object
	 * @param CTA 
	 */
	dialogCTAClick(CTA: AbcDialogCTA): void {
		if (!this.loader.showLoader) {
			if (CTA && CTA.callback == "close") {
				this.close();
			} else {
				this.dialogRef.dialogCTAClick(CTA);
			}
		}
	}

	/**
	 * This method is used to set the scroll-box shadows on the dialog body.
	 */
	toggleScrollBoxShadows(): void {
		const bodyContent: HTMLElement = this.elementRef.nativeElement.querySelector(".abc-dialog-body");
		const hasScrollBar: boolean = bodyContent.clientHeight < bodyContent.scrollHeight;
		const isScrolledToTop: boolean = Math.floor(bodyContent.scrollTop) == 0;
		const isScrolledToBottom: boolean = Math.floor(bodyContent.scrollHeight - bodyContent.scrollTop - bodyContent.clientHeight) <= 1;
		this.scrollBoxShadow.top = hasScrollBar && !isScrolledToTop;
		this.scrollBoxShadow.bottom = hasScrollBar && !isScrolledToBottom;
	}

	/**
	 * This method is called when the dialog is closed
	 */
	close(data?: any): void {
		if (this.dialogCloseEnabled) {
			this.closing = true;
			setTimeout(() => {
				this.dialogRef.close(data);
				this.dialogRef.destroy(data);
				this.resetDummyHistoryState();
			}, 500);
		}
	}

	/**
	 * This method is called when the user presses the Escape key. The dialog
	 * should only close if the user is not focussing on a select drop-down
	 */
	onEscape(): void {
		if (!this.loader.showLoader) {
			const activeElement: HTMLElement = document.activeElement as HTMLElement;
			if (activeElement.tagName == "SELECT"
				|| (this.elementRef.nativeElement as HTMLElement).classList.contains("abc-dialog-close-disabled")) {
				return;
			} else {
				this.close();
			}
		}
	}

	/**
	 * On closing the dialog, the browser focus is placed on the DOM element that
	 * was last active before the dialog was opened. If a component was used to
	 * render the body, we call the ngOnDestroy method of the component
	 */
	ngOnDestroy(): void {
		this.onClose && !this.onClose.closed && this.onClose.unsubscribe();
		this.lastActiveElement && this.lastActiveElement.focus();
		if (this.componentRef) {
			this.componentRef.destroy();
		}
	}

	/**
	 * Detect when the user start's a browser navigation flow. When the user tries to navigate using the browser's navigation
	 * options, we need to close the options panel
	 */
	@HostListener("window:popstate")
	onNavigation() {
		if (this.closeOnNavigation) {
			const currentUrlPathname: string = window.location.pathname;
			const visibleOverlays: NodeList = document.querySelectorAll("abc-dialog, abc-overlay");
			const lastOverlay: HTMLElement = visibleOverlays[visibleOverlays.length - 1] as HTMLElement;
			if ((this.initialUrlPathname != currentUrlPathname) || (enableBackButtonToDismiss && this.isDummyHistoryState && (lastOverlay == this.elementRef.nativeElement))) {
				this.isDummyHistoryState = false;
				this.dialogCloseEnabled = true;
				this.close();
			}
		}
	}
}