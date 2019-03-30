import { Component, Input, HostListener } from '@angular/core';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
	selector: 'home-posts-section',
	templateUrl: './home.posts.section.component.html',
	styleUrls: ['./home.posts.section.component.scss']
})

export class HomePostsSectionComponent {

	constructor(
		private service: UtilitiesService
	) { }

	@Input() blogPosts: Array<Object> = [];
	@Input() sectionCategory: string;
	@Input() sectionTitle: string;
	@Input() sectionDescription: string;

	postsData: Array<Object> = [];
	selectedPostIndex: Number = 0;
	isDesktopViewPort: boolean = this.service.isDesktopViewPort();
	isTabViewPort: boolean = this.service.isTabViewPort();
	isMobileViewPort: boolean = this.service.isMobileViewPort();

	ngOnInit() {
		this.setPostsData();
	}

	setPostsData() {
		this.postsData = this.service.filterPostsData(this.blogPosts, this.sectionCategory);
	}

	@HostListener('window:resize') onWindowResize() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
	}

	@HostListener('window:orientationchange') onOrientationChange() {
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
	}
}