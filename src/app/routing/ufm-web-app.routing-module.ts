import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WAPageHomeComponent } from '../components/pages/home/wa-page-home.component';
import { WAPageBlogComponent } from '../components/pages/blog/wa-page-blog.component';
import { WABlogPostComponent } from '../components/pages/blog-post/wa-blog-post.component';

const routes: Routes = [
	{ path: '', component: WAPageHomeComponent, pathMatch: 'full' },
	{ path: 'home', redirectTo: '' },
	{ path: 'blog', pathMatch: 'full', component: WAPageBlogComponent },
	{ path: 'blog/pages/:pageNumber', pathMatch: 'full', component: WAPageBlogComponent },
	{ path: 'blog/post/:year/:month/:date/:title', component: WABlogPostComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class UFMWebAppRoutingModule { }