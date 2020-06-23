import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { WASelectComponent } from "./wa-select.component";
import { WAOptionComponent } from "./option/wa-option.component";

import { WAFormElementsServiceModule } from "../common/service.module";

@NgModule({
    imports: [FormsModule, CommonModule, WAFormElementsServiceModule],
    declarations: [WASelectComponent, WAOptionComponent],
    exports: [WASelectComponent, WAOptionComponent]
})
export class WASelectModule { }