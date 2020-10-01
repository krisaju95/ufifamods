import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AbcInputComponent } from "./abc-input.component";
import { AbcUtilsModule } from "../../utils";
import { AbcSubscriptModule } from '../subscript';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AbcUtilsModule, AbcSubscriptModule, TranslateModule],
    declarations: [AbcInputComponent],
    exports: [AbcInputComponent]
})
export class AbcInputModule { }