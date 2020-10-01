import { Component, ElementRef, Input, ViewEncapsulation, Output, EventEmitter, ViewChild, TemplateRef, ComponentRef } from "@angular/core";
import { icons, translations, screenReaderClass, AbcService } from "../utils";
import { defaultAutoDismissInterval, iconConfig } from "./abc-alert.config";
import { AbcOverlay, AbcOverlayComponent } from '../utils/abc-overlay.component';

/**
 * This component is used to display alerts in the application
 */
@Component({
    selector: "abc-alert",
    templateUrl: "./abc-alert.template.html",
    styleUrls: ["./abc-alert.style.scss"],
    encapsulation: ViewEncapsulation.None
})
export class AbcAlertComponent {

    /**
     * This is used to retrieve the reference to the alert template from the component
     */
    @ViewChild("alertTemplate") alertTemplate: TemplateRef<any>;

    /**
     * This sets the ID of the alert element. If no value is passed, a dynamic ID is set.
     */
    @Input() id: string = this.abcService.generateElementID();

    /**
     * This parameter is used to determine the type of alert. Possible values are "default",
     * "warning", "error", "success" and "neutral"
     */
    @Input() type: "default" | "warning" | "error" | "success" | "neutral" = "default";

    /**
     * This parameter is used to differentiate between an inline alert and a sticky alert message
     * (also known as a toast message).
     */
    @Input() isToastMessage: boolean = false;

    /**
     * This parameter can be used to display a prefix icon within the alert message. By default
     * certain icons will be displayed based on the "type" attribute but these can be over-ridden
     * using this parameter. The string you pass here is used as the class for the icon.
     */
    @Input() icon: string = "";

    /**
     * This is used to toggle the display of the prefix icon. By default, an icon will always be
     * displayed at the beginning of the message. Pass this value as false if the icon needs to be hidden.
     */
    @Input() showIcon: boolean = true;

    /**
     * This parameter determines whether the alert can be dismissed from the view of the user. By default
     * this is set to false. When set to true, the user will be able to dismiss the alert by clicking on an
     * "X" button on the right of the alert
     */
    @Input() dismissable: boolean = false;

    /**
     * Set this parameter to "off", "default" or the exact number of milliseconds after which the alert should
     * be automatically dismissed. If set to "off", then the message will not be automatically dismissed. If
     * set to "default", the alert is automatically dismissed after 10 seconds. If a number is passed, that
     * number is used as the number of milliseconds before which the alert is dismissed.
     * 
     * NOTE: Toast Messages will always have to auto-dismiss if the user is not presented with the option to
     * dismiss it manually. So for auto-dismiss messages, this value is set to 'default';
     */
    @Input() autoDismissAfter: "off" | "default" | number = "off";

    /**
     * This parameter will toggle the entry and animations for the alert message
     */
    @Input() preventAnimation: boolean = false;

    /**
     * Pass an error code if the alert message needs to show this data along side the text
     */
    @Input() errorCode: string;

    /**
     * This parameter can be used to set an alternate role attribute to the alert message. By
     * default, this is set as "alert". Make sure you pass the value as [role]="'your role'" and
     * not role="your value".
     */
    @Input() role: string = "alert";

    /**
     * This event is triggered whenever the user dismisses an alert
     */
    @Output() dismissed: EventEmitter<any> = new EventEmitter<any>();

    /**
     * This attribute is used to determine whether the alert is visible to the user
     */
    visible: boolean = false;

    /**
     * This attribute is used to determine whether the user has attempted to dismiss the alert. It is used to
     * apply the "exit" animation to the alert
     */
    dismissingAlert: boolean = false;

    /**
     * This stores the set of icon font classes used in the components
     */
    icons: any = icons;

    /**
     * This stores the set of icon font classes used in the alert messages
     */
    alertIcons: any = iconConfig;

    /**
     * This string stores the class used to determine screen reader elements. It ensures that elements is not
     * visible to regular users but is still picked up assisstive technology.
     */
    screenReaderClass: string = screenReaderClass;

    /**
     * This is used to store the set of resource keys used for translations
     */
    translations: any = translations;

    /**
     * When using toast messages, the alert content is injected directly to the body of the app to
     * prevent any clipping from overflow containers. This attribute stores the reference to the
     * dynamic container, so that it can be removed from the DOM later.
     */
    messageRef: { overlayRef: ComponentRef<AbcOverlayComponent>, templateRef: TemplateRef<any>, index: number };

    /**
     * @ignore
     * @param elementRef 
     * @param abcService 
     * @param abcOverlay 
     */
    constructor(
        private elementRef: ElementRef,
        private abcService: AbcService,
        private abcOverlay: AbcOverlay
    ) { }

    /**
     * The alert is made visible after a timeout of 1s. This is done so that it catches the user's attention
     * after the initial page paint is completed.
     */
    ngAfterViewInit(): void {
        const delay: number = this.preventAnimation ? 0 : 500;
        setTimeout(() => {
            this.displayAlertMessage();
        }, delay);
    }

    /**
     * This method makes the alert message visible on initialization
     */
    displayAlertMessage() {
        this.visible = true;
        this.setAutoDismissState();
        if (this.isToastMessage) {
            this.messageRef = this.abcOverlay.injectOverlay(this.alertTemplate, null, "toast");
        }
    }

	/**
	 * Check if the alert is set to auto-dismiss after an interval and start the timer accordingly
	 */
    setAutoDismissState(): void {
        if (this.isToastMessage && this.autoDismissAfter == "off" && !this.dismissable) {
            this.autoDismissAfter = "default";
        }

        if (this.autoDismissAfter == "default") {
            this.dismissAlert(defaultAutoDismissInterval);
        } else if (this.autoDismissAfter != "off") {
            this.dismissAlert(<number>this.autoDismissAfter);
        }
    }

    /**
     * This method is called whenever the alert needs to be closed/hidden
     * @param delay 
     */
    dismissAlert(delay: number = 0): void {
        (this.elementRef.nativeElement as HTMLElement).removeAttribute("role");
        setTimeout(() => {
			/**
			 * Starts the "exit" animation and then destroys the message after an interval
			 */
            this.dismissingAlert = true;
            setTimeout(() => {
                this.visible = false;
                this.dismissed.emit();
                if (this.isToastMessage && this.messageRef) {
                    const toastMessageOverlayRef: ComponentRef<AbcOverlayComponent> = this.abcOverlay.toastMessageOverlayRef;
                    const toastMessages: TemplateRef<any>[] = toastMessageOverlayRef.instance.templates;
                    toastMessageOverlayRef.instance.templates = toastMessages.filter(toast => toast != this.alertTemplate);
                }
            }, this.preventAnimation ? 0 : 700);
        }, delay);
    }

    /**
     * Remove the role attribute before destroying so that the alert is not read out again when using
     * assistive technology like screen readers. (IE + Jaws)
     */
    ngOnDestroy(): void {
        (this.elementRef.nativeElement as HTMLElement).removeAttribute("role");
    }
}