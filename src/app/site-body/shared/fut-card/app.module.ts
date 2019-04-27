import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FutCardComponent } from './fut-card.component';

@NgModule({
	declarations: [
		FutCardComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule
	],
	exports: [
		FutCardComponent
	]
})

export class FutCardModule { }