import { Component, Inject, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilitiesService } from '../../../services/utilities.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

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
		private service: UtilitiesService,
		public dialog: MatDialog
	) { }

	siteURL: string = "";
	responseLoading: boolean = true;
	postURL: string = "";
	postMap: Array<object>;
	fileURL: string = "";
	postData: Object;
	postMainTextArray: Array<string> = [];
	contributorsList: Array<string>;
	facesIncludedList: Array<string>;
	screenshotsList: Array<string>;
	futSquadInfo: object = {}
	showModDisclaimer: boolean = false;
	downloadText: string = "Download";
	categoryList: Array<string> = [];

	isDesktopViewPort: boolean = false;
	isTabViewPort: boolean = false;
	isMobileViewPort: boolean = false;

	ngOnInit() {
		this.siteURL = this.service.getSiteDomain();
		this.postURL = this.getPostURL();
		this.isDesktopViewPort = this.service.isDesktopViewPort();
		this.isTabViewPort = this.service.isTabViewPort();
		this.isMobileViewPort = this.service.isMobileViewPort();
		this.initialiseData(this.postURL);
	}

	initialiseData(postURL: string) {
		this.postURL = postURL;
		this.responseLoading = true;
		this.getPostData();
	}

	getPostData() {
		this.http.get(this.service.getCSLP() + '/blog-posts-list')
			.subscribe((data) => {
				this.fileURL = this.getFileURL(data);
				this.http.get(this.service.getCSLP() + '/blog-posts/' + this.getParam('year') + '/' + this.getParam('month') + '/' + this.fileURL)
					.subscribe((postData) => {
						this.responseLoading = false;
						this.postData = postData;
						this.postMainTextArray = this.postData['post-main-text-array'] || [];
						this.contributorsList = this.postData['contributors-list'];
						this.facesIncludedList = this.postData['faces-included-list'];
						this.screenshotsList = this.postData['screenshots-list'];
						this.futSquadInfo = this.postData['fut-squad'];
						this.showModDisclaimer = (this.postData['show-mod-disclaimer'] == true || this.postData['show-mod-disclaimer'] == 'true')
						this.getPostCategories();
						window.scroll(0, 0);
						this.service.setPageTitle(this.postData['post-title'], false);
					},
						() => {
							this.service.routeToState('404');
						}
					)
			},
				() => {
					this.service.routeToState('404');
				}
			)
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
		if (typeof this.postData["post-category-list"] == 'string') {
			this.categoryList = this.postData["post-category-list"].split(";");
		} else {
			this.categoryList = this.postData["post-category-list"];
		}
	}

	openDialog() {
		this.dialog.open(ModDownloadDialog, {
			data: {
				url: this.postData['mod-download-link'],
				downloadLink: this.postData['download-link']
			},
			maxWidth: '500px',
			panelClass: 'wwt-mat-dialog'
		});
	}

	sanitizeURL(data) {
		return this.sanitizer.bypassSecurityTrustHtml(data)
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

@Component({
	selector: 'mod-download-dialog',
	templateUrl: './mod.dialog.dialog.html',
	styleUrls: ['./mod.dialog.dialog.scss']
})

export class ModDownloadDialog {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	downloadButtonClicked: boolean = false;
	downloadDataVersion: string = '2018';

	downloadURL: string = this.data.url;
	downloadURLArray: Array<object> = this.data.downloadLink;

	ngOnInit() {
		this.downloadDataVersion = !!this.downloadURL ? '2019' : '2018';
	}

	downloadFile() {
		this.downloadButtonClicked = true;
		let url = this.data.url;
		let fileElement = document.createElement("iframe");
		let downloadIframeContainer = document.getElementById("downloadIframeContainer");
		fileElement.src = url;
		fileElement.style.display = "none";
		downloadIframeContainer.appendChild(fileElement);
	}
}