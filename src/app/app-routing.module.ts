import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './site-body/home/home.component';
import { RegularBlogPostComponent } from './site-body/blog/single-post/regular.post.component';
import { PageNotFoundComponent } from './site-body/pagenotfound/pagenotfound.component'

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', redirectTo: '' },
  { path: 'blog/:year/:month/:date/:title', component: RegularBlogPostComponent },
  { path: 'downloads', component: RegularBlogPostComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }