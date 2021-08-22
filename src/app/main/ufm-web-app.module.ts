// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Routing Module
import { UFMWebAppRoutingModule } from '../routing/ufm-web-app.routing-module';

// Main Web App Component
import { UFMWebAppComponent } from './ufm-web-app.component';

// Common Components & Modules
import { WAHeaderComponent, WAFooterComponent, WADialogModule } from '../components';
import { API_KEY, GoogleSheetsDbService } from 'ng-google-sheets-db';

// Page Modules
import { WAPageHomeModule } from '../components/pages/home';
import { WAPageBlogModule } from '../components/pages/blog';
import { WABlogPostModule } from '../components/pages/blog-post';
import { CreateFUTCardModule } from '../components/pages/create-fut-card';
import { WAPageDownloadCenterModule } from '../components/pages/download-center';

// Service Modules
import { WADBServiceModule, WABrowserStorageServiceModule } from '../services/database';
import { WALoaderServiceModule } from '../services/loader';
import { WARootScopeModule } from '../services/globals';
import { WARouterServiceModule } from '../services/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		UFMWebAppComponent,
		WAHeaderComponent,
		WAFooterComponent
	],
	imports: [
		BrowserModule,
		UFMWebAppRoutingModule,
		WAPageHomeModule,
		WAPageBlogModule,
		WAPageDownloadCenterModule,
		WABlogPostModule,
		CreateFUTCardModule,
		WADBServiceModule,
		WALoaderServiceModule,
		WARootScopeModule,
		WARouterServiceModule,
		WABrowserStorageServiceModule,
		HttpClientModule,
		WADialogModule,
		TranslateModule.forRoot()
	],
	providers: [
		{
			provide: API_KEY,
			useValue: 'AIzaSyDDk7Qbit_JDAbJmvopV2IvOeB8vzWrXZg'
		},
		GoogleSheetsDbService
	],
	bootstrap: [UFMWebAppComponent]
})
export class UFMWebAppModule { }