/**
 * This is the class used for detecting screen reader elements. Such elements
 * are only detected by screen readers and are not visible to regular users.
 */
export const screenReaderClass: string = "abc-sr-only";

/**
 * These are the common icon classes used throughout the library components.
 * If you're using material icons, you can replace these with the material icon
 * identifiers but you'll have to manually update the code to pick up icons from
 * the mat-icon library
 */
export const icons: any = {
	close: "uil uil-multiply",
	checkmark: "uil uil-check",
	dropDownChevron: "uil uil-angle-down",
	search: "uil uil-search",
	formFieldError: "uil uil-exclamation-circle",
	clear: "uil uil-multiply",
	password: {
		hide: "uil uil-eye-slash",
		show: "uil uil-eye"
	}
};

/**
 * This is the set of supported diacritics regular expressions when working with the
 * search filter for the custom drop-downs
 */
export const accentedCharacterMap: object = {
	"a": new RegExp("á|à|â|ä|ã|å|ǎ", "g"),
	"ae": new RegExp("æ", "g"),
	"c": new RegExp("ç|ĉ", "g"),
	"e": new RegExp("é|è|ê|ë|ȇ|ȅ", "g"),
	"i": new RegExp("í|ì|î|ï", "g"),
	"n": new RegExp("ñ", "g"),
	"o": new RegExp("ó|ò|ô|ö|õ|ǒ", "g"),
	"oe": new RegExp("œ", "g"),
	"u": new RegExp("ú|ù|û|ü", "g"),
	"y": new RegExp("ý|ÿ", "g"),
	"A": new RegExp("Á|À|Â|Ä|Ã|Å|Ǎ", "g"),
	"AE": new RegExp("Æ", "g"),
	"C": new RegExp("Ç|Ĉ", "g"),
	"E": new RegExp("É|È|Ê|Ë|Ȇ|Ȅ", "g"),
	"I": new RegExp("Í|Ì|Î|Ï", "g"),
	"N": new RegExp("Ñ", "g"),
	"O": new RegExp("Ó|Ò|Ô|Ö|Õ|Ǒ", "g"),
	"OE": new RegExp("Œ", "g"),
	"U": new RegExp("Ú|Ù|Û|Ü", "g"),
	"Y": new RegExp("Ý|Ÿ", "g"),
	"s": new RegExp("ß", "g")
};