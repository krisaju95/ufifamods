import { Component, Input } from '@angular/core';
import { WADBService } from '../../../../services/database/wa-db.service';
import { WALoaderService } from '../../../../services/loader/wa-loader.service';

@Component({
	selector: 'ufm-posts-grid',
	templateUrl: './wa-posts-grid.component.html',
	styleUrls: ['./wa-posts-grid.component.scss']
})
export class WAPostsGridComponent {

	@Input() category: string;

	@Input() title: string;

	@Input() numberOfPosts: number;

	loading: boolean = true;

	blogPostList: Array<any> = [];

	filteredBlogPosts: Array<any> = [];

	constructor(
		private WADBService: WADBService,
		private WALoaderService: WALoaderService
	) { }

	ngOnInit() {
		const pageLoadingStateChange = this.WALoaderService.pageLoadingStateChange.subscribe((state: boolean) => {
			if (!state) {
				this.blogPostList = this.WADBService.getBlogPostsList();
				this.filteredBlogPosts = this.WADBService.filterPostsData(this.blogPostList, this.category, this.numberOfPosts);
				this.loading = false;
				pageLoadingStateChange.unsubscribe();
			}
		})
	}

}