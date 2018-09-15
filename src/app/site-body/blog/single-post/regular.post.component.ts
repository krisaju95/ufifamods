import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser'
import { UtilitiesService } from '../../../services/utilities.service'

@Component({
	selector: 'regular-blog-post',
	templateUrl: './regular.post.component.html',
	styleUrls: ['./regular.post.component.scss']
})

export class RegularBlogPostComponent {

	constructor(
		private route: ActivatedRoute,
		private http: HttpClient,
		private sanitizer: DomSanitizer,
		private service: UtilitiesService
	) { }

	siteURL: string = "";
	responseLoading: boolean = true;
	postURL: string = "";
	postMap: Array<object>;
	fileURL: string = "";
	postData: Object;
	postMainText: any;
	postMainText2: any;
	categoryList: Array<string> = [];
	targettedPostHeader: number = 0;

	isDesktopViewPort: boolean = false;
	isMobileViewport: boolean = false;

	ngOnInit() {
		this.siteURL = this.service.getSiteDomain();
		this.postURL = this.getPostURL();
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isMobileViewport = this.service.isMobileViewPort();
		this.initialiseData(this.postURL);
	}

	initialiseData(postURL) {
		this.postURL = postURL;
		this.responseLoading = true;
		this.getPostData();
		this.targettedPostHeader = this.service.getTargettedBlogPostHeader();
	}

	getPostData() {
		this.http.get(this.service.getCSLP() + "612e95db-aeb0-11e8-94a2-cf6856e41601")
			.subscribe((data) => {
				this.fileURL = this.getFileURL(data);
				this.http.get(this.service.getCSLP() + this.fileURL)
					.subscribe((postData) => {
						this.responseLoading = false;
						this.postData = postData;
						this.postMainText = this.postData['post-main-text'];
						this.postMainText2 = this.postData['post-main-text-2'];
						this.processMainPostContent();
						this.getPostCategories();
						window.scroll(0, 0);
					},
						() => {
							window.location.href = "/404"
						}
					)
			})
	}

	processMainPostContent() {
		this.postMainText = this.postMainText.replace(new RegExp("##", 'g'), "</strong>");
		this.postMainText2 = this.postMainText2.replace(new RegExp("##", 'g'), "</strong>");
		this.postMainText = this.postMainText.replace(new RegExp("#", 'g'), "<strong>");
		this.postMainText2 = this.postMainText2.replace(new RegExp("#", 'g'), "<strong>");
		this.postMainText = this.postMainText.split(";;");
		this.postMainText2 = this.postMainText2.split(";;");
	}

	getPostURL() {
		let postParameters = [this.getParam("year"), this.getParam("month"), this.getParam("date"), this.getParam("title")]
		return "/blog/post/" + postParameters.join("/");
	}

	getFileURL(data) {
		let postObject = data[this.postURL];
		if (postObject) {
			return postObject["post-json-url"];
		}
		return "";
	}

	getParam(paramName) {
		return this.route.snapshot.paramMap.get(paramName);
	}

	getPostCategories() {
		this.categoryList = this.postData["post-category-list"].split(";");
	}

	sanitizeURL(data) {
		return this.sanitizer.bypassSecurityTrustHtml(data)
	}

}