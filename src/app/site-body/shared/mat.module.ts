import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
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
	MatSelectModule,
	MatAutocompleteModule
} from '@angular/material';

@NgModule({
	imports: [
		BrowserModule,
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
		MatSelectModule,
		MatAutocompleteModule
	],
	exports: [
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
		MatSelectModule,
		MatAutocompleteModule
	],
	providers: [
		MatDatepickerModule
	]
})

export class MaterialModule { }