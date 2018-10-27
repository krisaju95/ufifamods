import { Component, Input } from '@angular/core';

@Component({
	selector: 'site-loader',
	templateUrl: './app.loader.html',
	styleUrls: ['./app.loader.scss']
})

export class AppLoaderComponent {
	@Input() fullScreenLoader: boolean;

	ngOnInit() {
		if(this.fullScreenLoader) {
			document.body.style.overflow = "hidden";
		}
	}

	ngOnDestroy() {
		document.body.style.overflow = "auto";
	}
}