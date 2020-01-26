import { Component } from '@angular/core';
import { WADBService } from '../services/database/wa-db.service';
import { WALoaderService } from '../services/loader/wa-loader.service';
import { WARootScope } from '../services/globals/wa-rootscope';
import { Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { Airtable } from 'ngx-airtable';

@Component({
	selector: 'ufm-web-app',
	templateUrl: './ufm-web-app.component.html',
	styleUrls: ['./ufm-web-app.component.scss']
})
export class UFMWebAppComponent {

	constructor(
		private WADBService: WADBService,
		private WALoaderService: WALoaderService,
		public WARootScope: WARootScope,
		private router: Router,
		private airtable: Airtable
	) { }

	ngOnInit() {
		let routerEventSubscription: Subscription;
		let base = this.airtable.base('appGpn6FEIJsIQem3');
		let table = base.table({
			tableId: "tblOmzCatsiKekwAX"
		}).select().all().subscribe((data) => {
			console.log(data);
		});
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
}