import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { UtilitiesService } from '../../../services/utilities.service';
import { ClubInfoService } from '../../../services/clubinfo.service';
import { ConstantsProviderService } from '../../../services/constants-provider.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
	selector: 'site-admin-fut-squad',
	templateUrl: './site-admin.fut-squad.component.html',
	styleUrls: ['./site-admin.fut-squad.component.scss']
})

export class SiteAdminFutSquadComponent {

	constructor(
		private datePipe: DatePipe,
		private http: HttpClient,
		private service: UtilitiesService,
		private clubInfoService: ClubInfoService,
		private constantsProviderService: ConstantsProviderService
	) { }

	responseLoading: boolean = true;
	blogPostForm: FormGroup;
	blogPostListRawJSON: object;
	blogPostListJSON: string;
	blogPostJSON: string;
	uniqueFileURL: string = '';
	countriesList: Array<string> = this.constantsProviderService.getConstant('countries');
	contributorsList: Array<string> = this.constantsProviderService.getConstant('contributorsList');
	postCategories: Array<string> = this.constantsProviderService.getConstant('blogPostCategories');
	selectedContributorsList: Array<string> = [];
	selectedPostTags: Array<string> = [];
	readonly separatorKeysCodes: number[] = [ENTER, COMMA];

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
			postDate: new FormControl(new Date()),
			postTitle: new FormControl(''),
			postCategory: new FormControl(''),
			morePostCategories: new FormControl(''),
			postDescription: new FormControl(''),
			postContent: new FormControl(''),
			postFooterMessage: new FormControl(''),
			postMedia: new FormControl(''),
			contributorsList: new FormControl(''),
			showModDisclaimer: new FormControl(false),
			starHeadsList: new FormArray([
				new FormGroup({
					playerName: new FormControl(''),
					playerLeague: new FormControl(''),
					playerClub: new FormControl(''),
					playerNationality: new FormControl(''),
					playerScreenshot: new FormControl('')
				})
			]),
			squadType: new FormControl(''),
			fifaVersion: new FormControl(''),
			squadPlayers: new FormArray([
				new FormGroup({
					name: new FormControl(''),
					id: new FormControl(''),
					position: new FormControl(''),
					rating: new FormControl(''),
					club: new FormControl(''),
					nationality: new FormControl(''),
					quality: new FormControl('')
				})
			]),
			formVersion: new FormControl('v2019'),
			modDownloadLink: new FormControl('')
		});

		this.blogPostForm.controls.postTemplate.valueChanges.subscribe((value) => {
			switch (value) {
				case 'fifa19:starheads': {
					this.blogPostForm.controls.postTitle.setValue('FIFA 19: Custom Star-heads Patch - FP #');
					this.blogPostForm.controls.postCategory.setValue('mods');
					this.blogPostForm.controls.postDescription.setValue('features in this pack.');
					this.blogPostForm.controls.postFooterMessage.setValue('Enjoying our content? Like, Share & Comment!');
					this.selectedPostTags = ['fifa 19', 'fifa mods', 'fifa 19 faces']
					this.blogPostForm.controls.showModDisclaimer.setValue(true);
					break;
				}
				case 'fifa16:starheads': {
					this.blogPostForm.controls.postTitle.setValue('FIFA 16: Custom Star-heads Patch - FP #');
					this.blogPostForm.controls.postCategory.setValue('mods');
					this.blogPostForm.controls.postDescription.setValue('features in this pack.');
					this.blogPostForm.controls.postFooterMessage.setValue('Enjoying our content? Like, Share & Comment!');
					this.selectedPostTags = ['fifa 16', 'fifa mods', 'fifa 16 faces']
					this.blogPostForm.controls.showModDisclaimer.setValue(true);
					break;
				}
				case 'fifa19:totw': {
					this.blogPostForm.controls.postTitle.setValue('FIFA 19: Team of the Week - TOTW #');
					this.blogPostForm.controls.postCategory.setValue('totw');
					this.blogPostForm.controls.postDescription.setValue("feature in this week's team of in-forms.");
					this.blogPostForm.controls.postFooterMessage.setValue('Enjoying our content? Like, Share & Comment!');
					this.selectedPostTags = ['fifa 19', 'fut', 'fifa 19 totw']
					break;
				}
			}
		})
	}

	submitPost() {
		console.log(this.blogPostForm);
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
			"post-date": this.datePipe.transform(this.getFormElementValue('postDate'), 'yyyy-MM-dd'),
			"post-category": this.getFormElementValue('postCategory'),
			"post-title": this.getFormElementValue('postTitle'),
			"post-intro-text": this.getFormElementValue('postDescription'),
			"post-main-text-array": this.generateMainPostTextArray(),
			"post-last-para": this.getFormElementValue('postFooterMessage'),
			"post-link": this.generatePostLink(),
			"post-media": this.getFormElementValue('postMedia'),
			"post-category-list": this.selectedPostTags,
			"contributors-list": this.selectedContributorsList,
			"show-mod-disclaimer": this.getFormElementValue('showModDisclaimer'),
			"faces-included-list": this.getFormElementValue('starHeadsList'),
			"mod-download-link": this.getFormElementValue('modDownloadLink')
		}
	}

	generateBlogPostListModPost() {
		let blogPostJSON: object = this.generateModPost();
		return {
			"post-json-url": this.getUniqueFileURL(),
			"post-date": blogPostJSON['post-date'],
			"post-category": blogPostJSON['post-category'],
			"post-category-list": this.selectedPostTags,
			"post-image": blogPostJSON['post-media'],
			"post-title": blogPostJSON['post-title'],
			"post-text-content": this.generateSearchTextContent(blogPostJSON),
			"isFeatured": blogPostJSON['isFeatured']
		}
	}

	getFormElementValue(formElementName: string): any {
		return this.blogPostForm.controls[formElementName].value;
	}

	generateSearchTextContent(blogPostJSON) {
		let searchTextContent = blogPostJSON['post-intro-text'] + ' ' + blogPostJSON['post-main-text-array'].join(' ') + ' ' + blogPostJSON['contributors-list'].join(', ');
		if (blogPostJSON['faces-included-list']) {
			searchTextContent = searchTextContent + '. Includes custom star-heads for ';
			let starHeadList = [];
			for (let starHead of blogPostJSON['faces-included-list']) {
				starHeadList.push(starHead.playerName);
			}
			searchTextContent = searchTextContent + starHeadList.join(', ');
		}
	}

	generatePostLink(): string {
		let postDate: string = this.datePipe.transform(this.getFormElementValue('postDate'), 'yyyy-MM-dd');
		let formattedPostTitle: string = this.getFormElementValue('postTitle').toLowerCase().replace(/[\-\:\'\#]/g, '').replace(/\s\s/g, ' ').split(' ').join('-');
		return '/blog/post/' + postDate.split('-').join('/') + '/' + formattedPostTitle;
	}

	generateMainPostTextArray() {
		let mainPostContent: string = JSON.stringify(this.getFormElementValue('postContent'));
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
		if (!this.blogPostListRawJSON.hasOwnProperty(uniqueFileURL)) {
			this.uniqueFileURL = uniqueFileURL;
			return uniqueFileURL;
		} else {
			return this.getUniqueFileURL();
		}
	}

	addNewStarHeadRow() {
		(<FormArray>this.blogPostForm.get('starHeadsList')).push(new FormGroup({
			playerName: new FormControl(''),
			playerLeague: new FormControl(''),
			playerClub: new FormControl(''),
			playerNationality: new FormControl(''),
			playerScreenshot: new FormControl('')
		}))
	}

	removePlayer(starHeadIndex: number) {
		(<FormArray>this.blogPostForm.get('starHeadsList')).removeAt(starHeadIndex);
	}

	addContributor(event: any): void {
		if (event && event.option && event.option.viewValue) {
			this.selectedContributorsList.push(event.option.viewValue);
			(<FormArray>this.blogPostForm.get('contributorsList')).setValue(null);
		}
	}

	removeContributor(listIndex: number) {
		this.selectedContributorsList.splice(listIndex, 1);
	}

	addTag(event: any): void {
		if (event && event.option && event.option.viewValue) {
			this.selectedPostTags.push(event.option.viewValue);
			(<FormArray>this.blogPostForm.get('morePostCategories')).setValue(null);
		}
	}

	removeTag(listIndex: number) {
		this.selectedPostTags.splice(listIndex, 1);
	}

	getLeagueListKeys() {
		return this.clubInfoService.getLeagueListKeys();
	}

	getLeagueListObject(leagueName: string) {
		return this.clubInfoService.getLeagueInfo(leagueName);
	}

	getClubListKeys(leagueName: string) {
		return this.clubInfoService.getClubListKeys(leagueName);
	}

	getClubInfo(leagueName: string, clubName: string) {
		return this.clubInfoService.getClubInfo(leagueName, clubName);
	}
}