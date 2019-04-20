import { Component, Input, ElementRef } from '@angular/core';

@Component({
	selector: 'site-ad-placeholder',
	templateUrl: './ad.placeholder.html',
	styleUrls: ['./ad.placeholder.scss']
})

export class AdPlaceholderComponent {

	constructor(
		private elementRef: ElementRef
	) { }

	@Input() adZone: number;
	@Input() theme: string;
	@Input() removeMargins: boolean;

	adBlockerUsed: boolean = false;
	imageLoadCheckInterval: any;

	adZoneMap: Object = {
		1: "1443",
		2: "1472",
		3: "3092"
	}

	ngAfterViewInit() {
		this.loadAd()
			.then(() => {
				this.checkForFailedImageLoads();
			})
			.catch(() => {
				this.adBlockerUsed = true;
			});
	}

	checkForFailedImageLoads() {
		this.imageLoadCheckInterval = setTimeout(() => {
			let imagesArray = this.elementRef.nativeElement.querySelectorAll('img');
			let insArray = this.elementRef.nativeElement.querySelectorAll('ins');
			for (let image of imagesArray) {
				image.addEventListener('error', (error) => {
					image.src = "https://raw.githubusercontent.com/krisaju95/ufifamods/master/media/images/aderror/72890.jpg";
				});
			}
			for (let ins of insArray) {
				ins.style.display = "inline-block";
			}
		}, 500);
	}

	loadAd(): Promise<any> {
		let scriptPromise = new Promise((resolve, reject) => {
			let script = document.createElement('script');
			let randpubc = Math.floor((Math.random() * 100000) + 1);
			script.onload = resolve;
			script.onerror = reject;
			script.async = true;
			script.src = '//cdn.adclerks.com/core/ad2/10179/' + this.adZoneMap[this.adZone] + '?r=' + randpubc;

			try {
				let adDOMContainer = document.getElementById("adDOMContainer");
				adDOMContainer.appendChild(script);
			}
			catch (e) {
				this.adBlockerUsed = true;
			}
		});
		return scriptPromise;
	};
}