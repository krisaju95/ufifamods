import { Component, Input, EventEmitter, Output } from '@angular/core';
import { WADBService } from '../../../../services/database/wa-db.service';
import { ActivatedRoute } from '@angular/router';

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

	@Input() loading: boolean = true;

	blogPostList: Array<any> = [];

	filteredBlogPosts: Array<any> = [];

	constructor(
		private WADBService: WADBService,
		private route: ActivatedRoute
	) { }

	ngOnChanges() {
		if (this.category) {
			this.blogPostList = this.WADBService.getBlogPostsList();
			this.filteredBlogPosts = this.WADBService.filterPostsData(this.category, this.numberOfPosts, this.route);
		}
	}

	navigateToPost(link: string) {
		this.loading = true;
		this.postCardClicked.emit(link);
	}
}