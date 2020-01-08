import { Component } from '@angular/core';
import { WADBService } from '../../../services/database/wa-db.service';
import { WALoaderService } from '../../../services/loader/wa-loader.service';

@Component({
    selector: 'ufm-wa-page-blog',
    templateUrl: './wa-page-blog.component.html',
    styleUrls: ['./wa-page-blog.component.scss']
})

export class WAPageBlogComponent {

    numberOfPosts: number = 9;

    loading: boolean = true;

    blogPostList: Array<any> = [];

    filteredBlogPosts: Array<any> = [];

    constructor(
        private WADBService: WADBService,
        private WALoaderService: WALoaderService
    ) { }

    ngOnInit() {
        this.WALoaderService.pageLoadingStateChange.subscribe((state: boolean) => {
            if (!state) {
                this.blogPostList = this.WADBService.getBlogPostsList();
                this.loading = false;
            }
        });
    }

    loadMoreResults() {
        this.loading = true;
        this.WALoaderService.togglePageLoadingState(true);
        this.WALoaderService.togglePageLoadingState(false);
        if ((this.blogPostList.length - this.numberOfPosts) >= 9) {
            this.numberOfPosts += 9;
        } else {
            this.numberOfPosts = this.blogPostList.length;
        }
    }
}