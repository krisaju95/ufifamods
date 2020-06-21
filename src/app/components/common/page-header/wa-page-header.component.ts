import { Component, Input } from '@angular/core';

@Component({
	selector: 'ufm-wa-page-header',
	templateUrl: './wa-page-header.component.html',
	styleUrls: ['./wa-page-header.component.scss']
})
export class WAPageHeaderComponent {

	@Input() header: string;

	@Input() description: string;
}