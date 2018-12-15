import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeMainPostComponent } from './home-main-post/home.mainpost.component';
import { HomeComponent } from './home.component';
import { HomePostsSectionComponent } from './home-posts-section/home.posts.section.component';

import { SharedModule } from '../shared/app.module';
import { AppRoutingModule } from '../../app-routing.module';
import { MaterialModule } from '../shared/mat.module';

@NgModule({
	declarations: [
		HomeComponent,
		HomeMainPostComponent,
		HomePostsSectionComponent
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
		HomePostsSectionComponent
	]
})

export class HomePageModule { }