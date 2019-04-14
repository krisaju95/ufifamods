import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtilitiesService } from '../../../services/utilities.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'search-posts-dialog',
    template: ``
})

export class SearchPostsDialogComponent {

    constructor(
        public dialog: MatDialog
    ) { }

    @Output() dialogClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngOnInit() {
        this.openDialog();
    }

    openDialog() {
        Promise.resolve().then(() => {
            let dialogRef = this.dialog.open(SearchPostsDialog, {
                data: {},
                maxWidth: '500px',
                panelClass: 'wwt-mat-dialog'
            });
            dialogRef.afterClosed().subscribe(() => {
                this.dialogClosed.emit();
            });
        })
    }
}

@Component({
    selector: 'search-posts',
    templateUrl: './search.posts.component.html',
    styleUrls: ['./search.posts.component.scss']
})

export class SearchPostsDialog {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialogRef<SearchPostsDialog>,
        private route: ActivatedRoute,
        private http: HttpClient,
        private service: UtilitiesService
    ) { }

    responseLoading: boolean = true;
    postsData: Array<object> = [];
    searchQuery: string = "";
    blogPostsObject: Object;
    resultsFound: boolean = false;
    searchQueryTooShort: boolean = false;
    submittedOnce: boolean = false

    ngOnInit() {
        this.http.get(this.service.getCSLP() + "/blog-posts-list")
            .subscribe((data) => {
                this.blogPostsObject = data;
                if (this.searchQuery) {
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
        if (this.searchQuery.length >= 3) {
            this.searchQueryTooShort = false;
            for (let postData in this.blogPostsObject) {
                let postObject = this.blogPostsObject[postData];
                if (postObject['post-text-content'] &&
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
    }

    getSearchSnippet(postContent, searchIndex) {
        return postContent.substring(searchIndex - 200, searchIndex + 200);
    }

    getHighlightedSnippet(searchSnippet) {
        let expression = new RegExp(this.searchQuery, 'gi');
        return searchSnippet.replace(expression, "<span class='search-snippet-highlight'>" + this.searchQuery.toUpperCase() + "</span>");
    }

    getParam(paramName) {
        return this.route.snapshot.paramMap.get(paramName);
    }

    closeDialog() {
        this.dialog.close();
    }
}