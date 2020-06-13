// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Main Web App Component
import { WAPostCardComponent } from './wa-post-card.component';

import { WABlogPostFormatPipeModule } from '../../../pipes/blog-posts/blog-post-formatter';

@NgModule({
    declarations: [
        WAPostCardComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        WABlogPostFormatPipeModule
    ],
    exports: [WAPostCardComponent]
})
export class WAPostCardModule { }