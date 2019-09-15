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
    @Input() hideTitle: boolean;
    @Input() autoPlay: boolean;

    sanitizedURL: any;

    ngOnInit() {
        this.init();
    }

    ngOnChanges() {
        this.init();
    }

    init() {
        if (this.videoProvider == 'youtube') {
            const videoID: string = (this.videoURL.split('?v=') || [])[1] || '';
            const modiferParams: Array<string> = [
                this.autoPlay ? 'autoplay=1' : 'autoplay=0'
            ]
            const modifierParamString: string = '?' + modiferParams.join('&');
            this.sanitizedURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoID + modifierParamString);
        }
    }
}