// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
        RouterModule,
        WAImageLoaderDirectiveModule
    ],
    exports: [WAPostCardComponent]
})
export class WAPostCardModule { }