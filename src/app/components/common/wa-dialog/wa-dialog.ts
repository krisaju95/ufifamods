import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { WADialogComponent } from './wa-dialog.component';
import { WADialogInjector } from './wa-dialog.injector';
import { WADialogConfig, WADialogLoader } from './wa-dialog.config';
import { WADialogRef } from './wa-dialog.ref';

@Injectable()
export class WADialog {

	lastDialogRefIndex: number = -1;

	numberOfOpenDialogs: number = 0;

	dialogComponentRefs: ComponentRef<WADialogComponent>[] = [];

	constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) { }

	/**
	 * Method used to open a dialog instance. It returns the dialogRef object.
	 * @param config 
	 */
	public open(config: WADialogConfig): WADialogRef {
		const dialogRef = this.appendDialogComponentToBody(config);
		const dialogComponentRef: ComponentRef<WADialogComponent> = this.dialogComponentRefs[this.lastDialogRefIndex];
		dialogComponentRef.instance.dialogRefIndex = this.lastDialogRefIndex;
		dialogComponentRef.instance.childComponentType = config.component;
		dialogComponentRef.instance.templateRef = config.template;
		dialogComponentRef.instance.bodyText = config.bodyText || "";
		dialogComponentRef.instance.id = config.id || "WADialog" + this.lastDialogRefIndex;
		dialogComponentRef.instance.theme = config.theme || "default";
		dialogComponentRef.instance.typography = config.typography || dialogComponentRef.instance.theme;
		dialogComponentRef.instance.heading = config.heading || "";
		dialogComponentRef.instance.closeButtonDTM = config.closeButtonDTM || {};
		dialogComponentRef.instance.size = config.size || 480;
		dialogComponentRef.instance.fullScreenOnMobile = config.fullScreenOnMobile != false;
		dialogComponentRef.instance.contentScrollEnabled = config.contentScrollEnabled != false;
		dialogComponentRef.instance.overlayClickEnabled = config.overlayClickEnabled != false;
		dialogComponentRef.instance.dialogCloseEnabled = config.dialogCloseEnabled != false;
		dialogComponentRef.instance.CTAs = config.CTAs || [];
		dialogComponentRef.instance.footerTemplate = config.footerTemplate;
		dialogComponentRef.instance.bodyPanelClass = config.bodyPanelClass;
		dialogComponentRef.instance.footerPanelClass = config.footerPanelClass;
		dialogComponentRef.instance.closeOnNavigation = config.closeOnNavigation != false;
		const loaderConfig: WADialogLoader = config.loader || { showLoader: false };
		const defaultLoaderType: string = (dialogComponentRef.instance.theme == "kilo") ? "button" : "overlay";
		dialogComponentRef.instance.animateLoader = !loaderConfig.showLoader;
		dialogComponentRef.instance.loader = {
			showLoader: loaderConfig.showLoader,
			type: loaderConfig.type || dialogComponentRef.instance.loader.type || defaultLoaderType,
			header: loaderConfig.header || dialogComponentRef.instance.loader.header || '',
			footer: loaderConfig.footer || dialogComponentRef.instance.loader.footer || ''
		};
		return dialogRef;
	}

	/**
	 * This method is used to attach the dialog component to the body of the application. It
	 * returns the dialogRef object.
	 * @param config 
	 */
	private appendDialogComponentToBody(config: WADialogConfig): WADialogRef {
		const map = new WeakMap();
		map.set(WADialogConfig, config);

		const dialogRef = new WADialogRef();
		map.set(WADialogRef, dialogRef);

		const dialogClosed = dialogRef.dialogClosed.subscribe(() => {
			this.removeDialogComponentFromBody(dialogRef);
			dialogClosed.unsubscribe();
		});

		this.monitorDialogConfigChanges(dialogRef);

		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(WADialogComponent);
		const componentRef = componentFactory.create(new WADialogInjector(this.injector, map));

		this.appRef.attachView(componentRef.hostView);

		const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
		document.body.appendChild(domElem);

		this.dialogComponentRefs[++this.lastDialogRefIndex] = componentRef;

		dialogRef.dialogID = this.lastDialogRefIndex;
		this.numberOfOpenDialogs++;

		if (this.numberOfOpenDialogs == 1) {
			this.setDialogOpenEnvironment();
		}

		return dialogRef;
	}

	/**
	 * This method checks for any changes to the parameters of a dialog.
	 * @param dialogRef 
	 */
	private monitorDialogConfigChanges(dialogRef: WADialogRef): void {
		dialogRef.dialogConfigChanged.subscribe((config: any) => {
			const dialogInstance: WADialogComponent = this.dialogComponentRefs[dialogRef.dialogID].instance;
			dialogInstance.heading = config.heading || dialogInstance.heading;
			dialogInstance.overlayClickEnabled = dialogInstance.overlayClickEnabled && (config.overlayClickEnabled != false);
			dialogInstance.dialogCloseEnabled = dialogInstance.dialogCloseEnabled && (config.dialogCloseEnabled != false);
		});

		dialogRef.dialogLoaderConfigChanged.subscribe((config: any) => {
			const dialogInstance: WADialogComponent = this.dialogComponentRefs[dialogRef.dialogID].instance;
			dialogInstance.animateLoader = config.showLoader ? dialogInstance.animateLoader : true;
			dialogInstance.loader = {
				showLoader: config.showLoader,
				type: config.type || dialogInstance.loader.type || 'overlay',
				header: config.header || dialogInstance.loader.header || '',
				footer: config.footer || dialogInstance.loader.footer || ''
			};
		});
	}

	/**
	 * Remove the dialog from the body of the application
	 * @param dialogRef 
	 */
	private removeDialogComponentFromBody(dialogRef: WADialogRef): void {
		this.appRef.detachView(this.dialogComponentRefs[dialogRef.dialogID].hostView);
		this.dialogComponentRefs[dialogRef.dialogID].destroy();
		this.numberOfOpenDialogs--;
		if (this.numberOfOpenDialogs == 0) {
			this.setDialogClosedEnvironment();
		}
	}

	/**
     * Get width of the brower's scrollbar
     * @returns string
     */
	private getScrollBarWidth(): string {
		let bodyWidth = document.body.clientWidth;
		let windowInnerWidth = window["innerWidth"];
		return (windowInnerWidth - bodyWidth) + "px";
	}

	/**
     * Update the DOM when a dialog is opened
     */
	private setDialogOpenEnvironment(): void {
		document.body.style.paddingRight = this.getScrollBarWidth();
		// document.body.classList.add("wa-dialog-open");
		document.body.style.overflow = "hidden";
		document.body.style.touchAction = "none";
		Array.from(document.body.children).forEach((child: HTMLElement) => {
			if (child.tagName != "#text" && child.tagName != "SCRIPT" && child.tagName != "wa-DIALOG") {
				child.setAttribute("aria-hidden", "true");
			}
		});
	}

	/**
     * Update the DOM when a dialog is closed
     */
	private setDialogClosedEnvironment(): void {
		document.body.style.paddingRight = "";
		// document.body.classList.remove("wa-dialog-open");
		document.body.style.overflow = "";
		document.body.style.touchAction = "";
		Array.from(document.body.children).forEach((child: HTMLElement) => {
			if (child.tagName != "#text" && child.tagName != "SCRIPT" && child.tagName != "wa-DIALOG") {
				child.setAttribute("aria-hidden", "false");
			}
		});
	}
}