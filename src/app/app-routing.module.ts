import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SiteAdminComponent } from './site-admin/site.admin.component';
import { HomeComponent } from './site-body/home/home.component';
import { RegularBlogPostComponent } from './site-body/blog/single-post/regular.post.component';
import { ErrorPageComponent } from './site-body/error-page/error.page.component';
import { BlogPostsListComponent } from './site-body/blog/blog-posts-list/blogposts.list.component';

import { environment } from '../environments/environment';

let routes: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{ path: 'home', redirectTo: '' },
	{ path: 'blog', pathMatch: 'full', component: BlogPostsListComponent },
	{ path: 'blog/pages/:pageNumber', pathMatch: 'full', component: BlogPostsListComponent },
	{ path: 'blog/post/:year/:month/:date/:title', component: RegularBlogPostComponent },
	{ path: 'error', pathMatch: 'full', component: ErrorPageComponent },
	{ path: 'error/:errorCode', component: ErrorPageComponent },
	{ path: '**', redirectTo: 'error/404' }
];

if (!environment.production) {
	routes = [
		{ path: '', component: HomeComponent, pathMatch: 'full' },
		{ path: 'home', redirectTo: '' },
		{ path: 'blog', pathMatch: 'full', component: BlogPostsListComponent },
		{ path: 'blog/pages/:pageNumber', pathMatch: 'full', component: BlogPostsListComponent },
		{ path: 'blog/post/:year/:month/:date/:title', component: RegularBlogPostComponent },
		{ path: 'admin', component: SiteAdminComponent },
		{ path: 'error', pathMatch: 'full', component: ErrorPageComponent },
		{ path: 'error/:errorCode', component: ErrorPageComponent },
		{ path: '**', redirectTo: 'error/404' }
	];
}

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})

export class AppRoutingModule { }