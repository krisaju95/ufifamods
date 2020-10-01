import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TranslateModule } from '@ngx-translate/core';

import { AbcPhoneNumberComponent } from "./abc-phone-number.component";

import { AbcUtilsModule } from "../../utils";
import { AbcSelectModule } from '../select';
import { AbcInputModule } from '../input';

@NgModule({
    imports: [CommonModule, FormsModule, TranslateModule, ReactiveFormsModule, AbcUtilsModule, AbcInputModule, AbcSelectModule],
    declarations: [AbcPhoneNumberComponent],
    exports: [AbcPhoneNumberComponent]
})
export class AbcPhoneNumberModule { }