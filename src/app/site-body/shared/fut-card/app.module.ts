import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FutCardComponent } from './fut-card.component';

import { SharedModule } from '../app.module';

@NgModule({
	declarations: [
		FutCardComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		SharedModule
	],
	exports: [
		FutCardComponent
	]
})

export class FutCardModule { }