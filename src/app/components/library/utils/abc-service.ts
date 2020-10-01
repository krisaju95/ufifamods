import { Injectable } from "@angular/core";
import { FormControl, NgControl, NgModel } from "@angular/forms";
import { accentedCharacterMap } from "./abc-constants";
import { AbcFormFieldErrorData } from './abc-interfaces';
import { AbcKeyboardEvent, abcEventKeyCode, abcEventKey } from "./abc-event-keycodes";

/**
 * This service is used for various purposes by the ABC component library
 */
@Injectable()
export class AbcService {

    /**
     * This attribute is sued to generate a unique ID for each instance of an ABC
     * library component
     */
    id: number = 0;

    /**
     * This attribute determines whether the user is currently on IE
     */
    isIe: boolean = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);

    /**
     * When an ID hasn"t been provided for any ABC component, this method can be used
     * to auto-generate a unique ID for each element
     * @returns {string}
     */
    generateElementID(): string {
        return "abcElement" + this.id++;
    }

    /**
     * Create the class string to be used for the form field appearance
     * @param appearance
     * @returns {string}
     */
    generateAppearanceClass(design: string, appearance: string): string {
        return (appearance || "standard").split(" ").map((val: string) => {
            return "abc-form-element-" + design + "-appearance-" + val;
        }).join(" ");
    }

    /**
     * Find the type of keyboard event from the KeyBoardEvent object passed here
     * @param event 
     */
    getKeyPressed(event: KeyboardEvent): AbcKeyboardEvent {
        if (event) {
            const eventType: string = (event.key) ? "key" : "keyCode"
            const eventTypeCodes: { [key: string]: any[] } = (event.key) ? abcEventKey : abcEventKeyCode;
            return Object.keys(eventTypeCodes).find((key: any) => {
                return eventTypeCodes[key].indexOf(event[eventType]) > -1;
            }) as AbcKeyboardEvent;
        }
    }

    /**
     * Check if an event keyCode matches a given key events (or list of key events)
     * @param event 
     * @param key 
     */
    checkIfKeyPressed(event: KeyboardEvent, key: AbcKeyboardEvent | AbcKeyboardEvent[]): boolean {
        if (event) {
            const keys: any = (typeof key == "string") ? [key] : key;
            return keys.some((key: any) => {
                return key == this.getKeyPressed(event);
            });
        }
    }

    /**
     * Get the text-direction of the application. This is used to detect orientation for
     * languages like Arabic where the language is written and read from right to left.
     */
    getTextDirection(): "rtl" | "ltr" {
        const html: HTMLElement = document.querySelector("html");
        return html.getAttribute("dir") == "rtl" ? "rtl" : "ltr";
    }

    /**
     * Check if the current client browser is Internet Explorer
     * @returns {boolean}
     */
    isIEBrowser(): boolean {
        return this.isIe;
    }

    /**
     * This method gets the DOMRect object for a given HTMLElement. This is needed
     * to ensure cross-browser support (since IE 11 has a different spec for this
     * property)
     * @param element 
     */
    getBoundingClientRect(element: HTMLElement): DOMRect {
        if (element) {
            const rect: DOMRect = element.getBoundingClientRect() as DOMRect;
            if (this.isUndefined(rect.x) && this.isUndefined(rect.y)) {
                rect.x = rect.left;
                rect.y = rect.top;
            }
            return rect;
        }
    }

    /**
     * This method replaces all accented characters with regular english characters for a given string
     * @param value
     * @returns {string}
     */
    replaceAccentedCharacters(value: string): string {
        for (let key in accentedCharacterMap) {
            const regExp: RegExp = accentedCharacterMap[key];
            value = value.replace(regExp, key);
        }
        return value;
    }

    /**
     * This method is used to remove the attribute role from the error text element. IE being the great
     * browser it is, and together with the JAWS screen reader... I have no words, they read out inline
     * error messages even if the user corrects their input. To prevent this from happening, we get rid
     * of the role attribute as the user starts modifying their input to prevent the screen reader from
     * picking it up again. 
     * 
     * CREDIT: Madhuri PENDYALA
     * 
     * NOTE: This is a known issue with JAWS + IE - https://github.com/FreedomScientific/VFO-standards-support/issues/83
     * 
     * @param formFieldID The ID of the formfield
     * @returns {void}
     */
    removeRoleAlert(formFieldID: string): void {
        const errorTextElement: HTMLElement = document.getElementById(formFieldID + "ErrorText");
        if (errorTextElement) {
            errorTextElement.removeAttribute("role");
        }
    }

    /**
     * See description for method removeRoleAlert for more details. This method will add back the role
     * attrbibute which we removed in the method above. This is to handle cases where the user has corrected
     * one error but is now presented with a different error which needs to be read out.
     * @param formFieldID
     * @returns {void}
     */
    addRoleAlert(formFieldID: string): void {
        setTimeout(() => {
            const errorTextElement: HTMLElement = document.getElementById(formFieldID + "ErrorText");
            if (errorTextElement) {
                errorTextElement.setAttribute("role", "alert");
            }
        }, 0);
    }

    /**
     * This checks whether the given viewport is the same as viewPortType
     * @param viewPortType
     * @returns {boolean}
     */
    checkViewPort(viewPortType: string): boolean {
        switch (viewPortType) {
            case "mobile": {
                return window.innerWidth <= 767;
            }
            case "tab": {
                return window.innerWidth >= 768 && window.innerWidth <= 1024;
            }
            case "<tab": {
                return window.innerWidth <= 1024;
            }
            case "desktop": {
                return window.innerWidth > 1024;
            }
        }
        return false;
    }

    /**
     * Get width of the brower"s scrollbar
     * @returns {string}
     */
    getScrollBarWidth(element: HTMLElement): number {
        if (element.tagName == "BODY") {
            return window.innerWidth - document.body.clientWidth;
        } else {
            return (element.offsetWidth - element.clientWidth);
        }
    }

    /**
     * For Reactive Forms, the abc-input component has a special feature which allows you to auto-generate
     * resource keys for error messaging without having to explicitly code for it.
     * 
     * If you pass the keys attribute in the error config, it uses those keys to decide which error message
     * to display. If you pass the prefix instead, the error message keys are auto-generated in a specific format
     * like "<prefix>.<form-control-name>_<error-type>.error". For example: "profile.lastName_required.error"
     * @param formControl 
     * @param controlName 
     * @param errors 
     * @returns {any}
     */
    getFormFieldError(formControl: FormControl | NgControl | NgModel, controlName: string, errors: AbcFormFieldErrorData): "" | { key: string, params: object } {
        if (formControl && formControl.errors) {
            const formControlErrors: any = formControl!.errors;
            for (const error of Object.keys(formControlErrors)) {
                const params: any = this.getInterpolationParams(formControlErrors[error]);
                if (errors) {
                    if (errors.keys) {
                        if (errors.keys[error]) {
                            return { key: errors.keys[error], params: params };
                        }
                    } else if (errors.prefix && controlName) {
                        const errorKey: string = errors.prefix + "." + controlName + "_" + error + ".error";
                        return { key: errorKey, params: params };
                    }
                }
            }
        }
        return "";
    }

    /**
     * This is a utility method used to retrieve the error object from the form control.
     * @param error 
     * @returns {any}
     */
    getInterpolationParams(error: any): any {
        let params: any = {};
        if (typeof error == "object") {
            params = error;
        }
        return params;
    }

    /**
     * Check if a value is true as a string or boolean
     * @returns boolean
     */
    isValueTrue(value: string | boolean): boolean {
        return (value == "TRUE" || value == "true" || value == true);
    }

    /**
     * Check if a value is false as a string or boolean
     * @returns boolean
     */
    isValueFalse(value: string | boolean): boolean {
        return (value === "FALSE" || value === "false" || value === false);
    }

    /**
     * This method checks if a value is defined
     * @param value 
     */
    isDefined(value: any) {
        return (value != undefined && value != null);
    }

    /**
     * This method checks if a value is undefined
     * @param value 
     */
    isUndefined(value: any) {
        return !this.isDefined(value);
    }
}