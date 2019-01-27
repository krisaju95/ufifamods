import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtilitiesService } from '../../../services/utilities.service';
import { Router } from '@angular/router';

@Component({
	selector: 'search-posts',
	templateUrl: './search.posts.component.html',
	styleUrls: ['./search.posts.component.scss']
})

export class SearchPostsComponent {

	constructor(
        private route: ActivatedRoute,
		private http: HttpClient,
		private service: UtilitiesService,
		private router: Router
	) { }

	responseLoading: boolean = true;
    postsData: Array<object> = [];
    searchQuery: string = "";
    blogPostsObject: Object;
    resultsFound: boolean = false;
    searchQueryTooShort: boolean = false;
    submittedOnce: boolean = false

	isDesktopViewPort: boolean = false;
	isMobileViewport: boolean = false;

	ngOnInit() {
        this.searchQuery = this.getSearchQuery();
		this.http.get(this.service.getCSLP() +  "/blog-posts-list")
			.subscribe((data) => {
                this.blogPostsObject = data;
				if(this.searchQuery) {
                    this.findSearchResults();
                }
                else {
                    this.responseLoading = false;
                }
			})
	}

	findSearchResults() {
        this.postsData = [];
        this.responseLoading = true;
        this.searchQuery = this.searchQuery.trim();
        this.searchQuery = this.searchQuery.toLowerCase();
		if(this.searchQuery.length >= 3) {
            this.searchQueryTooShort = false;
            for (let postData in this.blogPostsObject) {
                let postObject = this.blogPostsObject[postData];
                if(postObject['post-text-content'] &&
                  ((postObject['post-text-content']).toLowerCase().indexOf(this.searchQuery) > -1 ||
                   (postObject['post-title']).toLowerCase().indexOf(this.searchQuery) > -1)) {
                    let searchIndex = (postObject['post-text-content']).toLowerCase().indexOf(this.searchQuery)
                    postObject['search-result-snippet'] = this.getSearchSnippet(postObject['post-text-content'], searchIndex);
                    postObject['search-result-snippet'] = this.getHighlightedSnippet(postObject['search-result-snippet'])
                    postObject["post-link"] = postData;
                    postObject["post-categories"] = postObject["post-category-list"].split(";");
                    this.postsData.push(postObject);
                }
            }
            this.submittedOnce = true;
        }
        else {
            this.searchQueryTooShort = true;
        }

        this.resultsFound = (this.postsData.length > 0);
        this.responseLoading = false;
        this.routeToResultPage();
    }

    getSearchSnippet(postContent, searchIndex) {
        return postContent.substring(searchIndex - 200, searchIndex + 200);
    }

    getHighlightedSnippet(searchSnippet) {
        let expression = new RegExp(this.searchQuery, 'gi');
        return searchSnippet.replace(expression, "<span class='search-snippet-highlight'>" + this.searchQuery.toUpperCase() + "</span>");
    }
    
    getSearchQuery() {
		return this.getParam("query") || "";
    }
    
    getParam(paramName) {
		return this.route.snapshot.paramMap.get(paramName);
	}

	routeToResultPage() {
		window.scroll(0, 0);
		this.router.navigate(["search/" + this.searchQuery]);
	}
}