import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AbcAlertComponent } from "./abc-alert.component";
import { AbcUtilsModule } from "../utils";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [CommonModule, AbcUtilsModule, TranslateModule],
	declarations: [AbcAlertComponent],
	exports: [AbcAlertComponent]
})
export class AbcAlertModule { }