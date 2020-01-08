// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Main Web App Component
import { WAHeroBannerComponent } from './wa-hero-banner.component';

// Directives
import { WAImageLoaderDirectiveModule } from '../../../../directives/image-loader';

@NgModule({
    declarations: [
        WAHeroBannerComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        WAImageLoaderDirectiveModule
    ],
    exports: [WAHeroBannerComponent]
})
export class WAHeroBannerModule { }