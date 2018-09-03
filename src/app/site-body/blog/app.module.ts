import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RegularBlogPostComponent } from './single-post/regular.post.component';
import { SharedModule } from '../shared/app.module';

@NgModule({
	declarations: [
		RegularBlogPostComponent
	],
	imports: [
		BrowserModule,
		SharedModule
	],
	providers: [],
	exports: [
		RegularBlogPostComponent
	]
})

export class BlogPageModule { }