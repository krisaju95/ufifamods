import { Component } from '@angular/core';
import { IconDefinition, faSearch } from '@fortawesome/free-solid-svg-icons';
import { WALoaderService } from '../../services/loader/wa-loader.service';
import { WAFeatureSwitches } from '../../constants/wa-feature-switches';

@Component({
    selector: 'ufm-wa-header',
    templateUrl: './wa-header.component.html',
    styleUrls: ['./wa-header.component.scss']
})

export class WAHeaderComponent {

    WAFeatureSwitches: any = WAFeatureSwitches;

    faSearch: IconDefinition = faSearch;

    loading: boolean = true;

    constructor(
        private WALoaderService: WALoaderService
    ) { }

    ngOnInit() {
        this.WALoaderService.pageLoadingStateChange.subscribe((state) => {
            const waitTime: number = state ? 0 : 1500;
            setTimeout(() => this.loading = state, waitTime);
        });
    }
}