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
import { WAModFilterService } from './wa-mod-filter.service';
import { WABrowserStorageService } from './wa-browser-storage.service';

@NgModule({
    imports: [
        HttpClientModule,
        WALoaderServiceModule,
        HttpModule
    ],
    providers: [WADBService, WAFIFADBService, WAModFilterService]
})
export class WADBServiceModule { }

export { WASearchFilterConfig } from "./wa-mod-filter.service";

@NgModule({
    providers: [WABrowserStorageService]
})
export class WABrowserStorageServiceModule { }