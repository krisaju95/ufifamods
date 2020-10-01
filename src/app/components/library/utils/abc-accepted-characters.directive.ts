import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * This directive allows to filter the characters entered into an input field.
 * If the entered character is not part of the accepted characters, it's not displayed.
 * @note This code have been taken from AC checkin app, if any bugs found on it, please inform checkin team
 */
@Directive({
	selector: `
		[abcAcceptedCharacters][formControlName],
		[abcAcceptedCharacters][formControl],
		[abcAcceptedCharacters][ngModel]
	`
})
export class AbcAcceptedCharactersDirective {

	/**
	 * Accepted characters - content of regex enum
	 * @example 0-9a-z
	 */
	@Input() public abcAcceptedCharacters: string;

	/**
	 * @ignore
	 * @param control 
	 */
	constructor(private control: NgControl) { }

	/**
	 * This method checks if the key entered is allowed for the given form control
	 * @param event 
	 */
	private isAuthorizedKeyCode(event: KeyboardEvent) {
		return [46, 8, 9, 27, 13, 110, 190].indexOf(event.keyCode) !== -1 ||
			(event.keyCode === 65 && (event.ctrlKey || event.metaKey)) ||// Allow: Ctrl+A
			(event.keyCode === 67 && (event.ctrlKey || event.metaKey)) ||// Allow: Ctrl+C
			(event.keyCode === 86 && (event.ctrlKey || event.metaKey)) ||// Allow: Ctrl+V
			(event.keyCode === 88 && (event.ctrlKey || event.metaKey)) ||// Allow: Ctrl+X
			(event.keyCode >= 35 && event.keyCode <= 39); // Allow: home, end, left, right
	}

	/**
	 * This method updates the form control value after stripping out invalid characters
	 */
	private updateControlValue() {
		if (this.abcAcceptedCharacters) {
			const invalidCharactersRegex = '[^' + this.abcAcceptedCharacters + ']';
			if (this.control!.control!.value) {
				const currentValue = (this.control!.control!.value).toString();
				const newValue = currentValue.replace(new RegExp(invalidCharactersRegex, 'g'), '');
				if (newValue !== currentValue) {
					this.control!.control!.setValue(newValue);
				}
			}
		}
	}

	/**
	 * This method gets called whenver the user presses a key and checks for valid keys
	 * presses
	 * @param event 
	 */
	@HostListener('keydown', ['$event'])
	publiconKeyDown(event: KeyboardEvent) {
		if (this.abcAcceptedCharacters) {
			const regex = '[' + this.abcAcceptedCharacters + ']';
			const char = event.key || String.fromCharCode(event.keyCode);
			if (this.isAuthorizedKeyCode(event) || !!char.match(new RegExp(regex, 'g'))) {
				return;
			}
			event.preventDefault();
		}
	}

	/**
	 * This is called when the user releases a key and the control value is updated
	 */
	@HostListener('keyup', ['$event'])
	publiconKeyUp() {
		this.updateControlValue();
	}

	/**
	 * This method blocks the user from being able to copy paste invalid characters without
	 * manually typing them
	 * @param $event 
	 */
	@HostListener('paste', ['$event'])
	publicblockPaste($event: KeyboardEvent) {
		setTimeout(() => {
			this.updateControlValue();
			$event.preventDefault();
		});
	}
}