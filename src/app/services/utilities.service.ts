import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UtilitiesService {

	constructor(
		private title: Title,
		private router: Router
	) { }

	searchTriggered: Subject<any> = new Subject();

	CSLP: string = "https://raw.githubusercontent.com/krisaju95/ufifamods/master/db";

	siteDomain: string = "http://ufifamods.com/";

	siteTitle: string = "Ultimate FIFA Mods | FIFA 19 News, Media, Mods and Tutorials";

	getSiteDomain() {
		return this.siteDomain;
	}

	getCSLP() {
		return this.CSLP;
	}

	getSiteTitle() {
		return this.siteTitle;
	}

	filterPostsData(blogPosts, category) {
		let filteredPostsData = [];
		let numberOfFeaturedPosts: number = 0;
		for (let { postObject, postIndex } of blogPosts.map((postObject, postIndex) => ({ postObject, postIndex }))) {
			if (category == 'featured/!first') {
				if (postIndex != 0 && postObject['is-featured']) {
					filteredPostsData.push(postObject);
				}
			} else if (category == '!featured') {
				if (!postObject['is-featured'] || numberOfFeaturedPosts >= 5) {
					filteredPostsData.push(postObject);
				} else {
					numberOfFeaturedPosts++;
				}
			} else {
				let categoriesList: Array<string> = [];
				if (typeof postObject['post-category-list'] == 'string') {
					categoriesList = (postObject["post-category-list"].toLowerCase()).split(";");
				} else {
					categoriesList = postObject["post-category-list"];
				}
				if (categoriesList.indexOf(category.toLowerCase()) > -1) {
					filteredPostsData.push(postObject);
				}
			}
		}
		return filteredPostsData;
	}

	setPageTitle(pageTitle, isBase) {
		if (!isBase) {
			this.title.setTitle(pageTitle + " | " + this.getSiteTitle());
		}
		else {
			this.title.setTitle(this.getSiteTitle());
		}
	}

	routeToState(state: string) {
		this.router.navigate(['/' + state]);
	}

	isMobileViewPort() {
		return ((window.innerWidth < 900) && (window.innerHeight < 900));
	}

	isTabViewPort() {
		return !this.isMobileViewPort() && (window.innerWidth <= 1024);
	}

	isDesktopViewPort() {
		return (window.innerWidth > 1024);
	}
}