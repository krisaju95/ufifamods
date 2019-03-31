import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'error-page',
	templateUrl: './error.page.component.html',
	styleUrls: ['./error.page.component.scss']
})

export class ErrorPageComponent {

	constructor(
		private route: ActivatedRoute
	) { }

	errorCode: string = '';

	ngOnInit() {
		this.errorCode = this.route.snapshot.paramMap.get('errorCode') || '7';
	}
}