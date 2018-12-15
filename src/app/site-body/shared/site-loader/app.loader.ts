import { Component, Input } from '@angular/core';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
	selector: 'site-loader',
	templateUrl: './app.loader.html',
	styleUrls: ['./app.loader.scss']
})

export class AppLoaderComponent {

	constructor(
		private service: UtilitiesService
	) {}

	@Input() fullScreenLoader: boolean;

	isDesktopViewport: boolean = this.service.isDesktopViewPort();
	isMobileViewport: boolean = this.service.isMobileViewPort();

	ngOnInit() {
		if(this.fullScreenLoader) {
			document.body.style.overflow = "hidden";
		}
	}

	ngOnDestroy() {
		document.body.style.overflow = "auto";
	}
}