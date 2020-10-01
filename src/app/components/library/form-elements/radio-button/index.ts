import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AbcRadioGroupComponent } from "./abc-radio-group.component";
import { AbcRadioButtonComponent } from "./abc-radio-button.component";

import { AbcUtilsModule } from "../../utils";
import { AbcSubscriptModule } from '../subscript';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AbcUtilsModule, AbcSubscriptModule],
    declarations: [AbcRadioGroupComponent, AbcRadioButtonComponent],
    exports: [AbcRadioGroupComponent, AbcRadioButtonComponent]
})
export class AbcRadioButtonModule { }