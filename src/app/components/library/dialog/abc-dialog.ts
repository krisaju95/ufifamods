import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef } from "@angular/core";
import { AbcDialogComponent } from "./abc-dialog.component";
import { AbcDialogInjector } from "./abc-dialog.injector";
import { AbcDialogConfig, AbcDialogLoader } from "./abc-dialog.config";
import { AbcDialogRef } from "./abc-dialog.ref";
import { AbcService } from '../utils';

/**
 * This parameter determines whether to block the body scroll by using inline styles or
 * by applying CSS classes.
 */
const useInlineStylingForBlockingScroll: boolean = false;

/**
 * This injectable is used for creating and displaying dialogs in the application
 */
@Injectable()
export class AbcDialog {

	/**
	 * This stores the index of the last dialog that was generated
	 */
	lastDialogRefIndex: number = -1;

	/**
	 * This stores the number of dialogs that are currently open
	 */
	numberOfOpenDialogs: number = 0;

	/**
	 * This stores the list of dialog refs that are currently open
	 */
	dialogComponentRefs: ComponentRef<AbcDialogComponent>[] = [];

	/**
	 * @ignore
	 * @param componentFactoryResolver 
	 * @param appRef 
	 * @param injector 
	 * @param service 
	 */
	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private appRef: ApplicationRef,
		private injector: Injector,
		private service: AbcService
	) { }

	/**
	 * Method used to open a dialog instance. It returns the dialogRef object.
	 * @param config 
	 */
	public open(config: AbcDialogConfig): AbcDialogRef {
		const dialogRef = this.appendDialogComponentToBody(config);
		const dialogComponentRef: ComponentRef<AbcDialogComponent> = this.dialogComponentRefs[this.lastDialogRefIndex];
		dialogComponentRef.instance.dialogRefIndex = this.lastDialogRefIndex;
		dialogComponentRef.instance.childComponentType = config.component;
		dialogComponentRef.instance.templateRef = config.template;
		dialogComponentRef.instance.targetParent = config.targetParent;
		dialogComponentRef.instance.bodyText = config.bodyText || "";
		dialogComponentRef.instance.id = config.id || "AbcDialog" + this.lastDialogRefIndex;
		dialogComponentRef.instance.theme = config.theme || "legacy";
		dialogComponentRef.instance.heading = config.heading || "";
		dialogComponentRef.instance.hideHeading = !!config.hideHeading;
		dialogComponentRef.instance.closeButtonDTM = config.closeButtonDTM || {};
		dialogComponentRef.instance.size = config.size || 480;
		dialogComponentRef.instance.fullScreenOnMobile = config.fullScreenOnMobile != false;
		dialogComponentRef.instance.contentScrollEnabled = config.contentScrollEnabled != false;
		dialogComponentRef.instance.overlayClickEnabled = config.overlayClickEnabled != false;
		dialogComponentRef.instance.dialogCloseEnabled = config.dialogCloseEnabled != false;
		dialogComponentRef.instance.CTAs = config.CTAs || [];
		dialogComponentRef.instance.footerTemplate = config.footerTemplate;
		dialogComponentRef.instance.overlayClass = config.overlayClass || "";
		dialogComponentRef.instance.bodyPanelClass = config.bodyPanelClass || "";
		dialogComponentRef.instance.footerPanelClass = config.footerPanelClass || "";
		dialogComponentRef.instance.closeOnNavigation = config.closeOnNavigation != false;
		const loaderConfig: AbcDialogLoader = config.loader || { showLoader: false };
		const defaultLoaderType: string = (dialogComponentRef.instance.theme == "kilo") ? "button" : "overlay";
		dialogComponentRef.instance.animateLoader = !loaderConfig.showLoader;
		dialogComponentRef.instance.loader = {
			showLoader: loaderConfig.showLoader,
			type: loaderConfig.type || dialogComponentRef.instance.loader.type || defaultLoaderType,
			header: loaderConfig.header || dialogComponentRef.instance.loader.header || "",
			footer: loaderConfig.footer || dialogComponentRef.instance.loader.footer || ""
		};
		return dialogRef;
	}

	/**
	 * This method is used to attach the dialog component to the body of the application. It
	 * returns the dialogRef object.
	 * @param config 
	 */
	private appendDialogComponentToBody(config: AbcDialogConfig): AbcDialogRef {
		const map = new WeakMap();
		map.set(AbcDialogConfig, config);

		const dialogRef = new AbcDialogRef();
		map.set(AbcDialogRef, dialogRef);

		const dialogClosed = dialogRef.dialogClosed.subscribe(() => {
			this.removeDialogComponentFromBody(dialogRef);
			dialogClosed.unsubscribe();
		});

		this.monitorDialogConfigChanges(dialogRef);

		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AbcDialogComponent);
		const componentRef = componentFactory.create(new AbcDialogInjector(this.injector, map));

		this.appRef.attachView(componentRef.hostView);

		const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
		const targetParent: HTMLElement = config.targetParent ? document.querySelector(config.targetParent) : document.body;
		(targetParent || document.body).appendChild(domElem);

		this.dialogComponentRefs[++this.lastDialogRefIndex] = componentRef;

		dialogRef.dialogID = this.lastDialogRefIndex;
		this.numberOfOpenDialogs++;

		if (this.numberOfOpenDialogs == 1) {
			this.setDialogOpenEnvironment(config);
		}

		return dialogRef;
	}

	/**
	 * This method checks for any changes to the parameters of a dialog.
	 * @param dialogRef 
	 */
	private monitorDialogConfigChanges(dialogRef: AbcDialogRef): void {
		dialogRef.dialogConfigChanged.subscribe((config: any) => {
			const dialogInstance: AbcDialogComponent = this.dialogComponentRefs[dialogRef.dialogID].instance;
			dialogInstance.heading = config.heading || dialogInstance.heading;
			dialogInstance.overlayClickEnabled = dialogInstance.overlayClickEnabled && (config.overlayClickEnabled != false);
			dialogInstance.dialogCloseEnabled = dialogInstance.dialogCloseEnabled && (config.dialogCloseEnabled != false);
		});

		dialogRef.dialogLoaderConfigChanged.subscribe((config: any) => {
			const dialogInstance: AbcDialogComponent = this.dialogComponentRefs[dialogRef.dialogID].instance;
			dialogInstance.animateLoader = config.showLoader ? dialogInstance.animateLoader : true;
			dialogInstance.loader = {
				showLoader: config.showLoader,
				type: config.type || dialogInstance.loader.type || "overlay",
				header: config.header || dialogInstance.loader.header || "",
				footer: config.footer || dialogInstance.loader.footer || ""
			};
		});
	}

	/**
	 * Remove the dialog from the body of the application
	 * @param dialogRef 
	 */
	private removeDialogComponentFromBody(dialogRef: AbcDialogRef): void {
		this.appRef.detachView(this.dialogComponentRefs[dialogRef.dialogID].hostView);
		this.dialogComponentRefs[dialogRef.dialogID].destroy();
		this.numberOfOpenDialogs--;
		if (this.numberOfOpenDialogs == 0) {
			this.setDialogClosedEnvironment();
		}
	}

	/**
     * Update the DOM when a dialog is opened
     */
	private setDialogOpenEnvironment(config: AbcDialogConfig): void {
		if (config.blockBackgroundScroll != false) {
			const currentBodyPaddingRight: number = +(window.getComputedStyle(document.body).paddingRight.split("px")[0]);
			document.body.style.paddingRight = (currentBodyPaddingRight + this.service.getScrollBarWidth(document.body)) + "px";
			if (useInlineStylingForBlockingScroll) {
				document.body.style.overflow = "hidden";
				document.body.style.touchAction = "none";
			} else {
				document.body.classList.add("abc-dialog-open");
			}
		}
	}

	/**
     * Update the DOM when a dialog is closed
     */
	private setDialogClosedEnvironment(): void {
		document.body.style.paddingRight = "";
		if (useInlineStylingForBlockingScroll) {
			document.body.style.overflow = "auto";
			document.body.style.touchAction = "";
		} else {
			document.body.classList.remove("abc-dialog-open");
		}
	}
}