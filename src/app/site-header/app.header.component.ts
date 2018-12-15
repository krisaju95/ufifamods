import { Component, Output, EventEmitter } from '@angular/core';
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
	isDesktopViewport: boolean = false;
	isMobileViewport: boolean = false;

	ngOnInit() {
		this.isDesktopViewport = this.service.isDesktopViewPort();
		this.isMobileViewport = this.service.isMobileViewPort();
	}

	showNavbar() {
		this.showMobileNavbar.emit(true);
	}
}