import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilitiesService } from '../../../services/utilities.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'blog-posts-list',
	templateUrl: './blogposts.list.component.html',
	styleUrls: ['./blogposts.list.component.scss']
})

export class BlogPostsListComponent {

	constructor(
		private http: HttpClient,
		private route: ActivatedRoute,
		private service: UtilitiesService
	) { }

	responseLoading: boolean = true;
	blogPostsObject: Object;
	blogPostsArray: Array<object> = [];
	numberOfPosts: number = 0;
	numberOfPages: number = 0;
	currentPageNumber: number = 1;
	startPostIndex: number = 0;
	endPostIndex: number = 12;
	numberOfPostsPerRow: number = 3;
	numberOfPostsPerPage: number = 12;
	pageNumbers: Array<number> = [1, 2, 3, 4, 5];

	isDesktopViewPort: boolean = false;
	isTabViewPort: boolean = false;
	isMobileViewPort: boolean = false;

	ngOnInit() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
		if (this.isMobileViewPort) {
			this.numberOfPostsPerRow = 1;
		} else if (this.isTabViewPort) {
			this.numberOfPostsPerRow = 2;
		} else {
			this.numberOfPostsPerRow = 3;
		}
		let startTime = new Date().getTime();
		this.http.get(this.service.getCSLP() + "/blog-posts-list")
			.subscribe((data) => {
				let timeDiff = new Date().getTime() - startTime;
				this.blogPostsObject = data;
				this.numberOfPosts = Object.keys(this.blogPostsObject).length;
				this.numberOfPages = Math.ceil(this.numberOfPosts / this.numberOfPostsPerPage);
				this.convertObjectToArray();
				let pageNumber: number = parseInt(this.route.snapshot.paramMap.get('pageNumber') || '1');
				if (typeof pageNumber == 'number' && pageNumber != NaN && pageNumber >= 0 && pageNumber < this.numberOfPages) {
					this.fetchSinglePageResults(pageNumber);
				} else {
					this.service.routeToState('blog/pages/1');
				}
				if (timeDiff < 2000) {
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
				'post-title': postObject['post-title'],
				'post-text-content': postObject['post-text-content'],
				'post-image': postObject['post-image'],
				'post-category': postObject['post-category'] ? postObject['post-category'] : postObject['post-category-list'].split(';')[0],
				'post-link': post,
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
		this.startPostIndex = this.numberOfPostsPerPage * (pageNumber - 1);
		this.endPostIndex = this.numberOfPostsPerPage * (pageNumber);
		this.currentPageNumber = pageNumber;
		this.setPageNumbers();
		if (pageNumber > 1 && pageNumber <= this.numberOfPages) {
			this.service.routeToState('blog/pages/' + pageNumber);
		} else {
			this.service.routeToState('blog');
		}
		this.showLoader(2000);
	}

	setPageNumbers() {
		if (this.currentPageNumber > 2 && this.currentPageNumber < (this.numberOfPages - 2)) {
			this.pageNumbers = [
				this.currentPageNumber - 2,
				this.currentPageNumber - 1,
				this.currentPageNumber,
				this.currentPageNumber + 1,
				this.currentPageNumber + 2
			]
		} else if (this.currentPageNumber > 0 && this.currentPageNumber < 3) {
			this.pageNumbers = [1, 2, 3, 4, 5];
		} else if (this.currentPageNumber > (this.numberOfPages - 2) && this.currentPageNumber <= this.numberOfPages) {
			this.pageNumbers = [
				this.numberOfPages - 4,
				this.numberOfPages - 3,
				this.numberOfPages - 2,
				this.numberOfPages - 1,
				this.numberOfPages
			]
		}
	}

	showLoader(loaderTime) {
		this.responseLoading = true;
		setTimeout(() => {
			this.responseLoading = false
		}, loaderTime);
	}

	@HostListener('window:resize') onWindowResize() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
		if (this.isMobileViewPort) {
			this.numberOfPostsPerRow = 1;
		} else if (this.isTabViewPort) {
			this.numberOfPostsPerRow = 2;
		} else {
			this.numberOfPostsPerRow = 3;
		}
	}

	@HostListener('window:orientationchange') onOrientationChange() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
		if (this.isMobileViewPort) {
			this.numberOfPostsPerRow = 1;
		} else if (this.isTabViewPort) {
			this.numberOfPostsPerRow = 2;
		} else {
			this.numberOfPostsPerRow = 3;
		}
	}
}