import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { OfficialSoundtrackComponent } from './official-soundtracks/official-soundtracks.component';

import { VideoPlayerModule } from '../blog/video-player/app.module';
import { ObjectKeysPipeModule } from "../../pipes/object-keys/app.module";

@NgModule({
    declarations: [
        OfficialSoundtrackComponent
    ],
    imports: [
        BrowserModule,
        VideoPlayerModule,
        ObjectKeysPipeModule
    ],
    exports: [
        OfficialSoundtrackComponent
    ]
})

export class FIFAModule { }