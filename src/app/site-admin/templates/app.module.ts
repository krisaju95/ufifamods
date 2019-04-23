import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../site-body/shared/mat.module';
import { SharedModule } from '../../site-body/shared/app.module';

import { SiteAdminCustomStarHeadsComponent } from './custom-starheads/site-admin.custom-starheads.component';
import { SiteAdminFutSquadComponent } from './fut-squad/site-admin.fut-squad.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule
    ],
    declarations: [
        SiteAdminCustomStarHeadsComponent,
        SiteAdminFutSquadComponent
    ],
    exports: [
        SiteAdminCustomStarHeadsComponent,
        SiteAdminFutSquadComponent
    ]
})

export class SiteAdminTemplatesModule { }