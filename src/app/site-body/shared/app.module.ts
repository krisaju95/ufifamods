import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AdPlaceholderComponent } from './ad-placeholder/ad.placeholder';
import { AppLoaderComponent } from './site-loader/app.loader';



@NgModule({
	declarations: [
		AdPlaceholderComponent,
		AppLoaderComponent
	],
	imports: [
		BrowserModule
	],
	providers: [],
	exports: [
		AdPlaceholderComponent,
		AppLoaderComponent
	]
})

export class SharedModule { }