import { Component } from '@angular/core';
import { IconDefinition, faMouse } from '@fortawesome/free-solid-svg-icons';
import { WALoaderService } from '../../../../services/loader/wa-loader.service';

const heroBanners: Array<any> = [
	{
		image: "/assets/images/hero-banner/hero-banner-player-1-min.png"
	},
	{
		image: "/assets/images/hero-banner/hero-banner-player-2-min.png"
	}
]

@Component({
	selector: 'ufm-wa-hero-banner',
	templateUrl: './wa-hero-banner.component.html',
	styleUrls: ['./wa-hero-banner.component.scss']
})
export class WAHeroBannerComponent {

	faMouse: IconDefinition = faMouse;

	loading: boolean = true;

	heroBanner: any = {};

	constructor(
		private WALoaderService: WALoaderService
	) { }

	ngOnInit() {
		this.setHeroBanner();
		this.WALoaderService.pageLoadingStateChange.subscribe((state: boolean) => {
			this.loading = state;
		})
	}

	setHeroBanner() {
		const randomIndex: number = Math.floor(Math.random() * Math.floor(heroBanners.length));
		this.heroBanner = heroBanners[randomIndex];
	}

	scrollCTAClicked() {
		const CTAContainer: HTMLElement = document.querySelector('.wa-scroll-cta-container') as HTMLElement;
		window.scrollBy(0, (CTAContainer.clientHeight + CTAContainer.getBoundingClientRect().top));
	}
}