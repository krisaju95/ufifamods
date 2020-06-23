import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { WACheckboxComponent } from "./wa-checkbox.component";

import { WAFormElementsServiceModule } from "../common/service.module";

@NgModule({
    imports: [FormsModule, CommonModule, WAFormElementsServiceModule],
    declarations: [WACheckboxComponent],
    exports: [WACheckboxComponent]
})
export class WACheckboxModule { }