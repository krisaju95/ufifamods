import { Component } from '@angular/core';
import { IconDefinition, faMouse } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'ufm-wa-hero-banner',
	templateUrl: './wa-hero-banner.component.html',
	styleUrls: ['./wa-hero-banner.component.scss']
})
export class WAHeroBannerComponent {
	faMouse: IconDefinition = faMouse;
}