// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WAProfileInfoPipe } from './profile-info.pipe';

@NgModule({
    declarations: [
        WAProfileInfoPipe
    ],
    imports: [
        BrowserModule
    ],
    exports: [WAProfileInfoPipe]
})
export class WAProfileInfoPipeModule { }