import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SiteAdminTemplatesModule } from './templates/app.module';

import { MaterialModule } from '../site-body/shared/mat.module';
import { SharedModule } from '../site-body/shared/app.module';

import { SiteAdminComponent } from './site.admin.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        SiteAdminTemplatesModule
    ],
    declarations: [
        SiteAdminComponent
    ],
    exports: [
        SiteAdminComponent
    ]
})

export class SiteAdminModule { }