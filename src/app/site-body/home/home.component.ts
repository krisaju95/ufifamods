import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'home-component',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})

export class HomeComponent {

	constructor(
		private http: HttpClient
	) { }

	responseLoading: Boolean = true;
	blogPosts: Array<Object> = [];

	ngOnInit() {
		// JSON URL: https://jsonblob.com/eb4b2165-a94f-11e8-9e97-a58df81c0425
		this.http.get("https://jsonblob.com/api/jsonBlob/eb4b2165-a94f-11e8-9e97-a58df81c0425")
			.subscribe((data) => {
				this.responseLoading = false;
				this.setBlogPostsArray(data);
			})
	}

	ngAfterViewInit() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	setBlogPostsArray(blogPostsObject) {
		for (let postObject in blogPostsObject) {
			this.blogPosts.push(blogPostsObject[postObject]);
		}
	}
}