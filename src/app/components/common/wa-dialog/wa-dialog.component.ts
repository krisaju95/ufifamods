import {
	Component, Type, ComponentFactoryResolver, ViewChild,
	OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef,
	ElementRef, TemplateRef, HostListener
} from '@angular/core';
import { InsertionDirective } from './wa-insertion.directive';
import { WADialogRef } from "./wa-dialog.ref";
import { WADialogCTA, DTMData, WADialogLoader } from './wa-dialog.config';
import { Subscription } from 'rxjs';

@Component({
	selector: 'wa-dialog',
	templateUrl: './wa-dialog.template.html'
})
export class WADialogComponent implements AfterViewInit, OnDestroy {

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
	 * when you open the dialog as part of the WADialogConfig or an auto-generated
	 * ID will be assigned to it by default if no ID is passed. It is also used to
	 * generate IDs for all the major elements in the dialog like the header,
	 * footer, body, close button etc.
	 */
	id: string;

	/**
	 * This stores the last active element in the DOM. When the dialog is closed,
	 * we move the browser focus to this element. This is useful for accessibility users.
	 */
	lastActiveElement: HTMLElement;

	/**
	 * This parameter is used as the heading of the dialog.
	 */
	heading: string = "";

	/**
	 * This parameter determines the width of the dialog on desktop and tablet viewports.
	 * On mobile, dialogs are always full width. Possible values are '480' (480px), '560' (560px),
	 * '640' (640px), '720' (720px).
	 */
	size: number = 480;

	/**
	 * If you want to inject a component to be displayed as the body of the dialog,
	 * pass it as the component in the WADialogConfig.
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
	 * pass it as the template in the WADialogConfig.
	 */
	templateRef: TemplateRef<any>;

	/**
	 * If you want to simply pass a resource key to be rendered in the body of the dialog,
	 * pass the resource key as bodyText in WADialogConfig.
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
	 * WADialogConfig. By default, all dialogs will have this value set as true.
	 */
	contentScrollEnabled: boolean = true;

	/**
	 * Use this parameter to determine whether clicking on the dialog overlay should close the dialog.
	 * This is set to true by default. This can be dynamically changed if required by using the
	 * WADialogRef method updateDialogConfig and setting it to false. This feature is useful when you
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
	 * WADialogCTA. More details of this model can be found in wa-dialog.config
	 */
	CTAs: WADialogCTA[] = [];

	/**
	 * If you wish to pass a template to be displayed in the footer of the dialog, use this parameter.
	 * It supports any basic HTML and is useful when you need to have any additional content displayed
	 * in the footer other than the usualy CTAs.
	 */
	footerTemplate: TemplateRef<any>;

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
	 * type DTMData. More details of this model in wa-dialog.config
	 */
	closeButtonDTM: DTMData = {};

	/**
	 * This parameter is used when the dialog is being closed. It helps in setting the fade out
	 * animation of the dialog
	 */
	closing: boolean = false;

	/**
	 * This object is used for configuring the loader displayed within the dialog. This is useful
	 * when you want to prevent user interactions during an asynchronous process
	 */
	loader: WADialogLoader = { showLoader: false };

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
	initialURL: string = window.location.href;

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private cd: ChangeDetectorRef,
		public elementRef: ElementRef,
		private dialogRef: WADialogRef
	) { }

	ngAfterViewInit(): void {
		this.setLastActiveElement();
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
	 * Store the last element which was in focus so that once the dialog is
	 * closed, the browser focus can be placed on this element
	 */
	setLastActiveElement(): void {
		this.lastActiveElement = <HTMLElement>document.activeElement;
	}

	/**
	 * This moves the browser focus to the heading of the dialog. If no heading is present
	 * (for some reason), the focus is placed on the main dialog container
	 */
	setInitialFocusState(): void {
		setTimeout(() => {
			if (this.elementRef.nativeElement.querySelector(".wa-dialog-heading")) {
				(<HTMLElement>this.elementRef.nativeElement.querySelector(".wa-dialog-heading")).focus();
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
		if (this.overlayClickEnabled && !this.loader.showLoader) {
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
	 * dialogCTWAlick observable. If you want any of the CTAs to simply close the dialog,
	 * pass the callback string as "close" in the CTA object
	 * @param CTA 
	 */
	dialogCTWAlick(CTA: WADialogCTA): void {
		if (!this.loader.showLoader) {
			if (CTA && CTA.callback == "close") {
				this.close();
			} else {
				this.dialogRef.dialogCTWAlick(CTA);
			}
		}
	}

	/**
	 * This method is called when the dialog is closed
	 */
	close(data?: any): void {
		if (this.dialogCloseEnabled) {
			this.closing = true;
			setTimeout(() => { this.dialogRef.destroy(data); }, 500);
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
			let currentURL: string = window.location.href;
			currentURL = (currentURL.split("#/")[1] == "") ? currentURL.split("#/")[0] : currentURL;
			this.initialURL = (this.initialURL.split("#/")[1] == "") ? this.initialURL.split("#/")[0] : this.initialURL;
			if (currentURL != this.initialURL) {
				this.dialogCloseEnabled = true;
				this.close();
			}
		}
	}
}