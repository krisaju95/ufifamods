import { Component, Input } from '@angular/core';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
	selector: 'screenshots-panel',
	templateUrl: './screenshots.panel.component.html',
	styleUrls: ['./screenshots.panel.component.scss']
})

export class ScreenShotsPanelComponent {

	constructor(
		private utils: UtilitiesService
	) { }

	@Input() screenshotsList: Array<any>;

	isDesktopViewPort: boolean = this.utils.isDesktopViewPort();
	isMobileViewport: boolean = this.utils.isMobileViewPort();
	numberOfColumns: number = 0;

	ngOnInit() {
		this.numberOfColumns = this.isDesktopViewPort ? 2 : 1;
	}
}