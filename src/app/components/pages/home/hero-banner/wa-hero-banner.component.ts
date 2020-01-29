import { Component } from '@angular/core';
import { IconDefinition, faMouse } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'ufm-wa-hero-banner',
	templateUrl: './wa-hero-banner.component.html',
	styleUrls: ['./wa-hero-banner.component.scss']
})
export class WAHeroBannerComponent {
	faMouse: IconDefinition = faMouse;

	scrollCTAClicked() {
		const CTAContainer: HTMLElement = document.querySelector('.wa-scroll-cta-container') as HTMLElement;
		window.scrollBy(0, (CTAContainer.clientHeight + CTAContainer.getBoundingClientRect().top));
	}
}