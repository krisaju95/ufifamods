import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
	selector: 'blog-posts-list',
	templateUrl: './blogposts.list.component.html',
	styleUrls: ['./blogposts.list.component.scss']
})

export class BlogPostsListComponent {

	constructor(
		private http: HttpClient,
		private service: UtilitiesService
	) { }

	responseLoading: boolean = true;
	blogPostsObject: Object;
	blogPostsArray: Array<object> = [];
	numberOfPosts: number = 0;
	numberOfPages: number = 0;
	currentPageNumber: number = 0;
	startPostIndex: number = 0;
	endPostIndex: number = 10;

	isDesktopViewPort: boolean = false;
	isMobileViewport: boolean = false;

	ngOnInit() {
		let startTime = new Date().getTime();
		this.http.get(this.service.getCSLP() + "/blog-posts-list")
			.subscribe((data) => {
				let timeDiff = new Date().getTime() - startTime;
				this.blogPostsObject = data;
				this.numberOfPosts = Object.keys(this.blogPostsObject).length;
				this.numberOfPages = Math.ceil(this.numberOfPosts / 10);
				this.convertObjectToArray();
				if(timeDiff < 2000) {
					setTimeout(() => {
						this.responseLoading = false;
					}, 2000 - timeDiff);
				}
				else {
					this.responseLoading = false;
				}
			})
	}

	convertObjectToArray() {
		for (let post in this.blogPostsObject) {
			let postObject = this.blogPostsObject[post];
			this.blogPostsArray.push({
				postTitle: postObject['post-title'],
				postDescription: postObject['post-text-content'],
				postImage: postObject['post-image'],
				postURL: post,
				postDate: this.getDate(post)
			})
		}
	}

	getDate(postURL) {
		let urlParts = postURL.split('/');
		let dateString = [urlParts[3], urlParts[4], urlParts[5]].join('-');
		return dateString;
	}

	fetchSinglePageResults(pageNumber) {
		window.scroll(0, 0);
		if (pageNumber < this.currentPageNumber) {
			this.startPostIndex = this.startPostIndex - 10;
			this.endPostIndex = this.endPostIndex - 10;
		}
		else {
			this.startPostIndex = this.startPostIndex + 10;
			this.endPostIndex = this.endPostIndex + 10;
		}
		this.currentPageNumber = pageNumber;
		this.showLoader(2000);
	}

	showLoader(loaderTime) {
		this.responseLoading = true;
		setTimeout(() => {
			this.responseLoading = false
		}, loaderTime);
	}
}