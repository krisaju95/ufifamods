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
	numberOfStarheadsPerRow: number = 3;

	isDesktopViewPort: boolean = this.service.isDesktopViewPort();
	isTabViewPort: boolean = this.service.isTabViewPort();
	isMobileViewPort: boolean = this.service.isMobileViewPort();

	ngOnInit() {
		this.isNewJSONVersion = (typeof this.facesIncludedList[0] != 'string');
		this.setNumberOfStarHeadsPerRow();
	}
	

	setNumberOfStarHeadsPerRow() {
		if (this.isMobileViewPort) {
			this.numberOfStarheadsPerRow = 1;
		} else if (this.isTabViewPort) {
			this.numberOfStarheadsPerRow = 2;
		} else {
			this.numberOfStarheadsPerRow = 3;
		}
	}

	@HostListener('window:resize') onWindowResize() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
		this.setNumberOfStarHeadsPerRow();
	}

	@HostListener('window:orientationchange') onOrientationChange() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
		this.setNumberOfStarHeadsPerRow();
	}
}