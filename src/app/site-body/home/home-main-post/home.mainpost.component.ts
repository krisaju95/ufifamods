import { Component, Input } from '@angular/core';

@Component({
	selector: 'home-main-post',
	templateUrl: './home.mainpost.component.html',
	styleUrls: ['./home.mainpost.component.scss']
})

export class HomeMainPostComponent {

	@Input() blogPosts: Array<object> = [];

	componentLoading: boolean = true;
	mainPostData: object;
	postsData: Array<object> = [];
	selectedPostIndex: number = 0;
	showImage: boolean = false;
	currentDate: Date = new Date();
	titleLineClamp: number = 6;

	ngOnInit() {
		this.setPostData();
		window.scroll(0, 0);
	}

	setPostData() {
		for (let postObject of this.blogPosts) {
			if (postObject["is-featured"]) {
				this.postsData.push(postObject);
			}
			if (this.postsData.length == 5) {
				break;
			}
		}
		if (this.postsData[0]['post-category'] == 'mods') {
			this.titleLineClamp = 5
		} else {
			this.titleLineClamp = 6;
		}
	}
}