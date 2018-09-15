import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
		this.http.get(this.service.getCSLP() +  "eb4b2165-a94f-11e8-9e97-a58df81c0425")
			.subscribe((data) => {
				this.responseLoading = false;
				this.setBlogPostsArray(data);
			})
	}

	setBlogPostsArray(blogPostsObject) {
		for (let postObject of blogPostsObject) {
			if(postObject['featured'] == 'TRUE') {
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