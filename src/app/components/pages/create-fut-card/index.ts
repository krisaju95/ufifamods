// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Component Module
import { CreateFUTCardComponent } from './create-fut-card.component';

@NgModule({
    declarations: [
        CreateFUTCardComponent
    ],
    imports: [
        BrowserModule
    ],
    exports: [CreateFUTCardComponent]
})
export class CreateFUTCardModule { }