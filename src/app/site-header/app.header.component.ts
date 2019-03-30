import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';

@Component({
	selector: 'site-header',
	templateUrl: './app.header.component.html',
	styleUrls: ['./app.header.component.scss']
})

export class AppHeaderComponent {

	constructor(
		private service: UtilitiesService
	) {}

	@Output() showMobileNavbar: EventEmitter<boolean> = new EventEmitter<boolean>();

	lightTheme: boolean = this.service.isTargetted();
	isDesktopViewPort: boolean = false;
	isTabViewPort: boolean = false;
	isMobileViewPort: boolean = false;

	ngOnInit() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
	}

	showNavbar() {
		this.showMobileNavbar.emit(true);
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