import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
	MatCardModule,
	MatRippleModule,
	MatChipsModule,
	MatDialogModule,
	MatButtonModule,
	MatCheckboxModule,
	MatGridListModule,
	MatIconModule,
	MatSidenavModule,
	MatTooltipModule
} from '@angular/material';

@NgModule({
	imports: [
		BrowserModule,
		MatCardModule,
		MatRippleModule,
		MatChipsModule,
		MatDialogModule,
		MatButtonModule,
		MatCheckboxModule,
		MatGridListModule,
		MatIconModule,
		MatSidenavModule,
		MatTooltipModule
	],
	exports: [
		MatCardModule,
		MatRippleModule,
		MatChipsModule,
		MatDialogModule,
		MatButtonModule,
		MatCheckboxModule,
		MatGridListModule,
		MatIconModule,
		MatSidenavModule,
		MatTooltipModule
	]
})

export class MaterialModule { }