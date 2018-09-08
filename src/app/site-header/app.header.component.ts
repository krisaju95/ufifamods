import { Component } from '@angular/core';
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

	lightTheme: boolean = this.service.isTargetted();
	isDesktopViewPort: boolean = false;
	isMobileViewport: boolean = false;

	ngOnInit() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isMobileViewport = this.service.isMobileViewPort();
	}

}