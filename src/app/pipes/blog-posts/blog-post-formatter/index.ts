// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WABlogPostFormatPipe } from './blog-post-formatter.pipe';

@NgModule({
    declarations: [
        WABlogPostFormatPipe
    ],
    imports: [
        BrowserModule
    ],
    exports: [WABlogPostFormatPipe]
})
export class WABlogPostFormatPipeModule { }