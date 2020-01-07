import { Component } from '@angular/core';
import { IconDefinition, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'ufm-wa-header',
    templateUrl: './wa-header.component.html',
    styleUrls: ['./wa-header.component.scss']
})

export class WAHeaderComponent {
    faSearch: IconDefinition = faSearch;
}