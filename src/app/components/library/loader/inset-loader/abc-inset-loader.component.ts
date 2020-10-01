import { Component, ElementRef, Input, ViewEncapsulation } from "@angular/core";
import { translations } from "../../utils/abc-translations";
import { screenReaderClass } from "../../utils/abc-constants";
import { abcSpinnerImages } from "../abc-loader.config";
import { AbcService } from "../../utils";

/**
 * This component renders inline loaders within a container
 */
@Component({
	selector: "abc-inset-loader",
	templateUrl: "./abc-inset-loader.template.html",
	styleUrls: ["./abc-inset-loader.style.scss"],
	encapsulation: ViewEncapsulation.None
})
export class AbcInsetLoaderComponent {

	/**
	 * This sets the ID of the button element. If no value is passed, a dynamic ID is set.
	 */
	@Input() id: string = this.service.generateElementID();

	/**
	 * This determines whether the loader should appear as an overlay over the content. This
	 * ensures that the overlay takes up the space of the content, preventing interaction with
	 * the content. Ensure that the container of the content has position "relative" or "absolute".
	 * If you use the "default" type, the loader renders with it's own space in the DOM.
	 */
	@Input() type: "default" | "overlay" = "default";

	/**
	 * This is the heading for the loader. It's the text displayed on top of the spinner
	 */
	@Input() header: string;

	/**
	 * This is the footer for the loader. It's the text displayed below the spinner
	 */
	@Input() footer: string;

	/**
	 * For displaying loaders without any visible header or text, ensure that you're
	 * passing a screen reader key so that screen reader users are aware that a loader
	 * is displayed. If nothing is passed, a default resource key is picked up.
	 */
	@Input() screenReaderText: string = translations.loader.defaultScreenReaderText;

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
	 * @param service 
	 * @param elementRef 
	 */
	constructor(
		private service: AbcService,
		private elementRef: ElementRef
	) { }

	/**
	 * Once the loader is displayed, place the browser's focus on either the header or the footer text,
	 * whichever is available. If neither are available, it focusses on the header. In such scenarios
	 * the header behaves as a screen reader element with the screenReaderText attribute
	 */
	ngAfterViewInit() {
		const abcLoaderTextElements: NodeList = this.elementRef.nativeElement.querySelectorAll(".abc-inset-loader-text");
		abcLoaderTextElements[0] && (abcLoaderTextElements[0] as HTMLElement).focus();
	}
}