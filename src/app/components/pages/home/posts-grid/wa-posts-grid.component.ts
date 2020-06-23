import { Component, Input, EventEmitter, Output } from '@angular/core';
import { WADBService } from '../../../../services/database/wa-db.service';
import { WALoaderService } from '../../../../services/loader/wa-loader.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'ufm-posts-grid',
	templateUrl: './wa-posts-grid.component.html',
	styleUrls: ['./wa-posts-grid.component.scss']
})
export class WAPostsGridComponent {

	@Input() category: string;

	@Input() title: string;

	@Input() numberOfPosts: number;

	@Input() showMainPost: boolean = false;

	@Output() postCardClicked: EventEmitter<any> = new EventEmitter<any>();

	loading: boolean = true;

	blogPostList: Array<any> = [];

	filteredBlogPosts: Array<any> = [];

	pageLoadingStateChange: Subscription;

	constructor(
		private WADBService: WADBService,
		private WALoaderService: WALoaderService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.pageLoadingStateChange = this.WALoaderService.pageLoadingStateChange.subscribe((state: boolean) => {
			if (!state) {
				this.blogPostList = this.WADBService.getBlogPostsList();
				this.filteredBlogPosts = this.WADBService.filterPostsData(this.category, this.numberOfPosts, this.route);
				this.loading = false;
			}
		})
	}

	navigateToPost(link: string) {
		this.loading = true;
		this.postCardClicked.emit(link);
	}

	ngOnDestroy() {
		this.pageLoadingStateChange.unsubscribe();
	}
}