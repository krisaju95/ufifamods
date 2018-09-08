import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RegularBlogPostComponent } from './single-post/regular.post.component';
import { SharedModule } from '../shared/app.module';
import { FeaturedPostsSidebarComponent } from './featured-posts-sidebar/featuredposts.sidebar.component';

import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
	declarations: [
		RegularBlogPostComponent,
		FeaturedPostsSidebarComponent
	],
	imports: [
		BrowserModule,
		SharedModule,
		AppRoutingModule
	],
	providers: [],
	exports: [
		RegularBlogPostComponent,
		FeaturedPostsSidebarComponent
	]
})

export class BlogPageModule { }