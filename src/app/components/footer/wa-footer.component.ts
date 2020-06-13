import { Component } from '@angular/core';
import { WAFeatureSwitches } from '../../constants/wa-feature-switches';

@Component({
    selector: 'ufm-wa-footer',
    templateUrl: './wa-footer.component.html',
    styleUrls: ['./wa-footer.component.scss']
})
export class WAFooterComponent {

    WAFeatureSwitches: any = WAFeatureSwitches;

    year: number = new Date().getFullYear();

}