import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DisqusModule } from 'angular2-disqus';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';

import { RegularBlogPostComponent } from './single-post/regular.post.component';
import { SharedModule } from '../shared/app.module';
import { FeaturedPostsSidebarComponent } from './featured-posts-sidebar/featuredposts.sidebar.component';

import { AppRoutingModule } from '../../app-routing.module';
import { SearchPostsComponent } from './search-posts/search.posts.component';

@NgModule({
	declarations: [
		RegularBlogPostComponent,
		FeaturedPostsSidebarComponent,
		SearchPostsComponent
	],
	imports: [
		BrowserModule,
		SharedModule,
		AppRoutingModule,
		FormsModule,
		DisqusModule,
		JwSocialButtonsModule
	],
	providers: [],
	exports: [
		RegularBlogPostComponent,
		FeaturedPostsSidebarComponent,
		SearchPostsComponent
	]
})

export class BlogPageModule { }