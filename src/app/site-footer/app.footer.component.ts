import { Component } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';

@Component({
	selector: 'site-footer',
	templateUrl: './app.footer.component.html',
	styleUrls: ['./app.footer.component.scss']
})

export class AppFooterComponent {

	constructor(
		private utils: UtilitiesService
	) { }

	toggleSearchDialog(searchString?: string) {
		this.utils.searchTriggered.next(searchString);
	}
}