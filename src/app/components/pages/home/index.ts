// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Main Web App Component
import { WAPageHomeComponent } from './wa-page-home.component';

// Additional Modules
import { WAHeroBannerModule } from './hero-banner';
import { WAPostsGridModule } from './posts-grid';

@NgModule({
    declarations: [
        WAPageHomeComponent
    ],
    imports: [
        BrowserModule,
        WAHeroBannerModule,
        WAPostsGridModule
    ],
    exports: [WAPageHomeComponent]
})
export class WAPageHomeModule { }