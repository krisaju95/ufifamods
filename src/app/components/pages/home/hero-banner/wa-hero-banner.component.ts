import { Component } from '@angular/core';
import { WADBService } from '../../../../services/database/wa-db.service';
import { WALoaderService } from '../../../../services/loader/wa-loader.service';

@Component({
	selector: 'ufm-wa-hero-banner',
	templateUrl: './wa-hero-banner.component.html',
	styleUrls: ['./wa-hero-banner.component.scss']
})
export class WAHeroBannerComponent {

	loading: boolean = true;

	blogPostList: Array<any> = [];

	filteredBlogPosts: Array<any> = [];

	heroBannerPost: any = {};

	constructor(
		private WADBService: WADBService,
		private WALoaderService: WALoaderService
	) { }

	ngOnInit() {
		const pageLoadingStateChange = this.WALoaderService.pageLoadingStateChange.subscribe((state: boolean) => {
			if (!state) {
				this.blogPostList = this.WADBService.getBlogPostsList();
				this.filteredBlogPosts = this.WADBService.filterPostsData(this.blogPostList, 'featured', 1);
				this.heroBannerPost = this.filteredBlogPosts[0];
				this.loading = false;
				pageLoadingStateChange.unsubscribe();
			}
		})
	}
}