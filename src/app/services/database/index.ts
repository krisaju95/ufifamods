// Angular Modules
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Service
import { WADBService } from './wa-db.service';

// Service Modules
import { WALoaderServiceModule } from '../loader';

// Additional Modules
import { NgxAirtableModule } from 'ngx-airtable';
import { HttpModule } from "@angular/http";

@NgModule({
    imports: [
        HttpClientModule,
        WALoaderServiceModule,
        HttpModule,
        NgxAirtableModule.forRoot({ apiKey: "keyopGfRO9giAuXLj" })
    ],
    providers: [WADBService]
})
export class WADBServiceModule { }