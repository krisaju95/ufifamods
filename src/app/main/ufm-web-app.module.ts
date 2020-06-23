// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Routing Module
import { UFMWebAppRoutingModule } from '../routing/ufm-web-app.routing-module';

// Main Web App Component
import { UFMWebAppComponent } from './ufm-web-app.component';

// Common Components & Modules
import { WAHeaderComponent, WAFooterComponent } from '../components';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
	GoogleLoginProvider,
	FacebookLoginProvider
} from 'angularx-social-login';

// Page Modules
import { WAPageHomeModule } from '../components/pages/home';
import { WAPageBlogModule } from '../components/pages/blog';
import { WABlogPostModule } from '../components/pages/blog-post';
import { CreateFUTCardModule } from '../components/pages/create-fut-card';
import { WAPageDownloadCenterModule } from '../components/pages/download-center';

// Service Modules
import { WADBServiceModule } from '../services/database';
import { WALoaderServiceModule } from '../services/loader';
import { WARootScopeModule } from '../services/globals';
import { WARouterServiceModule } from '../services/router';

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
		HttpClientModule,
		SocialLoginModule
	],
	providers: [
		GoogleSheetsDbService,
		{
			provide: 'SocialAuthServiceConfig',
			useValue: {
				autoLogin: false,
				providers: [
					{
						id: GoogleLoginProvider.PROVIDER_ID,
						provider: new GoogleLoginProvider('clientId'),
					},
					{
						id: FacebookLoginProvider.PROVIDER_ID,
						provider: new FacebookLoginProvider('clientId'),
					}
				],
			} as SocialAuthServiceConfig,
		}
	],
	bootstrap: [UFMWebAppComponent]
})
export class UFMWebAppModule { }