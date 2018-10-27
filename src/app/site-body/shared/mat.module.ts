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
	MatIconModule
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
		MatIconModule
	],
	exports: [
		MatCardModule,
		MatRippleModule,
		MatChipsModule,
		MatDialogModule,
		MatButtonModule,
		MatCheckboxModule,
		MatGridListModule,
		MatIconModule
	]
})

export class MaterialModule { }