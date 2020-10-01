// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Component Module
import { CreateFUTCardComponent } from './create-fut-card.component';
import { AbcPhoneNumberModule } from '../../library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CreateFUTCardComponent
    ],
    imports: [
        BrowserModule, AbcPhoneNumberModule, FormsModule, ReactiveFormsModule
    ],
    exports: [CreateFUTCardComponent]
})
export class CreateFUTCardModule { }