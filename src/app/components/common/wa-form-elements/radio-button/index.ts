import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { WARadioButtonComponent } from "./wa-radio-button.component";

import { WAFormElementsServiceModule } from "../common/service.module";

@NgModule({
    imports: [FormsModule, CommonModule, WAFormElementsServiceModule],
    declarations: [WARadioButtonComponent],
    exports: [WARadioButtonComponent]
})
export class WARadioButtonModule { }