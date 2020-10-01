import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AbcToggleComponent } from "./abc-toggle.component";

import { AbcUtilsModule } from "../utils";
import { AbcToggleOptionComponent } from './abc-toggle-option.component';
import { AbcSubscriptModule } from '../form-elements';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AbcUtilsModule, AbcSubscriptModule],
    declarations: [AbcToggleComponent, AbcToggleOptionComponent],
    exports: [AbcToggleComponent, AbcToggleOptionComponent]
})
export class AbcToggleModule { }