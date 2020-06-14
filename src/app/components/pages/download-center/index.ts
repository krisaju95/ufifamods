// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Main Web App Component
import { WAPageDownloadCenterComponent } from './wa-page-download-center.component';

// Additional Modules
import { WAPostCardModule } from '../../common/post-card';

@NgModule({
    declarations: [
        WAPageDownloadCenterComponent
    ],
    imports: [
        BrowserModule,
        WAPostCardModule
    ],
    exports: [WAPageDownloadCenterComponent]
})
export class WAPageDownloadCenterModule { }