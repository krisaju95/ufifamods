import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './site-header/app.header.component';
import { AppBodyComponent } from './site-body/app.body.component';

import { SiteAdminModule } from './site-admin/app.module';
import { AppBodyModule } from './site-body/app.module';
import { UtilitiesService } from './services/utilities.service';
import { AppFooterComponent } from './site-footer/app.footer.component';
import { SharedModule } from './site-body/shared/app.module';
import { AppRoutingModule } from './app-routing.module';

import { MaterialModule } from './site-body/shared/mat.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


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
		BrowserAnimationsModule,
		AppBodyModule,
		SiteAdminModule,
		SharedModule,
		AppRoutingModule,
		MaterialModule,
		FontAwesomeModule
	],
	providers: [
		UtilitiesService,
		Title
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
