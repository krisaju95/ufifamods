import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './site-header/app.header.component';
import { AppBodyComponent } from './site-body/app.body.component';

import { AppBodyModule } from './site-body/app.module';
import { UtilitiesService } from './services/utilities.service';
import { AppFooterComponent } from './site-footer/app.footer.component';
import { SharedModule } from './site-body/shared/app.module';
import { AppRoutingModule } from './app-routing.module';

enableProdMode()

@NgModule({
	declarations: [
		AppComponent,
		AppHeaderComponent,
		AppBodyComponent,
		AppFooterComponent
	],
	imports: [
		BrowserModule,
		AppBodyModule,
		SharedModule,
		AppRoutingModule
	],
	providers: [
		UtilitiesService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
