import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { AbcService } from "./abc-service";
import { AbcOverlay, AbcOverlayComponent } from "./abc-overlay.component";
import { AbcTrapFocusDirective } from "./abc-trap-focus.directive";
import { AbcRippleDirective } from "./abc-ripple.directive";
import { AbcAcceptedCharactersDirective } from "./abc-accepted-characters.directive";
import { AbcStripHtmlPipe } from "./abc-strip-html.directive";

@NgModule({
    imports: [CommonModule],
    declarations: [AbcOverlayComponent, AbcTrapFocusDirective, AbcRippleDirective, AbcAcceptedCharactersDirective, AbcStripHtmlPipe],
    providers: [AbcService, AbcOverlay],
    exports: [AbcTrapFocusDirective, AbcRippleDirective, AbcAcceptedCharactersDirective, AbcStripHtmlPipe],
    entryComponents: [AbcOverlayComponent]
})
export class AbcUtilsModule { }

export * from "./abc-interfaces";
export * from "./abc-constants";
export * from "./abc-event-keycodes";
export * from "./abc-service";
export * from "./abc-translations";