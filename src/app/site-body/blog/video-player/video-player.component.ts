import { Component, Input } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'

@Component({
    selector: 'video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss']
})

export class VideoPlayerComponent {

    constructor(
        private sanitizer: DomSanitizer
    ) { }

    @Input() videoProvider: string;
    @Input() videoURL: string;

    sanitizedURL: any;

    ngOnInit() {
        if (this.videoProvider == 'youtube') {
            const videoID: string = (this.videoURL.split('?v=') || [])[1] || '';
            this.sanitizedURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoID);
        }
    }
}