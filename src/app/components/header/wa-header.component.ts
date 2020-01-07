import { Component } from '@angular/core';
import { IconDefinition, faSearch } from '@fortawesome/free-solid-svg-icons';
import { WALoaderService } from '../../services/loader/wa-loader.service';

@Component({
    selector: 'ufm-wa-header',
    templateUrl: './wa-header.component.html',
    styleUrls: ['./wa-header.component.scss']
})

export class WAHeaderComponent {

    faSearch: IconDefinition = faSearch;

    loading: boolean = true;

    constructor(
        private WALoaderService: WALoaderService
    ) { }

    ngOnInit() {
        this.WALoaderService.pageLoadingStateChange.subscribe((state) => {
            this.loading = state;
        });
    }
}