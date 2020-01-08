// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Main Web App Component
import { WAPageBlogComponent } from './wa-page-blog.component';

// Additional Modules
import { WAPostCardModule } from '../../common/post-card';

@NgModule({
    declarations: [
        WAPageBlogComponent
    ],
    imports: [
        BrowserModule,
        WAPostCardModule
    ],
    exports: [WAPageBlogComponent]
})
export class WAPageBlogModule { }