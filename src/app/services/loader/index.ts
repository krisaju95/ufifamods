// Angular Modules
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Service
import { WALoaderService } from './wa-loader.service';

@NgModule({
    imports: [HttpClientModule],
    providers: [WALoaderService]
})
export class WALoaderServiceModule { }