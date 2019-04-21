import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../environments/environment';

@Component({
	selector: 'site-header',
	templateUrl: './app.header.component.html',
	styleUrls: ['./app.header.component.scss']
})

export class AppHeaderComponent {

	constructor(
		private service: UtilitiesService
	) { }

	@Output() showMobileNavbar: EventEmitter<boolean> = new EventEmitter<boolean>();

	searchTriggered: Subscription;
	searchString: string = '';

	showSearchDialog: boolean = false;
	isDesktopViewPort: boolean = false;
	isTabViewPort: boolean = false;
	isMobileViewPort: boolean = false;
	isProdMode: boolean = false;

	ngOnInit() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
		this.isProdMode = environment.production;
		this.searchTriggered = this.service.searchTriggered.subscribe((searchString: string) => {
			this.showSearchDialog = true;
			this.searchString = searchString;
		});
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