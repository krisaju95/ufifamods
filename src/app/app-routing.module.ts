import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './site-body/home/home.component';
import { RegularBlogPostComponent } from './site-body/blog/single-post/regular.post.component';
import { ErrorPageComponent } from './site-body/error-page/error.page.component';
import { SearchPostsComponent } from './site-body/blog/search-posts/search.posts.component';
import { BlogPostsListComponent } from './site-body/blog/blog-posts-list/blogposts.list.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{ path: 'home', redirectTo: '' },
	{ path: 'blog', pathMatch: 'full', component: BlogPostsListComponent },
	{ path: 'blog/all/pages/:pageNumber', pathMatch: 'full', component: BlogPostsListComponent },
	{ path: 'blog/post/:year/:month/:date/:title', component: RegularBlogPostComponent },
	// { path: 'downloads', component: ErrorPageComponent },
	{ path: 'search', component: SearchPostsComponent },
	{ path: 'search/:query', component: SearchPostsComponent },
	{ path: 'error', pathMatch: 'full', component: ErrorPageComponent },
	{ path: 'error/:errorCode', component: ErrorPageComponent },
	{ path: '**', redirectTo: 'error/404' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})

export class AppRoutingModule { }