// Angular Modules
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Service
import { WADBService } from './wa-db.service';
import { WAFIFADBService } from './wa-fifa-db.service';

// Service Modules
import { WALoaderServiceModule } from '../loader';

// Additional Modules
import { HttpModule } from "@angular/http";

@NgModule({
    imports: [
        HttpClientModule,
        WALoaderServiceModule,
        HttpModule,
        // NgxAirtableModule.forRoot({ apiKey: "keyopGfRO9giAuXLj" })
    ],
    providers: [WADBService, WAFIFADBService]
})
export class WADBServiceModule { }