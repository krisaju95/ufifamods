import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../../../services/utilities.service';
import { Router } from '@angular/router';

@Component({
	selector: 'featured-posts-sidebar',
	templateUrl: './featuredposts.sidebar.component.html',
	styleUrls: ['./featuredposts.sidebar.component.scss']
})

export class FeaturedPostsSidebarComponent {

	constructor(
		private http: HttpClient,
		private service: UtilitiesService,
		private router: Router
	) { }

	@Output() selectPostEvent: EventEmitter<string> = new EventEmitter<string>();

	responseLoading: boolean = true;
	postsData: Array<object> = [];

	isDesktopViewPort: boolean = false;
	isMobileViewport: boolean = false;

	ngOnInit() {
		let requestHeaders = new HttpHeaders();
		requestHeaders.append('pragma', 'no-cache');
		requestHeaders.append('cache-control', 'no-cache');
		this.http.get(this.service.getCSLP() + "/blog-posts-list", {headers: requestHeaders})
			.subscribe((data) => {
				this.responseLoading = false;
				this.setBlogPostsArray(data);
			})
	}

	setBlogPostsArray(blogPostsObject) {
		for (let postUrl in blogPostsObject) {
			let postObject = blogPostsObject[postUrl];
			if(postObject['isFeatured'] && postUrl != window.location.pathname) {
				postObject['post-link'] = postUrl;
				this.postsData.push(postObject);
			}
			if(this.postsData.length == 4) {
				break;
			}
		}
	}

	routeToPost(postURL) {
		window.scroll(0, 0);
		this.router.navigate([postURL]);
		this.selectPostEvent.emit(postURL);
	}
}