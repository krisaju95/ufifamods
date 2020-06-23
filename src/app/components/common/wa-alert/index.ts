import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WAAlertComponent } from "./wa-alert.component";

@NgModule({
	imports: [CommonModule],
	declarations: [WAAlertComponent],
	exports: [WAAlertComponent]
})
export class WAAlertModule { }