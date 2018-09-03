import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {

	constructor(

	) { }

	categoryColourMap: Object = {
		"fut": "blue",
		"mods": "yellow",
		"youtube": "pink",
		"career": "purple"
	}

	getCategoryColourTheme(category) {
		let categoryString = (category.split(" ")[0]).toLowerCase();
		return this.categoryColourMap[categoryString] || "blue";
	}

	isTargetted() {
		let num = parseInt((Math.random() * 100).toString()) % 2;
		return (num == 0);
	}

	filterPostsData(blogPosts, category) {
		let filteredPostsData = [];
		for(let postObject of blogPosts) {
			let categoriesList = (postObject["sectionCategory"].toLowerCase()).split(";");
			if(categoriesList.indexOf(category) > -1) {
				filteredPostsData.push(postObject);
			}
		}
		return filteredPostsData;
	}

	getTargettedBlogPostHeader() {
		let num = parseInt((Math.random() * 100).toString()) % 4;
		return num;
	}
}