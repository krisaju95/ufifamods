import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FIFASoundTracks } from "./data/soundtracks/fifa-soundtracks";

@Component({
    selector: 'official-soundtracks',
    templateUrl: './official-soundtracks.template.html',
    styleUrls: ['./official-soundtracks.style.scss']
})

export class OfficialSoundtrackComponent {

    constructor(
        private route: ActivatedRoute
    ) { }

    selectedFIFAVersion: string = 'fifa20';

    selectedTrackURL: string = "";

    selectedTrackIndex: number = 0;

    autoPlay: boolean = false;

    soundTracks: object = FIFASoundTracks;

    ngOnInit() {
        this.selectedFIFAVersion = this.route.snapshot.paramMap.get('fifaVersion') || 'fifa20';
        this.setDefaultTrack();
    }

    setDefaultTrack() {
        this.selectedTrackIndex = 0;
        if (this.soundTracks[this.selectedFIFAVersion]) {
            this.selectedTrackURL = "https://www.youtube.com/watch?v=" + this.soundTracks[this.selectedFIFAVersion]['tracks'][0]['videoID'];
        } else {
            this.selectedFIFAVersion = 'fifa20';
            this.setDefaultTrack();
        }
    }

    playTrack(trackIndex: number, videoID: string): void {
        this.autoPlay = true;
        this.selectedTrackIndex = trackIndex;
        this.selectedTrackURL = "https://www.youtube.com/watch?v=" + videoID;
    }

    selectSoundtrack(soundtrack: string): void {
        if (this.soundTracks[soundtrack] && (this.soundTracks[soundtrack]['tracks'] || []).length > 0) {
            this.selectedFIFAVersion = soundtrack;
            this.setDefaultTrack();
        }
    }
}