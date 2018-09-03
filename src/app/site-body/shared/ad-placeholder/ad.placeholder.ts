import { Component, Input } from '@angular/core';

@Component({
	selector: 'site-ad-placeholder',
	templateUrl: './ad.placeholder.html',
	styleUrls: ['./ad.placeholder.scss']
})

export class AdPlaceholderComponent {
	@Input() adZone: number;
	@Input() theme: string;
	@Input() removeMargins: boolean;

	adZoneMap: Object = {
		1: "1443",
		2: "1472",
		3: "3092"
	}

	ngAfterViewInit() {
		this.loadAd();
	}

	loadAd = function () {
		let randpubc = Math.floor((Math.random() * 100000) + 1);
		let pubc = document.createElement('script');
		pubc.type = 'text/javascript';
		pubc.async = true;
		pubc.src = '//cdn.adclerks.com/core/ad2/10179/' + this.adZoneMap[this.adZone] + '?r=' + randpubc;
		let s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(pubc, s);
	};
}