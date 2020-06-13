// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Main Web App Component
import { WAHeroBannerComponent } from './wa-hero-banner.component';
import { WABlogPostFormatPipeModule } from 'src/app/pipes/blog-posts/blog-post-formatter';

@NgModule({
    declarations: [
        WAHeroBannerComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        WABlogPostFormatPipeModule
    ],
    exports: [WAHeroBannerComponent]
})
export class WAHeroBannerModule { }