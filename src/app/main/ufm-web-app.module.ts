// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routing Module
import { UFMWebAppRoutingModule } from '../routing/ufm-web-app.routing-module';

// Main Web App Component
import { UFMWebAppComponent } from './ufm-web-app.component';

// Additional Modules
import { WAHeaderComponent, WAFooterComponent } from '../components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Page Modules
import { WAPageHomeModule } from '../components/pages/home';
import { WAPageBlogModule } from '../components/pages/blog';
import { WABlogPostModule } from '../components/pages/blog-post';
import { CreateFUTCardModule } from '../components/pages/create-fut-card';

// Service Modules
import { WADBServiceModule } from '../services/database';
import { WALoaderServiceModule } from '../services/loader';
import { WARootScopeModule } from '../services/globals';

@NgModule({
	declarations: [
		UFMWebAppComponent,
		WAHeaderComponent,
		WAFooterComponent
	],
	imports: [
		BrowserModule,
		UFMWebAppRoutingModule,
		FontAwesomeModule,
		WAPageHomeModule,
		WAPageBlogModule,
		WABlogPostModule,
		CreateFUTCardModule,
		WADBServiceModule,
		WALoaderServiceModule,
		WARootScopeModule
	],
	providers: [],
	bootstrap: [UFMWebAppComponent]
})
export class UFMWebAppModule { }