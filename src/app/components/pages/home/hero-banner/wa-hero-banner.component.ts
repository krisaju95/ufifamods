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

	description: string = '';

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
				this.description = ((this.heroBannerPost['post-description'] || this.heroBannerPost['post-text-content'] || '') as string).slice(0, 100).trim();
				const matches: RegExpMatchArray = (this.heroBannerPost['post-title'] as string).match(new RegExp(/^FIFA\s[0-9]+\:/)) || [];
				if (matches[0]) {
					this.heroBannerPost['post-title'] = this.heroBannerPost['post-title'].replace(matches[0], '<span class="wa-title-highlight">' + matches[0] + '</span>');
					this.heroBannerPost['post-title'] = this.heroBannerPost['post-title'].replace(':', '');
				}
				this.loading = false;
				pageLoadingStateChange.unsubscribe();
			}
		})
	}
}