import { Component, HostListener } from '@angular/core';
import { WADBService } from '../services/database/wa-db.service';
import { WALoaderService } from '../services/loader/wa-loader.service';
import { WARootScope } from '../services/globals/wa-rootscope';
import { Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { WAFIFADBService } from '../services/database/wa-fifa-db.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
	selector: 'ufm-web-app',
	templateUrl: './ufm-web-app.component.html',
	styleUrls: ['./ufm-web-app.component.scss']
})
export class UFMWebAppComponent {

	showFocusRing: boolean = false;

	heroBannerImageIndex: number = 0;

	heroBannerImages: Array<any> = [
		{
			"image": "/assets/images/hero-banner/hero-banner-1.jpg"
		},
		{
			"image": "/assets/images/hero-banner/hero-banner-2.jpg"
		},
		{
			"image": "/assets/images/hero-banner/hero-banner-3.jpg"
		},
		{
			"image": "/assets/images/hero-banner/hero-banner-4.jpg"
		},
		{
			"image": "/assets/images/hero-banner/hero-banner-5.jpg"
		}
	];

	user: SocialUser;
	loggedIn: boolean;

	constructor(
		private WADBService: WADBService,
		public WAFIFADBService: WAFIFADBService,
		private WALoaderService: WALoaderService,
		public WARootScope: WARootScope,
		private router: Router,
		private authService: SocialAuthService
	) { }

	ngOnInit() {
		history.scrollRestoration = "manual";
		let routerEventSubscription: Subscription;
		this.WADBService.loadBlogData();
		this.setRandomHeroBannerImage();
		this.WALoaderService.pageLoadingStateChange.subscribe((state: boolean) => {
			if (!state && !routerEventSubscription) {
				routerEventSubscription = this.router.events.subscribe((_event: RouterEvent) => {
					window.scroll(0, 0);
					this.WARootScope.set('mobileNavbarOpened', false);
					this.WALoaderService.togglePageLoadingState(true);
					this.WALoaderService.togglePageLoadingState(false);
					this.setRandomHeroBannerImage();
				});
			} else if (state) {
				this.WARootScope.pageLoading = true;
			}
		});

		this.authService.authState.subscribe((user) => {
			this.user = user;
			this.loggedIn = (user != null);
			console.log(this.user);
		});
	}

	signInWithGoogle(): void {
		this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
	}

	signInWithFB(): void {
		this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
	}

	setRandomHeroBannerImage() {
		const index: number = Math.floor(Math.random() * Math.floor(this.heroBannerImages.length));
		if (index != this.heroBannerImageIndex) {
			this.heroBannerImageIndex = index;
		} else {
			this.setRandomHeroBannerImage();
		}
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