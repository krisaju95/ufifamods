import { Component, Input, ViewEncapsulation } from "@angular/core";
import { FormControl } from "@angular/forms";
import { AbcService } from '../../utils';

/**
 * This component renders hints and error messages below a form field
 */
@Component({
    selector: "abc-subscript",
    templateUrl: "./abc-subscript.template.html",
    styleUrls: ["./abc-subscript.scss"],
    encapsulation: ViewEncapsulation.None
})
export class AbcSubscriptComponent {

    /**
     * Pass the prefix for the id of the subscript text container. The ID is always of the format
     * <prefixId>ErrorText or <prefix>HintText
     */
    @Input() prefixId: string = "";

    /**
     * Pass the hint text design here
     */
    @Input() design: string = "material";

    /**
     * Pass the form control object if available
     */
    @Input() control: FormControl = new FormControl();

    /**
     * Determines whether the form element was touched or not
     */
    @Input() touched: boolean = false;

    /**
     * Pass the state of the form control (can be used when working with template drive-forms)
     */
    @Input() invalid: boolean = false;

    /**
     * Pass the hint text/template that needs to be displayed
     */
    @Input() hint: any = "";

    /**
     * Pass the error text/template that needs to be displayed
     */
    @Input() error: any = "";

    /**
     * Stores the text-direction of the application. This is used to detect orientation for languages like
     * Arabic where the language is written and read from right to left.
     */
    @Input() textDirection: string = this.service.getTextDirection();

    /**
     * If you wish to handle the error display with custom logic, then pass this parameter as true and the error message will not
     * be displayed. The screen-readers will still pick up the message if available.
     */
    @Input() hasSubscript: boolean = true;

    /**
     * @ignore
     * @param service 
     */
    constructor(private service: AbcService) { }
}