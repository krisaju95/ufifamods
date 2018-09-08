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

	ngOnInit() {
		this.setPostData();
		this.setMainPostData(0);
		this.fadeImage();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	setPostData() {
		for(let postObject of this.blogPosts) {
			if(postObject["featured"] == "TRUE") {
				this.postsData.push(postObject);
			}
			if(this.postsData.length == 4) {
				break;
			}
		}
	}

	setMainPostData(postIndex) {
		this.mainPostData = {
			"category": this.postsData[postIndex]["post-category"],
			"colour": this.postsData[postIndex]["post-colour"],
			"media": this.postsData[postIndex]["post-media"],
			"title": this.postsData[postIndex]["post-title"],
			"description": this.postsData[postIndex]["post-description"],
			"link": this.postsData[postIndex]["post-link"],
			"date": this.postsData[postIndex]["post-date"]
		}
	}

	selectPostEvent(postIndex) {
		this.selectedPostIndex = postIndex;
		this.setMainPostData(postIndex);
		this.fadeImage();
	}

	redirectToPost(postLink) {
		window.location.href = postLink;
	}

	fadeImage() {
		this.showImage = false;
		setTimeout(() => {
			this.showImage = true;
		}, 100);
	}
}