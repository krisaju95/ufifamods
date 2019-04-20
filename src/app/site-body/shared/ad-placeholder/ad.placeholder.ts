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
	intervalCounter: number = 0;

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
		this.imageLoadCheckInterval = setInterval(() => {
			this.intervalCounter++;
			let imagesArray = this.elementRef.nativeElement.querySelectorAll('img');
			let insArray = this.elementRef.nativeElement.querySelectorAll('ins');
			for (let image of imagesArray) {
				clearInterval(this.imageLoadCheckInterval);
				image.addEventListener('error', () => {
					image.src = "https://raw.githubusercontent.com/krisaju95/ufifamods/master/media/images/aderror/" + (this.adZone == 3 ? '300250' : '72890') + ".jpg";
				});
			}
			for (let ins of insArray) {
				ins.style.display = "inline-block";
				clearInterval(this.imageLoadCheckInterval);
			}
			if(this.intervalCounter > 500) {
				clearInterval(this.imageLoadCheckInterval);
			}
		}, 10);
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

	ngOnDestroy() {
		clearInterval(this.imageLoadCheckInterval);
	}
}