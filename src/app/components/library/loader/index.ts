import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AbcInsetLoaderComponent } from "./inset-loader/abc-inset-loader.component";
import { ACPageLoaderComponent } from "./page-loader/abc-page-loader.component";
import { AbcUtilsModule } from "../utils";
import { AbcLoaderService } from "./abc-loader.service";
import { SafePipeModule } from 'safe-pipe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, AbcUtilsModule, TranslateModule, SafePipeModule],
    providers: [AbcLoaderService],
    declarations: [AbcInsetLoaderComponent, ACPageLoaderComponent],
    exports: [AbcInsetLoaderComponent, ACPageLoaderComponent],
    entryComponents: [ACPageLoaderComponent]
})
export class AbcLoaderModule { }