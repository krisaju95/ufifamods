import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class WAFormElementsService {

    id: number = 0;

    accentedCharacterMap: object = {
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
    }

    /**
     * When an ID hasn't been provided for any form field element, this method can be used
     * to auto-generate a unique ID for each form field
     * @returns {string}
     */
    generateFormFieldID(): string {
        return 'wa-form-element-id-' + this.id++;
    }

    /**
     * Create the class string to be used for the form field appearance
     * @param appearance 
     */
    generateAppearanceClass(design: string, appearance: string): string {
        return appearance.split(' ').map((val: string) => {
            return 'wa-form-element-' + design + '-appearance-' + val;
        }).join(' ');
    }

    /**
     * Check if the current client browser is Internet Explorer
     * @returns {boolean}
     */
    isIEBrowser(): boolean {
        return !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
    }

    /**
     * This method replaces all accented characters with regular english characters for a given string
     * @param str
     */
    replaceAccentedCharacters(str: string) {
        for (let key in this.accentedCharacterMap) {
            const regExp: RegExp = this.accentedCharacterMap[key];
            str = str.replace(regExp, key);
        }
        return str;
    }

    /**
     * This method is used to remove the attribute role from the error text element. IE being the great
     * browser it is, and together with the JAWS screen reader... I have no words, they read out inline
     * error messages even if the user corrects their input. To prevent this from happening, we get rid
     * of the role alert as the user starts modifying their input to prevent the screen reader from
     * picking it up again. 
     * 
     * CREDIT: Madhuri Pendyala
     * 
     * @param formFieldID The ID of the formfield
     */
    removeRoleAlert(formFieldID: string): void {
        const errorTextElement: HTMLElement = document.getElementById(formFieldID + '-error-text');
        if (errorTextElement) {
            errorTextElement.removeAttribute('role');
        }
    }

    /**
     * See description for method removeRoleAlert for more details. This method will add back the role
     * attrbibute which we removed in the method above. This is to handle cases where the user has corrected
     * one error but is now presented with a different error which needs to be read out.
     * @param formFieldID 
     */
    addRoleAlert(formFieldID: string): void {
        setTimeout(() => {
            const errorTextElement: HTMLElement = document.getElementById(formFieldID + '-error-text');
            if (errorTextElement) {
                errorTextElement.setAttribute('role', 'alert');
            }
        }, 0);
    }

    /**
     * This checks whether the given viewport is the same as viewPortType
     * @param viewPortType 
     */
    checkViewPort(viewPortType: string): boolean {
        switch (viewPortType) {
            case 'mobile': {
                return window.innerWidth <= 767;
            }
            case 'tab': {
                return window.innerWidth >= 768 && window.innerWidth <= 1024;
            }
            case '<tab': {
                return window.innerWidth <= 1024;
            }
            case 'desktop': {
                return window.innerWidth > 1024;
            }
        }
        return false;
    }

    /**
     * Get width of the brower's scrollbar
     * @returns string
     */
    getScrollBarWidth() {
        let bodyWidth = document.body.clientWidth;
        let windowInnerWidth = window['innerWidth'];
        return (windowInnerWidth - bodyWidth) + "px";
    }

    getFormFieldError(formControl: AbstractControl, controlName: string, errors: any = {}): any {
        if (formControl && formControl.errors) {
            const formControlErrors: any = formControl!.errors;
            for (const error of Object.keys(formControlErrors)) {
                const params: any = this.getInterpolationParams(formControlErrors[error]);
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
        return "";
    }

    getInterpolationParams(error: any): any {
        let params: any = {};
        if (typeof error == "object") {
            params = error;
        }
        return params;
    }
}