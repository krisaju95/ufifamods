import { Component, Input } from '@angular/core';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
	selector: 'home-fifa-posts',
	templateUrl: './home.fifaposts.component.html',
	styleUrls: ['./home.fifaposts.component.scss']
})

export class HomeFIFAPostsComponent {

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
		this.postsData = this.service.filterPostsData(this.blogPosts, "fifa");
	}

	redirectToPost(postLink) {
		console.log(postLink);
	}
}