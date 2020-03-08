import { Component } from '@angular/core';
import { IconDefinition, faMouse } from '@fortawesome/free-solid-svg-icons';
import { WALoaderService } from '../../../../services/loader/wa-loader.service';

const numberOfHeroBannerImages: number = 6

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
		const randomIndex: number = Math.floor(Math.random() * Math.floor(numberOfHeroBannerImages)) + 1;
		this.heroBanner = "/assets/images/hero-banner/hero-banner-image-" + randomIndex + ".png";
	}

	scrollCTAClicked() {
		const CTAContainer: HTMLElement = document.querySelector('.wa-scroll-cta-container') as HTMLElement;
		window.scrollBy(0, (CTAContainer.clientHeight + CTAContainer.getBoundingClientRect().top));
	}
}