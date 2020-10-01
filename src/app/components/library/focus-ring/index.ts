import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbcFocusRingComponent } from "./abc-focus-ring.component";
import { AbcUtilsModule } from '../utils';

@NgModule({
	imports: [CommonModule, AbcUtilsModule],
	declarations: [AbcFocusRingComponent],
	exports: [AbcFocusRingComponent]
})
export class AbcFocusRingModule { }