import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AbcButtonComponent } from "./abc-button.component";
import { AbcUtilsModule } from "../utils";
import { SafePipeModule } from 'safe-pipe';

@NgModule({
    imports: [CommonModule, AbcUtilsModule, SafePipeModule],
    declarations: [AbcButtonComponent],
    exports: [AbcButtonComponent]
})
export class AbcButtonModule { }