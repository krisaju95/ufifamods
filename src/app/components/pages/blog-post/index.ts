// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Main Web App Component
import { WABlogPostComponent } from './wa-blog-post.component';

// Additional Modules
import { WAPostCardModule } from '../../common/post-card';
import { WAProfileInfoPipeModule } from '../../../pipes/profile-info';
import { WAPostsGridModule } from '../home/posts-grid';
import { DisqusModule } from "ngx-disqus";

// Directives
import { WAImageLoaderDirectiveModule } from '../../../directives/image-loader';
import { WABlogPostFormatPipeModule } from 'src/app/pipes/blog-posts/blog-post-formatter';
import { SafePipeModule } from 'safe-pipe';

@NgModule({
    declarations: [
        WABlogPostComponent
    ],
    imports: [
        BrowserModule,
        SafePipeModule,
        WAPostCardModule,
        WAImageLoaderDirectiveModule,
        WAProfileInfoPipeModule,
        WAPostsGridModule,
        WABlogPostFormatPipeModule,
        DisqusModule.forRoot('ufifamods')
    ],
    exports: [WABlogPostComponent]
})
export class WABlogPostModule { }