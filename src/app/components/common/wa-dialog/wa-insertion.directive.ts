import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[acDialogContentInsertion]'
})
export class InsertionDirective {
	constructor(public viewContainerRef: ViewContainerRef) { }
}