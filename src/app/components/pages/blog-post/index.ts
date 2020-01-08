// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Main Web App Component
import { WABlogPostComponent } from './wa-blog-post.component';

// Additional Modules
import { WAPostCardModule } from '../../common/post-card';

@NgModule({
    declarations: [
        WABlogPostComponent
    ],
    imports: [
        BrowserModule,
        WAPostCardModule
    ],
    exports: [WABlogPostComponent]
})
export class WABlogPostModule { }