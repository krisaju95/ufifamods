import { Component, HostListener } from '@angular/core';
import { WADBService } from '../services/database/wa-db.service';
import { WALoaderService } from '../services/loader/wa-loader.service';
import { WARootScope } from '../services/globals/wa-rootscope';
import { Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'ufm-web-app',
	templateUrl: './ufm-web-app.component.html',
	styleUrls: ['./ufm-web-app.component.scss']
})
export class UFMWebAppComponent {

	showFocusRing: boolean = false;

	constructor(
		private WADBService: WADBService,
		private WALoaderService: WALoaderService,
		public WARootScope: WARootScope,
		private router: Router
	) { }

	ngOnInit() {
		history.scrollRestoration = "manual";
		let routerEventSubscription: Subscription;
		this.WADBService.loadBlogData();
		this.WALoaderService.pageLoadingStateChange.subscribe((state: boolean) => {
			if (!state && !routerEventSubscription) {
				routerEventSubscription = this.router.events.subscribe((_event: RouterEvent) => {
					window.scroll(0, 0);
					this.WARootScope.set('mobileNavbarOpened', false);
					this.WALoaderService.togglePageLoadingState(true);
					this.WALoaderService.togglePageLoadingState(false);
				});
			}
		})
	}

	closeNavbar() {
		this.WARootScope.set('mobileNavbarOpened', false);
	}

	@HostListener("keyup", ["$event"])
	onKeyDown(event: KeyboardEvent) {
		if (event && event.keyCode == 9) {
			this.showFocusRing = true;
		} else if (!event.shiftKey && !event.altKey && !event.metaKey && event.keyCode != 16) {
			this.showFocusRing = false;
		}
	}

	@HostListener("click", ["$event"])
	onClick(_event: MouseEvent) {
		this.showFocusRing = false;
	}
}