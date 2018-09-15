import { Component } from '@angular/core';

@Component({
	selector: 'site-body',
	templateUrl: './app.body.component.html',
	styleUrls: ['./app.body.component.scss']
})

export class AppBodyComponent {

	ngAfterViewInit() {
		window.scroll(0, 0);
	}

	pageChanged() {
		window.scroll(0, 0);
	}
}