import { Component } from '@angular/core';

@Component({
	selector: 'site-body',
	templateUrl: './app.body.component.html',
	styleUrls: ['./app.body.component.scss']
})

export class AppBodyComponent {

	pageChanged() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
}