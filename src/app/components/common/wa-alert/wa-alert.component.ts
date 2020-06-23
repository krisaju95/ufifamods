import { Component, ElementRef, Input } from '@angular/core';

@Component({
	selector: 'wa-alert',
	templateUrl: './wa-alert.template.html'
})
export class WAAlertComponent {

    /**
     * This parameter is used to determine the type of alert. Possible values are "default",
     * "warning", "error", "success" and "neutral"
     */
	@Input() type: string = "default";

    /**
     * This paramter is used to differentiate between an inline alert and a sticky alert message
     * (also known as a toast message).
     */
	@Input() isToastMessage: boolean = false;

    /**
     * This parameter can be used to display a prefix icon within the alert message. By default
     * certain icons will be displayed based on the 'type' attribute but these can be over-ridden
     * using this parameter
     */
	@Input() icon: string = "";

    /**
     * This is used to toggle the display of the prefix icon. By default, an icon will always be
     * displayed at the beginning of the message. Pass this value as false if the icon needs to be hidden.
     */
	@Input() showIcon: boolean = true;

    /**
     * Pass the resource key to be used for displaying the error message here
     */
	@Input() message: string = "";

    /**
     * If any dynamiv parameters need to be passed to this error message, pass these params here
     */
	@Input() messageParams: any;

    /**
     * This parameter determines whether the alert can be dismissed from the view of the user. By default
     * this is set to false. When set to true, the user will be able to dismiss the alert by clicking on an
     * 'X' button on the right of the alert
     */
	@Input() dismissable: boolean = false;

    /**
     * Set this parameter to "off", "default" or the exact number of milliseconds after which the alert should
     * be automatically dismissed. If set to "off", then the message will not be automatically dismissed. If
     * set to "default", the alert is automatically dismissed after 10 seconds. If a number is passed, that
     * number is used as the number of milliseconds before which the alert is dismissed.
     */
	@Input() autoDismissAfter: string | number = "off";

    /**
     * This attribute is used to determine whether the alert is visible to the user
     */
	visible: boolean = false;

    /**
     * This attribute is used to determine whether the user has attempted to dismiss the alert. It is used to
     * apply the 'exit' animation to the alert
     */
	dismissingAlert: boolean = false;

	constructor(private elementRef: ElementRef) { }

	ngAfterViewInit(): void {
        /**
         * The alert is made visible after a timeout of 1s. This is done so that it catches the user's attention
         * after the initial page paint is completed.
         */
		setTimeout(() => {
			this.visible = true;
			this.setAutoDismissState();
		}, 1000);
	}

	/**
	 * Check if the alert is set to auto-dismiss after an interval and start the timer accordingly
	 */
	setAutoDismissState(): void {
		if (this.autoDismissAfter == 'default') {
			this.dismissAlert(10000);
		} else if (this.autoDismissAfter != "off") {
			this.dismissAlert(<number>this.autoDismissAfter);
		}
	}

	dismissAlert(delay: number = 0): void {
		setTimeout(() => {
			/**
			 * Starts the 'exit' animation and then destroys the message after an interval
			 */
			this.dismissingAlert = true;
			setTimeout(() => {
				this.visible = false;
			}, 2000);
		}, delay);
	}

	ngOnDestroy(): void {
        /**
         * Remove the role attrbiute before destroying so that the alert is not read out again when using
         * assistive technology like screen readers.
         */
		(this.elementRef.nativeElement as HTMLElement).removeAttribute("role");
	}
}