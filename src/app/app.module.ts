import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './site-header/app.header.component';
import { AppBodyComponent } from './site-body/app.body.component';

import { SiteAdminModule } from './site-admin/app.module';
import { AppBodyModule } from './site-body/app.module';
import { UtilitiesService } from './services/utilities.service';
import { ClubInfoService } from './services/clubinfo.service';
import { ConstantsProviderService } from './services/constants-provider.service';
import { TeamInfoService } from './services/team-info.service';
import { AppFooterComponent } from './site-footer/app.footer.component';
import { SharedModule } from './site-body/shared/app.module';
import { AppRoutingModule } from './app-routing.module';

import { MaterialModule } from './site-body/shared/mat.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { environment } from '../environments/environment';

let moduleImports = [
	BrowserModule,
	BrowserAnimationsModule,
	AppBodyModule,
	SiteAdminModule,
	SharedModule,
	AppRoutingModule,
	MaterialModule,
	FontAwesomeModule
]

if (environment.production) {
	moduleImports = [
		BrowserModule,
		BrowserAnimationsModule,
		AppBodyModule,
		SharedModule,
		AppRoutingModule,
		MaterialModule,
		FontAwesomeModule
	]
}


enableProdMode()

@NgModule({
	declarations: [
		AppComponent,
		AppHeaderComponent,
		AppBodyComponent,
		AppFooterComponent
	],
	imports: [
		...moduleImports
	],
	providers: [
		UtilitiesService,
		ClubInfoService,
		ConstantsProviderService,
		TeamInfoService,
		Title
	],
	bootstrap: [AppComponent]
})

export class AppModule { }