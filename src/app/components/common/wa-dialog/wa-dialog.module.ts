import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WADialog } from "./wa-dialog";
import { WADialogComponent } from './wa-dialog.component';
import { InsertionDirective } from './wa-insertion.directive';

@NgModule({
	imports: [CommonModule],
	providers: [WADialog],
	declarations: [WADialogComponent, InsertionDirective],
	entryComponents: [WADialogComponent]
})
export class WADialogModule { }