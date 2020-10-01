import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AbcDialog } from "./abc-dialog";
import { AbcDialogComponent } from "./abc-dialog.component";
import { InsertionDirective } from "./abc-insertion.directive";
import { TranslateModule } from '@ngx-translate/core';
import { SafePipeModule } from 'safe-pipe';
import { AbcUtilsModule } from '../utils';
import { AbcButtonModule } from '../button';
import { AbcLoaderModule } from '../loader';

@NgModule({
	imports: [
		CommonModule, TranslateModule, SafePipeModule, AbcUtilsModule,
		AbcButtonModule, AbcLoaderModule
	],
	providers: [AbcDialog],
	declarations: [AbcDialogComponent, InsertionDirective],
	entryComponents: [AbcDialogComponent]
})
export class AbcDialogModule { }