import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './site-body/home/home.component';
import { RegularBlogPostComponent } from './site-body/blog/single-post/regular.post.component';
import { PageNotFoundComponent } from './site-body/pagenotfound/pagenotfound.component'
import { SearchPostsComponent } from './site-body/blog/search-posts/search.posts.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', redirectTo: '' },
  { path: 'blog/post/:year/:month/:date/:title', component: RegularBlogPostComponent },
  { path: 'downloads', redirectTo: '404' },
  { path: 'search', component: SearchPostsComponent },
  { path: 'search/:query', component: SearchPostsComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }