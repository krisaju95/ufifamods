import { Directive, ViewContainerRef } from "@angular/core";

/**
 * @ignore
 */
@Directive({
	selector: "[acDialogContentInsertion]"
})
export class InsertionDirective {
	constructor(public viewContainerRef: ViewContainerRef) { }
}