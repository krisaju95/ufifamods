import { Component } from '@angular/core';
import { WARootScope } from 'src/app/services/globals/wa-rootscope';

@Component({
    selector: 'ufm-wa-page-download-center',
    templateUrl: './wa-page-download-center.component.html',
    styleUrls: ['./wa-page-download-center.component.scss']
})
export class WAPageDownloadCenterComponent {

    selectedGame: string = "fifa20";

    selectedClub: string;

    selectedLeague: string;

    categories: Array<any> = [
        {
            title: "FIFA 20",
            url: "fifa-20-mods",
            thumbnail: "/assets/images/download-center/fifa-covers/fifa-20.jpg",
            enabled: true
        },
        {
            title: "FIFA 19",
            url: "fifa-19-mods",
            thumbnail: "/assets/images/download-center/fifa-covers/fifa-19.jpg",
            enabled: true
        },
        {
            title: "FIFA 18",
            url: "fifa-18-mods",
            thumbnail: "/assets/images/download-center/fifa-covers/fifa-18.jpg",
            enabled: false
        },
        {
            title: "FIFA 17",
            url: "fifa-17-mods",
            thumbnail: "/assets/images/download-center/fifa-covers/fifa-17.jpg",
            enabled: false
        },
        {
            title: "FIFA 16",
            url: "fifa-16-mods",
            thumbnail: "/assets/images/download-center/fifa-covers/fifa-16.jpg",
            enabled: true
        },
        {
            title: "Resources",
            url: "resources",
            thumbnail: "/assets/images/download-center/resources-thumb.jpg",
            enabled: true
        }
    ];

    constructor(
        public WARootScope: WARootScope
    ) { }
}