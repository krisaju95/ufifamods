import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AbcCheckboxComponent } from "./abc-checkbox.component";

import { AbcUtilsModule } from "../../utils";
import { AbcSubscriptModule } from '../subscript';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AbcUtilsModule, AbcSubscriptModule],
    declarations: [AbcCheckboxComponent],
    exports: [AbcCheckboxComponent]
})
export class AbcCheckboxModule { }