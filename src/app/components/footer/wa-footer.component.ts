import { Component } from '@angular/core';
import { IconDefinition, faCopyright } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'ufm-wa-footer',
    templateUrl: './wa-footer.component.html',
    styleUrls: ['./wa-footer.component.scss']
})
export class WAFooterComponent {
    faCopyright: IconDefinition = faCopyright;
    year: number = new Date().getFullYear();
}