import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../../services/utilities.service';

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
		this.service.setPageTitle(this.service.getSiteTitle(), true);
		let startTime = new Date().getTime();
		let requestHeaders = new HttpHeaders();
		requestHeaders.append('pragma', 'no-cache');
		requestHeaders.append('cache-control', 'no-cache');
		this.setFallbackState();
		this.http.get(this.service.getCSLP() + "/blog-posts-list", {headers: requestHeaders})
			.subscribe((data) => {
				this.setBlogPostsArray(data);
				let timeDiff = new Date().getTime() - startTime;
				if (timeDiff < 2000) {
					setTimeout(() => {
						this.responseLoading = false;
					}, 2000 - timeDiff);
				}
				else {
					this.responseLoading = false;
				}
			});
	}

	setBlogPostsArray(blogPostsObject: object) {
		for (let blogPost in blogPostsObject) {
			let postObject: object = blogPostsObject[blogPost];
			postObject["post-link"] = blogPost;
			this.blogPosts.push(postObject);
		}
	}

	setFallbackState() {
		setTimeout(() => {
			if(this.responseLoading) {
				this.service.routeToState('404');
			}
		}, 10000);
	}
}