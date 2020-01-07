// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Main Web App Component
import { WAHeroBannerComponent } from './wa-hero-banner.component';

@NgModule({
    declarations: [
        WAHeroBannerComponent
    ],
    imports: [
        BrowserModule
    ],
    exports: [WAHeroBannerComponent]
})
export class WAHeroBannerModule { }