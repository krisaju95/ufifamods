import { Component, ViewEncapsulation } from '@angular/core';
import { WARootScope } from 'src/app/services/globals/wa-rootscope';

@Component({
    selector: 'ufm-wa-page-home',
    templateUrl: './wa-page-home.component.html',
    styleUrls: ['./wa-page-home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class WAPageHomeComponent {
    constructor(public WARootScope: WARootScope) { }
}