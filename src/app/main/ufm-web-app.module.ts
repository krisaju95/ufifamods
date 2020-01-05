// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routing Module
import { UFMWebAppRoutingModule } from '../routing/ufm-web-app.routing-module';

// Main Web App Component
import { UFMWebAppComponent } from './ufm-web-app.component';

// Additional Modules
import { WAHeaderComponent, WAFooterComponent } from '../components';

@NgModule({
	declarations: [
		UFMWebAppComponent,
		WAHeaderComponent,
		WAFooterComponent
	],
	imports: [
		BrowserModule,
		UFMWebAppRoutingModule
	],
	providers: [],
	bootstrap: [UFMWebAppComponent]
})
export class UFMWebAppModule { }