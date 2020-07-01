// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Main Web App Component
import { WAStarheadCardComponent } from './wa-starhead-card.component';

@NgModule({
    declarations: [
        WAStarheadCardComponent
    ],
    imports: [
        BrowserModule,
        RouterModule
    ],
    exports: [WAStarheadCardComponent]
})
export class WAStarheadCardModule { }