// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Main Web App Component
import { WAPageDownloadCenterComponent } from './wa-page-download-center.component';
import { WAPageHeaderModule } from '../../common/page-header';
import { WABlogPostFormatPipeModule } from 'src/app/pipes/blog-posts/blog-post-formatter';

@NgModule({
    declarations: [
        WAPageDownloadCenterComponent
    ],
    imports: [
        BrowserModule,
        WAPageHeaderModule,
        WABlogPostFormatPipeModule
    ],
    exports: [WAPageDownloadCenterComponent]
})
export class WAPageDownloadCenterModule { }