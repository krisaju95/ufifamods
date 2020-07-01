import { TemplateRef } from '@angular/core';

export class WADialogConfig {
	/**
	 * This is the unique ID of the dialog. You can pass it as a parameter
	 * when you open the dialog as part of the WADialogConfig or an auto-generated
	 * ID will be assigned to it by default if no ID is passed. It is also used to
	 * generate IDs for all the major elements in the dialog like the header,
	 * footer, body, close button etc.
	 */
	id?: any;

	/**
	 * If you want to inject a component to be displayed as the body of the dialog,
	 * pass it as the component in the WADialogConfig.
	 */
	component?: any;

	/**
	 * If you want to inject a template to be displayed as the body of the dialog,
	 * pass it as the template in the WADialogConfig.
	 */
	template?: TemplateRef<any>;

	/**
	 * If you want to simply pass a resource key to be rendered in the body of the dialog,
	 * pass the resource key as bodyText in WADialogConfig.
	 */
	bodyText?: string;

	/**
	 * This helps in toggling between different designs for the dialog. Currently, we have
	 * two designs - "default" and "kilo".
	 */
	theme?: string;

	/**
	 * This helps in toggling between different typography themes for the dialog. Currently, we have
	 * two typography sets - "default" and "kilo"
	 */
	typography?: string;

	/**
	 * This parameter is used as the heading of the dialog.
	 */
	heading?: string;

	/**
	 * To add data analytics tracking values to the close button of the dialog, use this parameter of
	 * type DTMData. More details of this model in wa-dialog.config.
	 */
	closeButtonDTM?: DTMData;

	/**
	 * This parameter determines the width of the dialog on desktop and tablet viewports.
	 * On mobile, dialogs are always full width. Possible values are '480' (480px), '560' (560px),
	 * '640' (640px), '720' (720px).
	 */
	size?: number;

	/**
	 * If the dialog should stretch full screen on mobile viewports irrespective of the content
	 * of the body, then pass the value as true. If the dialog should only occupy the height of the
	 * content, pass the value as false. By default, all dialogs will have this value set to true
	 * since that's usually the requirement.
	 */
	fullScreenOnMobile?: boolean;

	/**
	 * If the dialog body should have a scroll-bar when the content overflows, then pass this
	 * parameter as true. If instead the dialog overlay should scroll, then pass this as false in the
	 * WADialogConfig. By default, all dialogs will have this value set as true.
	 */
	contentScrollEnabled?: boolean;

	/**
	 * Use this parameter to determine whether clicking on the dialog overlay should close the dialog.
	 * This is set to true by default. This can be dynamically changed if required by using the
	 * WADialogRef method updateDialogConfig and setting it to false. This feature is useful when you
	 * wish to block overlay clicks while an API call is on-going.
	 */
	overlayClickEnabled?: boolean;

	/**
	 * Use this parameter to block the user from being able to close any dialogs. This will remove the
	 * cross button in the header of the dialog and will prevent all manual close events by the user.
	 * This is useful when the user's session has expired for example and they should no longer be
	 * allowed to interact with the application until they click on a CTA.
	 */
	dialogCloseEnabled?: boolean;

	/**
	 * This is the list of CTA buttons to be displayed in the footer of the dialog. Each CTA is of type
	 * WADialogCTA. More details of this model can be found in wa-dialog.config. Make sure to pass them
	 * in the order you wish to display them from right to left on desktop. On mobile, these are stacked
	 * one on top of the order, the first CTA in the list being at the top.
	 */
	CTAs?: WADialogCTA[];

	/**
	 * If you wish to pass a template to be displayed in the footer of the dialog, use this parameter.
	 * It supports any basic HTML and is useful when you need to have any additional content displayed
	 * in the footer other than the usualy CTAs. This can be used either in addition to the existing
	 * footer template or as a replacement.
	 */
	footerTemplate?: TemplateRef<any>;

	/**
	 * Pass a class (or classes) if any customisations need to be done to the body of the dialog
	 */
	bodyPanelClass?: string;

	/**
	 * Pass a class (or classes) if any customisations need to be done to the footer of the dialog
	 */
	footerPanelClass?: string;

	/**
	 * Use this to configure the loader in the dialog
	 */
	loader?: WADialogLoader;

	/**
	 * This determines whether the dialog should be closed in case the app navigates to a new page either
	 * by user interaction or when we programmatically navigate the user. By default this will be set to true
	 */
	closeOnNavigation?: boolean;
}

export class WADialogCTA {
	/**
	 * If you need to add an identifier for each CTA, you can pass it with this parameter. This does not
	 * impact the way the CTA is rendered or any other logic within the dialog framework. This can be
	 * used as a reference in the dialogCTAClick event to determine which CTA was clicked in the dialog,
	 * particularly useful when there is more than one CTA.
	 */
	identifier?: string;

	/**
	 * This is used as the label of the button. Pass the resource key to be used.
	 */
	label: string;

	/**
	 * This is used as the ID of the button. This is an optional parameter and by default, and ID will
	 * be automatically generated even if you don't pass anything.
	 */
	id?: string;

	/**
	 * This is used to determine the type class of the button. Supported values include "primary",
	 * "secondary" and "tertiary". This determines the design of the button. Primary buttons usually
	 * have solid colored backgrounds, secondary buttons have clear buttons and tertiary buttons have
	 * an anchor link like appearance. The default appearance of the first button in the list is
	 * "primary", the second on the list is "secondary" and all other buttons are of type "tertiary"
	 * by default.
	 */
	type?: string;

	/**
	 * We have three themes of buttons, red, blue and brown. Pass the parameter as one of these values
	 * to determine the color of the CTA.
	 */
	theme?: string;

	/**
	 * This is used to add any analtyics values for buttons. These set the attributes data-analytics-track
	 * and data-analytics-val.
	 */
	DTM?: DTMData = {};

	/**
	 * If you wish to store the function name which will be called when the CTA is clicked, pass it in this
	 * parameter. If you want the CTA to simply close the dialog, pass the value as "close". This is useful
	 * when you are observing multiple CTAs in the same dialog as you could trigger a method call in the
	 * observing component as this[callback]. It's just for convenience.
	 */
	callback?: string;
}

export interface DTMData {
	/**
	 * Used to set the attribute data-analytics-track
	 */
	track?: string;

	/**
	 * Used to set the attribute data-analytics-val
	 */
	val?: string;
}

export interface WADialogLoader {
	/**
	 * This parameter decides whether to show a loader on the entire dialog or within the
	 * primary CTA. Pass the value as 'overlay' for the full dialog loader, and pass it as
	 * 'button' to show the loader within the primary CTA
	 */
	type?: string;

	/**
	 * This decides whether or not the loader should be displayed in the dialog
	 */
	showLoader: boolean;

	/**
	 * This is used for loaders of type 'overlay'. It adds a text message above the spinner.
	 */
	header?: string;

	/**
	 * This is used for loaders of type 'overlay'. It adds a text message below the spinner.
	 */
	footer?: string;
}