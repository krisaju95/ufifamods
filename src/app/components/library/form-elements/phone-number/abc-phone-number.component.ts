import { Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AbcInputComponent } from '../input/abc-input.component';
import { AbcCountryInfo, abcPhoneNumberList, abcPrioritizedCountries, abcFlagImage } from "./abc-phone-number-config";
import { CountryCode, parsePhoneNumberFromString as formatPhoneNumber, PhoneNumber } from "libphonenumber-js";

/**
 * This component renders a phone number form field. It is a combintaion of a drop-down for the
 * country/dial code and an input field for the phone number
 */
@Component({
	selector: "abc-phone-number",
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => AbcPhoneNumberComponent),
		multi: true
	}],
	templateUrl: "./abc-phone-number.template.html",
	styleUrls: ["./abc-phone-number.style.scss"],
	encapsulation: ViewEncapsulation.None
})
export class AbcPhoneNumberComponent extends AbcInputComponent implements ControlValueAccessor {

	/**
	 * This parameter is the model for the dial code form field
	 */
	@Input() dialCodeCountry: CountryCode = this.getDefaultDialCodeCountry();

	/**
	 * Pass the label for the dial code field. This is not visible to users except when
	 * navigating through the site for screen readers. This is important in order to
	 * comply with accessibility guidelines.
	 */
	@Input() dialCodeLabel: string = "Dial Code";

	/**
	 * This parameter determines whether to show the search filter within the
	 * phone number drop-down
	 */
	@Input() enableSearchFilter: boolean = true;

	/**
	 * This is the full list of countries with the country code, the dial
	 * code and the name of the country
	 */
	@Input() countries: AbcCountryInfo[] = abcPhoneNumberList;

	/**
	 * This is the list of countries that needs to be displayed at the top
	 * of the list irrespective of their position in the main list. If you'd
	 * like your component to not prioritize any countries by default, set this
	 * value to an empty array
	 */
	@Input() prioritizedCountries: any[] = abcPrioritizedCountries;

	/**
	 * This event emitter is used to detect changes to the dial code
	 */
	@Output() dialCodeChange: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * This event emitter is used to detect changes to either the dial code or the
	 * phone number. It emits all the relevant information set to the controls of
	 * the component. Check the modelUpdate method for more info.
	 */
	@Output() update: EventEmitter<any> = new EventEmitter<any>();

	/**
	 * This is the full list of countries with the country code, the dial
	 * code and the name of the country, sorted based on the prioritizedCountries
	 * parameter.
	 */
	sortedCountryList: any[] = [];

	/**
	 * This is the current selected dial code
	 */
	dialCode: string;

	/**
	 * This parameter stores the current phone number
	 */
	phoneNumber: string;

	/**
	 * This parameter stores the formatted version of the phone number. This is used for
	 * display purposes only
	 */
	formattedPhoneNumber: any;

	/**
	 * Since we have multiple nested custom controls, this helps in ensuring that the
	 * child component's value does not get initialized before the parent component.
	 * This helps when using template driven forms with pre-filled values.
	 */
	initialReadOnly: boolean = this.readOnly;

	/**
	 * This parameter determines whether a value should be emitted whenever a control value changes.
	 * It ensures the this doesn't trigger EventEmitter's when the value is changed manually by the
	 * parent form container
	 */
	allowEmitValue: boolean = false;

	/**
	 * This attribute stores the prefix path and the format of the flag images used
	 * in the phone number component
	 */
	abcFlagImage: any = abcFlagImage;

	/**
	 * Set the current dial code and the country list
	 */
	ngOnChanges() {
		this.allowEmitValue = false;
		this.setDialCode(this.dialCodeCountry);
		this.setCountryList();
		this.allowEmitValue = true;
	}

	/**
	 * Set the current dial code and the country list and fetch the form control from the parent container
	 */
	ngOnInit() {
		this.readOnly = true;
		this.setCountryList();
		this.setNgControl();
		setTimeout(() => {
			this.readOnly = this.initialReadOnly;
			this.phoneNumber = this.value;
			this.setDialCode(this.dialCodeCountry);
			this.allowEmitValue = true;
		});
	}

	/**
	 * This method is used to determine what dial code should be
	 * set if nothing is passed from the component. For example, you
	 * might want to set the default dial code based on the
	 * location of the user, or the current edition of the site
	 */
	getDefaultDialCodeCountry(): CountryCode {
		return "CA";
	}

	/**
	 * This method sets the order in which the country options should be displayed. It
	 * makes use of the prioritizedCountriesInfo array and places those countries at the
	 * top of the list while alos removing them from their original positions
	 */
	setCountryList(): void {
		this.sortedCountryList = Object.assign([], this.countries);
		const prioritizedCountriesInfo: AbcCountryInfo[] = [];
		(this.prioritizedCountries || []).forEach((prioritizedCountry: string) => {
			const countryIndex: number = this.sortedCountryList.findIndex((country: AbcCountryInfo) => {
				return country.code == prioritizedCountry;
			});

			if (countryIndex > -1) {
				prioritizedCountriesInfo.push(this.sortedCountryList[countryIndex]);
				this.sortedCountryList.splice(countryIndex, 1);
			}
		});

		this.sortedCountryList.unshift(...prioritizedCountriesInfo);
	}

	/**
	 * This method sets the dial code based on the country selected by
	 * the user
	 * @param countryCode 
	 */
	setDialCode(countryCode: CountryCode): void {
		if ((!this.disabled || this.control.disabled) && !this.readOnly) {
			const selectedCountry: AbcCountryInfo = this.countries.find((country: AbcCountryInfo) => {
				return country.code == countryCode;
			});

			if (selectedCountry && selectedCountry.dialCode) {
				this.dialCode = selectedCountry.dialCode;

				if (this.allowEmitValue) {
					this.dialCodeChange.emit(this.dialCode);
					this.setFormattedPhoneNumber(this.value, countryCode);
					this.modelUpdate(this.value, countryCode, true);
				}
			}
		}
	}

	/**
	 * This method sets the formatted phone number based on the current dial code country and the entered phone
	 * number
	 * @param phoneNumber 
	 * @param dialCodeCountry 
	 */
	setFormattedPhoneNumber(phoneNumber: string, dialCodeCountry: CountryCode = this.dialCodeCountry): void {
		const fullPhoneNumber: string = (this.dialCode || "") + (phoneNumber || "");
		const formattedPhoneNumber: PhoneNumber = formatPhoneNumber("+" + fullPhoneNumber, dialCodeCountry);
		this.formattedPhoneNumber = (formattedPhoneNumber && formattedPhoneNumber.formatNational()) || this.value;
	}

	/**
	 * This method is called whenever the user changes the phone number or the dial code.
	 * It emits the current values of both fields along with some useful parameters
	 * @param phoneNumber 
	 */
	modelUpdate(phoneNumber: string, dialCodeCountry: CountryCode = this.dialCodeCountry, allowEmitValue: boolean = false): void {
		if ((allowEmitValue || (this.phoneNumber != this.value)) && (!this.disabled || this.control.disabled) && !this.readOnly) {
			this.phoneNumber = this.value;
			this.update.emit({
				formId: this.id,
				name: this.name || this.formControlName,
				countryCode: dialCodeCountry,
				dialCode: this.dialCode,
				phoneNumber: phoneNumber,
				pn: this.value,
				internationalPhoneNumber: (this.dialCode || "") + (phoneNumber || ""),
				formattedPhoneNumber: this.formattedPhoneNumber,
				internationalFormattedPhoneNumber: (this.dialCode || "") + (this.formattedPhoneNumber || "")
			});
		}
	}
}