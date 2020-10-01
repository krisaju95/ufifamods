import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AbcSelectComponent } from "./abc-select.component";
import { AbcOptionComponent } from "./abc-option.component";

import { AbcUtilsModule } from "../../utils";
import { AbcSubscriptModule } from '../subscript';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AbcUtilsModule, AbcSubscriptModule, TranslateModule],
    declarations: [AbcSelectComponent, AbcOptionComponent],
    exports: [AbcSelectComponent, AbcOptionComponent]
})
export class AbcSelectModule { }