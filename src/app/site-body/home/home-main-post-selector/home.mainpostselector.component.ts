import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'home-main-post-selector',
	templateUrl: './home.mainpostselector.component.html',
	styleUrls: ['./home.mainpostselector.component.scss']
})

export class HomeMainPostSelectorComponent {

	constructor(

	) { }

	@Input() blogPosts: Array<Object>;
	@Input() selectedPostIndex: number;

	@Output() selectPostEvent: EventEmitter<number> = new EventEmitter<number>();

	postsData: Array<Object> = [];
	slideShowInterval: any;

	ngOnInit() {
		this.setPostData();
	}

	getNextPostIndex() {
		if(this.selectedPostIndex < 3) {
			return this.selectedPostIndex + 1;
		}
		return 0;
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

	selectPost(postIndex) {
		if(this.selectedPostIndex != postIndex) {
			this.selectPostEvent.emit(postIndex);
		}
	}
}