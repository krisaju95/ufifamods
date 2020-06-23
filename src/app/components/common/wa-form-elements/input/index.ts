import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { WAInputComponent } from "./wa-input.component";

import { WAFormElementsServiceModule } from "../common/service.module";

@NgModule({
    imports: [FormsModule, CommonModule, WAFormElementsServiceModule],
    declarations: [WAInputComponent],
    exports: [WAInputComponent]
})
export class WAInputModule { }