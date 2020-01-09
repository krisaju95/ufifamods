// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Main Web App Component
import { WABlogPostComponent } from './wa-blog-post.component';

// Additional Modules
import { WAPostCardModule } from '../../common/post-card';
import { WAProfileInfoPipeModule } from '../../../pipes/profile-info';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Directives
import { WAImageLoaderDirectiveModule } from '../../../directives/image-loader';

@NgModule({
    declarations: [
        WABlogPostComponent
    ],
    imports: [
        BrowserModule,
        WAPostCardModule,
        WAImageLoaderDirectiveModule,
        WAProfileInfoPipeModule,
        FontAwesomeModule
    ],
    exports: [WABlogPostComponent]
})
export class WABlogPostModule { }