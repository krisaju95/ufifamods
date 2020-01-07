import { Component } from '@angular/core';
import { WADBService } from '../services/database/wa-db.service';

@Component({
	selector: 'ufm-web-app',
	templateUrl: './ufm-web-app.component.html',
	styleUrls: ['./ufm-web-app.component.scss']
})
export class UFMWebAppComponent {

	constructor(private WADBService: WADBService) { }

	ngOnInit() {
		this.WADBService.loadBlogData();
	}
}