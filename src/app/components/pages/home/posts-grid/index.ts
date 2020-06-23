// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Main Web App Component
import { WAPostsGridComponent } from './wa-posts-grid.component';

import { WAPostCardModule } from '../../../common/post-card';
import { WALoaderServiceModule } from '../../../../services/loader';
import { WADBServiceModule } from '../../../../services/database';
import { WABlogPostFormatPipeModule } from 'src/app/pipes/blog-posts/blog-post-formatter';

@NgModule({
    declarations: [
        WAPostsGridComponent
    ],
    imports: [
        BrowserModule,
        WAPostCardModule,
        WALoaderServiceModule,
        WADBServiceModule,
        WABlogPostFormatPipeModule
    ],
    exports: [WAPostsGridComponent]
})
export class WAPostsGridModule { }