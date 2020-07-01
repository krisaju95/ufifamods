import { Component } from '@angular/core';
import { WARootScope } from 'src/app/services/globals/wa-rootscope';
import { WABlogPost } from 'src/app/interfaces';
import { WAModFilterService, WASearchFilterConfig } from 'src/app/services/database/wa-mod-filter.service';
import { WAFIFADBService } from 'src/app/services/database/wa-fifa-db.service';
import { WALoaderService } from 'src/app/services/loader/wa-loader.service';

@Component({
    selector: 'ufm-wa-page-download-center',
    templateUrl: './wa-page-download-center.component.html',
    styleUrls: ['./wa-page-download-center.component.scss']
})
export class WAPageDownloadCenterComponent {

    minimumLoaderTime: number = 2500;

    pageLoaderStartTime: number;

    pageLoaderTimeoutRef: any;

    filteredPosts: Array<WABlogPost> = [];

    loading: boolean = true;

    selectedGame: string = "fifa20";

    selectedNationality: number;

    selectedClub: number;

    selectedLeague: number;

    constructor(
        public WARootScope: WARootScope,
        private WALoaderService: WALoaderService,
        private WAModFilterService: WAModFilterService,
        public WAFIFADBService: WAFIFADBService
    ) { }

    ngOnInit() {
        const initialLoad = this.WALoaderService.pageLoadingStateChange.subscribe((state: boolean) => {
            if (!state) {
                this.updateFilteredPosts();
                initialLoad.unsubscribe();
            }
        });
    }

    updateFilteredPosts() {
        this.loading = true;
        this.pageLoaderStartTime = new Date().getTime();

        const filterConfig: WASearchFilterConfig = {
            game: this.selectedGame,
            league: this.selectedLeague,
            club: this.selectedClub,
            nationality: this.selectedNationality
        };

        setTimeout(() => {
            this.filteredPosts = this.WAModFilterService.filterMods(filterConfig);
            const currentTime: number = new Date().getTime();
            const elapsedTime: number = currentTime - (this.pageLoaderStartTime || currentTime);
            const stateChangeDelay: number = (elapsedTime < this.minimumLoaderTime) ? (this.minimumLoaderTime - elapsedTime) : 0;
            this.pageLoaderTimeoutRef = setTimeout(() => {
                this.loading = false;
                this.clearPageLoaderTimeoutRef();
            }, stateChangeDelay);
        }, 500);
    }

    clearPageLoaderTimeoutRef() {
        if (this.pageLoaderTimeoutRef) {
            clearTimeout(this.pageLoaderTimeoutRef);
        }
    }
}