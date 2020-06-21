// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Main Web App Component
import { WAPageHeaderComponent } from './wa-page-header.component';

@NgModule({
    declarations: [
        WAPageHeaderComponent
    ],
    imports: [
        BrowserModule
    ],
    exports: [WAPageHeaderComponent]
})
export class WAPageHeaderModule { }