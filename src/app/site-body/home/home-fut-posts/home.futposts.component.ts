import { Component, Input } from '@angular/core';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
	selector: 'home-fut-posts',
	templateUrl: './home.futposts.component.html',
	styleUrls: ['./home.futposts.component.scss']
})

export class HomeFUTPostsComponent {

	constructor(
		private service: UtilitiesService
	) {}

	@Input() blogPosts: Array<Object> = [];

	componentLoading: Boolean = true;
	postsData: Array<Object> = [];
	selectedPostIndex: Number = 0;

	ngOnInit() {
		this.setPostsData();
	}

	setPostsData() {
		this.postsData = this.service.filterPostsData(this.blogPosts, "fut");
	}

	redirectToPost(postLink) {
		console.log(postLink);
	}
}