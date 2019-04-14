import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { UtilitiesService } from '../services/utilities.service';

@Component({
	selector: 'site-admin',
	templateUrl: './site.admin.component.html',
	styleUrls: ['./site.admin.component.scss']
})

export class SiteAdminComponent {

	constructor(
		private datePipe: DatePipe,
		private http: HttpClient,
		private service: UtilitiesService
	) { }

	responseLoading: boolean = true;
	blogPostForm: FormGroup;
	blogPostListRawJSON: object;
	blogPostListJSON: string;
	blogPostJSON: string;
	uniqueFileURL: string = '';

	ngOnInit() {
		let requestHeaders = new HttpHeaders();
		requestHeaders.append('pragma', 'no-cache');
		requestHeaders.append('cache-control', 'no-cache');
		this.http.get(this.service.getCSLP() + "/blog-posts-list", { headers: requestHeaders })
			.subscribe((data: object) => {
				this.blogPostListRawJSON = data;
				this.blogPostListJSON = JSON.stringify(data, null, 5);
				this.responseLoading = false;
			});
		this.blogPostForm = new FormGroup({
			postTemplate: new FormControl(''),
			postDate: new FormControl('', [Validators.required]),
			postTitle: new FormControl('', [Validators.required]),
			postCategory: new FormControl('', [Validators.required]),
			morePostCategories: new FormControl('', [Validators.required]),
			postDescription: new FormControl('', [Validators.required]),
			postContent: new FormControl('', [Validators.required]),
			postFooterMessage: new FormControl('', [Validators.required]),
			postMedia: new FormControl(''),
			contributorsList: new FormControl(''),
			showModDisclaimer: new FormControl(false),
			starHeadsList: new FormControl(''),
			modDownloadLink: new FormControl('')
		});

		this.blogPostForm.controls.postTemplate.valueChanges.subscribe((value) => {
			switch (value) {
				case 'fifa19:starheads': {
					this.blogPostForm.controls.postTitle.setValue('FIFA 19: Custom Star-heads Patch - FP #');
					this.blogPostForm.controls.postCategory.setValue('mods');
					this.blogPostForm.controls.postDescription.setValue('features in this pack.');
					this.blogPostForm.controls.postFooterMessage.setValue('Enjoying our content? Like, Share & Comment!');
					this.blogPostForm.controls.showModDisclaimer.setValue(true);
				}
			}
		})
	}

	submitPost() {
		// this.blogPostJSON = JSON.stringify(this.blogPostForm.value, null, 4);
		this.blogPostJSON = JSON.stringify(this.generateModPost(), null, 5);
		this.blogPostListRawJSON[this.generatePostLink()] = this.generateBlogPostListModPost();
		this.blogPostListJSON = JSON.stringify(this.blogPostListRawJSON, null, 5);
	}

	copySinglePostJSON() {
		let textArea: any = document.getElementById('singlePostJSON');
		textArea.select();
		document.execCommand('copy');
	}

	copyBlogPostsListJSON() {
		let textArea: any = document.getElementById('blogPostsListJSON');
		textArea.select();
		document.execCommand('copy');
	}

	copyUniqueFileURL() {
		let textArea: any = document.getElementById('uniqueFileURL');
		textArea.select();
		document.execCommand('copy');
	}

	generateModPost() {
		return {
			"post-date": this.datePipe.transform(this.getFormElement('postDate'), 'yyyy-MM-dd'),
			"post-category": this.getFormElement('postCategory'),
			"post-title": this.getFormElement('postTitle'),
			"post-intro-text": this.getFormElement('postDescription'),
			"post-main-text-array": this.generateMainPostTextArray(),
			"post-last-para": this.getFormElement('postFooterMessage'),
			"post-link": this.generatePostLink(),
			"post-media": this.getFormElement('postMedia'),
			"post-category-list": "",
			"contributors-list": [
				"karron97",
				"krisaju95"
			],
			"show-mod-disclaimer": this.getFormElement('showModDisclaimer'),
			"faces-included-list": [
				"Cristian Zapata, AC Milan, Colombia NT",
				"Alex Iwobi, Arsenal FC, Nigeria NT",
				"Daniel Crowley, Willem II, England NT"
			],
			"mod-download-link": this.getFormElement('modDownloadLink')
		}
	}

	generateBlogPostListModPost() {
		let blogPostJSON: object = this.generateModPost();
		return {
			"post-json-url": this.getUniqueFileURL(),
			"post-date": blogPostJSON['post-date'],
			"post-category": blogPostJSON['post-category'],
			"post-category-list": "fifa 16;fifa mods;fifa 16 faces",
			"post-image": blogPostJSON['post-media'],
			"post-title": blogPostJSON['post-title'],
			"post-text-content": blogPostJSON['post-intro-text'] + ' ' + blogPostJSON['post-main-text-array'].join(' ') + ' ' + blogPostJSON['contributors-list'].join(', '),
			"isFeatured": blogPostJSON['isFeatured']
		}
	}

	getFormElement(formElementName: string): any {
		return this.blogPostForm.controls[formElementName].value;
	}

	generatePostLink(): string {
		let postDate: string = this.datePipe.transform(this.getFormElement('postDate'), 'yyyy-MM-dd');
		let formattedPostTitle: string = this.getFormElement('postTitle').toLowerCase().replace(/[\-\:\'\#]/g, '').replace(/'  '/g, ' ').split(' ').join('-');
		return '/blog/post/' + postDate.split('-').join('/') + '/' + formattedPostTitle;
	}

	generateMainPostTextArray() {
		let mainPostContent: string = JSON.stringify(this.getFormElement('postContent'));
		let mainPostContentArray: Array<string> = [];
		let formattedMainPostContentArray: Array<string> = [];
		mainPostContent = mainPostContent.replace(/\"/g, '');
		mainPostContent = mainPostContent.split('\\n').join('^');
		mainPostContentArray = mainPostContent.split('^');
		for (let para of mainPostContentArray) {
			if (para) {
				formattedMainPostContentArray.push(para);
			}
		}
		return formattedMainPostContentArray;
	}

	getUniqueFileURL() {
		let characterLengths = [8, 4, 4, 4, 12];
		let charset = "abcdefghijklmnopqrstuvwxyz0123456789";
		let fileURLparts = [];
		for (let charLength of characterLengths) {
			let fileURLpart = ""
			for (let i = 0; i < charLength; i++) {
				fileURLpart += charset.charAt(Math.floor(Math.random() * charset.length));
			}
			fileURLparts.push(fileURLpart)
		}
		let uniqueFileURL = fileURLparts.join('-');
		if(!this.blogPostListRawJSON.hasOwnProperty(uniqueFileURL)) {
			this.uniqueFileURL = uniqueFileURL;
			return uniqueFileURL;
		} else {
			return this.getUniqueFileURL();
		}
	}
}