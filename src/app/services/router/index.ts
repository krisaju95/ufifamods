// Angular Modules
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Service
import { WARouterService } from './wa-router.service';

@NgModule({
    imports: [HttpClientModule],
    providers: [WARouterService]
})
export class WARouterServiceModule { }