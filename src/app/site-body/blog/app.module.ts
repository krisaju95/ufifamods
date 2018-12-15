import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DisqusModule } from 'angular2-disqus';

import { BlogPostsListComponent } from './blog-posts-list/blogposts.list.component';
import { RegularBlogPostComponent, ModDownloadDialog } from './single-post/regular.post.component';
import { SharedModule } from '../shared/app.module';
import { FeaturedPostsSidebarComponent } from './featured-posts-sidebar/featuredposts.sidebar.component';
import { ScreenShotsPanelComponent } from './screenshots-panel/screenshots.panel.component';
import { ContributorsPanelComponent } from './contributors-panel/contributors.panel.component';
import { FacesIncludedPanelComponent } from './faces-included-panel/faces.included.panel.component';

import { AppRoutingModule } from '../../app-routing.module';
import { SearchPostsComponent } from './search-posts/search.posts.component';

import { MaterialModule } from '../shared/mat.module';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

@NgModule({
	declarations: [
		BlogPostsListComponent,
		RegularBlogPostComponent,
		ModDownloadDialog,
		FeaturedPostsSidebarComponent,
		ScreenShotsPanelComponent,
		ContributorsPanelComponent,
		FacesIncludedPanelComponent,
		SearchPostsComponent
	],
	imports: [
		BrowserModule,
		SharedModule,
		AppRoutingModule,
		FormsModule,
		DisqusModule,
		MaterialModule,
		ShareButtonsModule.forRoot(),
		HttpClientModule,
		HttpClientJsonpModule
	],
	providers: [],
	exports: [
		BlogPostsListComponent,
		RegularBlogPostComponent,
		ModDownloadDialog,
		FeaturedPostsSidebarComponent,
		ScreenShotsPanelComponent,
		ContributorsPanelComponent,
		FacesIncludedPanelComponent,
		SearchPostsComponent
	],
	entryComponents: [
		ModDownloadDialog
	]
})

export class BlogPageModule { }