import { Component, Input, ElementRef, HostListener } from '@angular/core';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
	selector: 'fut-squad-panel',
	templateUrl: './fut-squad-panel.component.html',
	styleUrls: ['./fut-squad-panel.component.scss']
})

export class FUTSquadPanelComponent {

	constructor(
		private service: UtilitiesService,
		private elementRef: ElementRef
	) { }

	@Input() futSquadInfo: Array<any>;

	isNewJSONVersion: boolean = false;

	isDesktopViewPort: boolean = this.service.isDesktopViewPort();
	isTabViewPort: boolean = this.service.isTabViewPort();
	isMobileViewPort: boolean = this.service.isMobileViewPort();

	ngOnInit() {

	}

	ngAfterViewInit() {
		this.setPitchHeight();
	}

	setPitchHeight() {
		setTimeout(() => {
			let wrapperElement = this.elementRef.nativeElement.querySelector('.squad-first-xi-wrapper');
			let pitchWidth = wrapperElement.clientWidth;
			let pitchElement = this.elementRef.nativeElement.querySelector('.fut-squad-container');
			let transformScaleRatio = pitchWidth / 790;
			pitchElement.style.display = 'block';
			pitchElement.style.transform = 'scale(' + transformScaleRatio + ')';
			wrapperElement.style.height = (transformScaleRatio * 860) + 'px';
		}, 2000);
	}

	@HostListener('window:resize') onWindowResize() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
		this.setPitchHeight();
	}

	@HostListener('window:orientationchange') onOrientationChange() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
		this.setPitchHeight();
	}
}