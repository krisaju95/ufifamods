// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Main Web App Component
import { WAHeroBannerComponent } from './wa-hero-banner.component';

// Additional Modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        WAHeroBannerComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        FontAwesomeModule
    ],
    exports: [WAHeroBannerComponent]
})
export class WAHeroBannerModule { }