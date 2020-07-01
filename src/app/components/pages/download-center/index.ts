// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Main Web App Component
import { WAPageDownloadCenterComponent } from './wa-page-download-center.component';
import { WAPageHeaderModule } from '../../common/page-header';
import { WABlogPostFormatPipeModule } from 'src/app/pipes/blog-posts/blog-post-formatter';
import { WASelectModule, WAPostCardModule } from '../../common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        WAPageDownloadCenterComponent
    ],
    imports: [
        BrowserModule,
        WAPageHeaderModule,
        WABlogPostFormatPipeModule,
        WASelectModule,
        FormsModule,
        WAPostCardModule
    ],
    exports: [WAPageDownloadCenterComponent]
})
export class WAPageDownloadCenterModule { }