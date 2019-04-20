import { Component, Input, HostListener } from '@angular/core';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
	selector: 'fut-squad-panel',
	templateUrl: './fut-squad-panel.component.html',
	styleUrls: ['./fut-squad-panel.component.scss']
})

export class FUTSquadPanelComponent {

	constructor(
		private service: UtilitiesService
	) { }

	@Input() futSquadInfo: Array<any>;

	isNewJSONVersion: boolean = false;

	isDesktopViewPort: boolean = this.service.isDesktopViewPort();
	isTabViewPort: boolean = this.service.isTabViewPort();
	isMobileViewPort: boolean = this.service.isMobileViewPort();

	ngOnInit() {

	}

	@HostListener('window:resize') onWindowResize() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
	}

	@HostListener('window:orientationchange') onOrientationChange() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
	}
}