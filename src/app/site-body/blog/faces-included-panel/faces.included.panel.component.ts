import { Component, Input, HostListener } from '@angular/core';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
	selector: 'faces-included-panel',
	templateUrl: './faces.included.panel.component.html',
	styleUrls: ['./faces.included.panel.component.scss']
})

export class FacesIncludedPanelComponent {

	constructor(
		private service: UtilitiesService
	) { }

	@Input() facesIncludedList: Array<any>;

	isNewJSONVersion: boolean = false;
	numberOfPostsPerRow: number = 3;

	isDesktopViewPort: boolean = false;
	isTabViewPort: boolean = false;
	isMobileViewPort: boolean = false;

	ngOnInit() {
		this.isNewJSONVersion = (typeof this.facesIncludedList[0] != 'string');
	}

	@HostListener('window:resize') onWindowResize() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
		if (this.isMobileViewPort) {
			this.numberOfPostsPerRow = 1;
		} else if (this.isTabViewPort) {
			this.numberOfPostsPerRow = 2;
		} else {
			this.numberOfPostsPerRow = 3;
		}
	}

	@HostListener('window:orientationchange') onOrientationChange() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
		if (this.isMobileViewPort) {
			this.numberOfPostsPerRow = 1;
		} else if (this.isTabViewPort) {
			this.numberOfPostsPerRow = 2;
		} else {
			this.numberOfPostsPerRow = 3;
		}
	}
}