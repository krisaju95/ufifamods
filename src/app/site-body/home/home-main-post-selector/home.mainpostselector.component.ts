import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UtilitiesService } from '../../../services/utilities.service';
import { Router } from '@angular/router';

@Component({
	selector: 'home-main-post-selector',
	templateUrl: './home.mainpostselector.component.html',
	styleUrls: ['./home.mainpostselector.component.scss']
})

export class HomeMainPostSelectorComponent {

	constructor(
		private service: UtilitiesService,
		private router: Router
	) { }

	@Input() blogPosts: Array<Object>;
	@Input() selectedPostIndex: number;

	@Output() selectPostEvent: EventEmitter<number> = new EventEmitter<number>();

	postsData: Array<object> = [];
	slideShowInterval: any;
	isDesktopViewPort: boolean = false;
	isMobileViewport: boolean = false;

	ngOnInit() {
		this.setPostData();
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isMobileViewport = this.service.isMobileViewPort();
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
		if(this.isDesktopViewPort) {
			if(this.selectedPostIndex != postIndex) {
				this.selectPostEvent.emit(postIndex);
			}
		}
		else {
			this.router.navigate([this.postsData[postIndex]["post-link"]]);
		}
	}
}