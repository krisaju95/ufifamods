import { Component } from '@angular/core';
import { WALoaderService } from '../../../../services/loader/wa-loader.service';
import { WADBService } from 'src/app/services/database/wa-db.service';
import { ActivatedRoute } from '@angular/router';
import { WABlogPost } from 'src/app/interfaces/blog-post.interface';
import { WARootScope } from 'src/app/services/globals/wa-rootscope';

const numberOfHeroBannerImages: number = 6

@Component({
	selector: 'ufm-wa-hero-banner',
	templateUrl: './wa-hero-banner.component.html',
	styleUrls: ['./wa-hero-banner.component.scss']
})
export class WAHeroBannerComponent {

	loading: boolean = true;

	heroPost: WABlogPost = ({} as WABlogPost);

	constructor(
		private WALoaderService: WALoaderService,
		private WADBService: WADBService,
		public WARootScope: WARootScope,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.WALoaderService.pageLoadingStateChange.subscribe((state: boolean) => {
			this.loading = state;
			if (!state) {
				this.heroPost = this.WADBService.filterPostsData("featured", 1, this.route)[0];
			}
		})
	}
}