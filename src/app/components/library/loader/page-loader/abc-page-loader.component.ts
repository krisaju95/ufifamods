import { Component, ElementRef, ViewEncapsulation } from "@angular/core";
import { screenReaderClass, translations } from "../../utils";
import { AbcLoaderRequestConfig, defaultLoaderRequestConfig, AbcLoaderType } from "../abc-loader-request.config";
import { abcSpinnerImages } from "../abc-loader.config";
import { AbcLoaderService } from "../abc-loader.service";
import { abcPageLoaderConfig } from "./abc-page-loader.config";

/**
 * This is used to identify the container of the hidden part of the page while the loader is visible
 */
const bodyContainer: string = ".abc-router-outlet";

/**
 * This is the set of focussable elements
 */
export const focusableElementsString: string = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

/**
 * This component renders a page loader during transitions between states. This is useful
 * when you're waiting for a back end API response before displaying the next page in a flow
 */
@Component({
    selector: "abc-page-loader",
    styleUrls: ["./abc-page-loader.style.scss"],
    templateUrl: "./abc-page-loader.template.html",
    encapsulation: ViewEncapsulation.None
})
export class ACPageLoaderComponent {

    /**
     * This stores the current state of the loader request config
     */
    loaderRequestConfig: AbcLoaderRequestConfig = defaultLoaderRequestConfig;

    /**
     * This stores the set of properties for each type of loader
     */
    config: any = abcPageLoaderConfig;

    /**
     * This variable determines whether the loader should be displayed
     */
    showLoader: boolean = false;

    /**
     * This stores the current type of loader that is displayed
     */
    type: AbcLoaderType = "default";

    /**
     * This is the heading for the loader. It's the text displayed on top of the spinner
     */
    header: string;

    /**
     * This is the footer for the loader. It's the text displayed below the spinner
     */
    footer: string;

    /**
     * This is a screen reader text which will be announced once the loader is toggled off
     */
    onCompletion: string;

    /**
     * For displaying loaders without any visible header or text, ensure that you're
     * passing a screen reader key so that screen reader users are aware that a loader
     * is displayed. If nothing is passed, a default resource key is picked up.
     */
    screenReaderText: string = translations.loader.defaultScreenReaderText;

    /**
     * This is the config object with the image paths for the spinners
     */
    abcSpinnerImages: any = abcSpinnerImages;

    /**
     * This object stores the set of translations used across all the components
     */
    translations: any = translations;

    /**
     * This attribute stores the screen reader class for the project
     */
    screenReaderClass: string = screenReaderClass;

    /**
     * @ignore
     * @param abcLoaderService 
     * @param elementRef 
     */
    constructor(
        private abcLoaderService: AbcLoaderService,
        private elementRef: ElementRef
    ) { }

    /**
     * This subscribes for page loader requests and updates the config accordingly
     */
    ngOnInit() {
        this.abcLoaderService.loaderRequests$.subscribe((config: AbcLoaderRequestConfig) => {
            const body: HTMLElement = document.querySelector(bodyContainer);
            this.loaderRequestConfig = config || defaultLoaderRequestConfig;
            if (this.loaderRequestConfig.showLoader) {
                const abcPageHasLoadedScreenReaderText: HTMLElement = document.querySelector("#abcPageHasLoadedScreenReaderText");
                abcPageHasLoadedScreenReaderText && abcPageHasLoadedScreenReaderText.removeAttribute("role");
                body && body.setAttribute("aria-hidden", "true");
                body && body.setAttribute("aria-busy", "true");
                this.showLoader = true;
                this.type = this.loaderRequestConfig.type || "default";
                this.header = this.config[this.type].header;
                this.footer = this.config[this.type].footer;
                this.onCompletion = this.config[this.type].onCompletion;
                this.setFocusOnLoaderDisplay();
            } else {
                body && body.setAttribute("aria-hidden", "false");
                body && body.setAttribute("aria-busy", "false");
                this.showLoader = false;
                this.type = "default";
                this.header = "";
                this.footer = "";
                this.setFocusOnLoaderDestroy();
            }

            setTimeout(() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }, 500);
        });
    }

    /**
     * Once the loader is displayed, place the browser's focus on either the header or the footer text,
     * whichever is available. If neither are available, it focusses on the header. In such scenarios
     * the header behaves as a screen reader element with the screenReaderText attribute
     */
    setFocusOnLoaderDisplay() {
        setTimeout(() => {
            const abcLoaderTextElements: NodeList = this.elementRef.nativeElement.querySelectorAll(".abc-page-loader-text");
            abcLoaderTextElements[0] && (abcLoaderTextElements[0] as HTMLElement).focus();
        }, 100);
    }

    /**
     * This sets the focus to the first active element within the DOM once the page has loaded.
     * You can remove this code if you want to handle this separately for each individual page component
     */
    setFocusOnLoaderDestroy() {
        setTimeout(() => {
            const body: HTMLElement = document.querySelector(bodyContainer);
            const focussableElements: NodeList = body.querySelectorAll(focusableElementsString);
            const firstElement: HTMLElement = (Array.from(focussableElements)).find((element: any) => { return window.getComputedStyle(element).display != "none"; }) as HTMLElement;
            firstElement && firstElement.focus();
        }, 500);
    }
}