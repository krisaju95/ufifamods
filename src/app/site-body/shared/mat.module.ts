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
	MatSidenavModule
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
		MatSidenavModule
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
		MatSidenavModule
	]
})

export class MaterialModule { }