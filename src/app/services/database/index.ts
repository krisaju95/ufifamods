// Angular Modules
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Service
import { WADBService } from './wa-db.service';

// Service Modules
import { WALoaderServiceModule } from '../loader';

@NgModule({
    imports: [HttpClientModule, WALoaderServiceModule],
    providers: [WADBService]
})
export class WADBServiceModule { }