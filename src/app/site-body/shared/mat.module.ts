import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
	MatRippleModule,
	MatChipsModule,
	MatDialogModule,
	MatButtonModule,
	MatCheckboxModule,
	MatGridListModule,
	MatSidenavModule,
	MatTooltipModule,
	MatInputModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatSelectModule
} from '@angular/material';

@NgModule({
	imports: [
		BrowserModule,
		MatRippleModule,
		MatChipsModule,
		MatDialogModule,
		MatButtonModule,
		MatCheckboxModule,
		MatGridListModule,
		MatSidenavModule,
		MatTooltipModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSelectModule
	],
	exports: [
		MatRippleModule,
		MatChipsModule,
		MatDialogModule,
		MatButtonModule,
		MatCheckboxModule,
		MatGridListModule,
		MatSidenavModule,
		MatTooltipModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSelectModule
	],
	providers: [
		MatDatepickerModule
	]
})

export class MaterialModule { }