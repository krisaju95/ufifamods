import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeMainPostComponent } from './home-main-post/home.mainpost.component';
import { HomeComponent } from './home.component';
import { HomeFUTPostsComponent } from './home-fut-posts/home.futposts.component';
import { HomeFIFAPostsComponent } from './home-fifa-posts/home.fifaposts.component';

import { SharedModule } from '../shared/app.module';
import { AppRoutingModule } from '../../app-routing.module';
import { MaterialModule } from '../shared/mat.module';

@NgModule({
	declarations: [
		HomeComponent,
		HomeMainPostComponent,
		HomeFUTPostsComponent,
		HomeFIFAPostsComponent
	],
	imports: [
		BrowserModule,
		SharedModule,
		AppRoutingModule,
		MaterialModule
	],
	providers: [],
	exports: [
		HomeComponent,
		HomeMainPostComponent,
		HomeFUTPostsComponent,
		HomeFIFAPostsComponent
	]
})

export class HomePageModule { }