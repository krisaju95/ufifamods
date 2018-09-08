import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilitiesService } from '../../services/utilities.service'

@Component({
	selector: 'home-component',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})

export class HomeComponent {

	constructor(
		private http: HttpClient,
		private service: UtilitiesService
	) { }

	responseLoading: Boolean = true;
	blogPosts: Array<Object> = [];

	ngOnInit() {
		this.http.get(this.service.getCSLP() +  "eb4b2165-a94f-11e8-9e97-a58df81c0425")
			.subscribe((data) => {
				this.responseLoading = false;
				this.setBlogPostsArray(data);
			})
	}

	setBlogPostsArray(blogPostsObject) {
		for (let postObject in blogPostsObject) {
			this.blogPosts.push(blogPostsObject[postObject]);
		}
	}
}