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
import { FUTSquadPanelComponent } from './fut-squad-panel/fut-squad-panel.component';

import { AppRoutingModule } from '../../app-routing.module';
import { SearchPostsDialogComponent, SearchPostsDialog } from './search-posts/search.posts.dialog';
import { VideoPlayerModule } from './video-player/app.module';

import { MaterialModule } from '../shared/mat.module';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FutCardModule } from '../shared/fut-card/app.module';

@NgModule({
	declarations: [
		BlogPostsListComponent,
		RegularBlogPostComponent,
		ModDownloadDialog,
		FeaturedPostsSidebarComponent,
		ScreenShotsPanelComponent,
		ContributorsPanelComponent,
		FacesIncludedPanelComponent,
		FUTSquadPanelComponent,
		SearchPostsDialogComponent,
		SearchPostsDialog
	],
	imports: [
		BrowserModule,
		SharedModule,
		AppRoutingModule,
		FormsModule,
		DisqusModule,
		MaterialModule,
		FutCardModule,
		VideoPlayerModule,
		ShareButtonsModule.forRoot(),
		HttpClientModule,
		HttpClientJsonpModule
	],
	exports: [
		BlogPostsListComponent,
		RegularBlogPostComponent,
		ModDownloadDialog,
		FeaturedPostsSidebarComponent,
		ScreenShotsPanelComponent,
		ContributorsPanelComponent,
		FacesIncludedPanelComponent,
		FUTSquadPanelComponent,
		SearchPostsDialogComponent,
		SearchPostsDialog
	],
	entryComponents: [
		ModDownloadDialog,
		SearchPostsDialog
	]
})

export class BlogPageModule { }