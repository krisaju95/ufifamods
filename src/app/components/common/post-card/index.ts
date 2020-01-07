// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Main Web App Component
import { WAPostCardComponent } from './wa-post-card.component';

// Directives
import { WAImageLoaderDirectiveModule } from '../../../directives/image-loader';

@NgModule({
    declarations: [
        WAPostCardComponent
    ],
    imports: [
        BrowserModule,
        WAImageLoaderDirectiveModule
    ],
    exports: [WAPostCardComponent]
})
export class WAPostCardModule { }