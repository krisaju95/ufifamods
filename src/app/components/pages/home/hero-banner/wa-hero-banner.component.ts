import { Component } from '@angular/core';
import { IconDefinition, faMouse } from '@fortawesome/free-solid-svg-icons';
import { WALoaderService } from '../../../../services/loader/wa-loader.service';

@Component({
	selector: 'ufm-wa-hero-banner',
	templateUrl: './wa-hero-banner.component.html',
	styleUrls: ['./wa-hero-banner.component.scss']
})
export class WAHeroBannerComponent {

	faMouse: IconDefinition = faMouse;

	loading: boolean = true;

	constructor(
		private WALoaderService: WALoaderService
	) { }

	ngOnInit() {
		this.WALoaderService.pageLoadingStateChange.subscribe((state: boolean) => {
			this.loading = state;
		})
	}

	scrollCTAClicked() {
		const CTAContainer: HTMLElement = document.querySelector('.wa-scroll-cta-container') as HTMLElement;
		window.scrollBy(0, (CTAContainer.clientHeight + CTAContainer.getBoundingClientRect().top));
	}
}