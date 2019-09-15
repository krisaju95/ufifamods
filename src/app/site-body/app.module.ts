import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HomePageModule } from './home/app.module';
import { BlogPageModule } from './blog/app.module';
import { FIFAModule } from './fifa/app.module';

import { DatePipe } from '@angular/common';

import { ErrorPageComponent } from './error-page/error.page.component'

@NgModule({
	declarations: [
		ErrorPageComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		HomePageModule,
		BlogPageModule,
		FIFAModule
	],
	providers: [
		DatePipe
	],
	exports: [
		HomePageModule,
		BlogPageModule
	]
})

export class AppBodyModule { }