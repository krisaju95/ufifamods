import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeMainPostComponent } from './home-main-post/home.mainpost.component';
import { HomeMainPostSelectorComponent } from './home-main-post-selector/home.mainpostselector.component';
import { HomeComponent } from './home.component';
import { HomeFUTPostsComponent } from './home-fut-posts/home.futposts.component';
import { HomeFIFAPostsComponent } from './home-fifa-posts/home.fifaposts.component';

import { SharedModule } from '../shared/app.module';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
	declarations: [
		HomeComponent,
		HomeMainPostComponent,
		HomeMainPostSelectorComponent,
		HomeFUTPostsComponent,
		HomeFIFAPostsComponent
	],
	imports: [
		BrowserModule,
		SharedModule,
		AppRoutingModule
	],
	providers: [],
	exports: [
		HomeComponent,
		HomeMainPostComponent,
		HomeMainPostSelectorComponent,
		HomeFUTPostsComponent,
		HomeFIFAPostsComponent
	]
})

export class HomePageModule { }