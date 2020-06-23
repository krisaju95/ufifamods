import { Component } from '@angular/core';
import { WADBService } from '../../../services/database/wa-db.service';
import { WALoaderService } from '../../../services/loader/wa-loader.service';
import { Router, ActivatedRoute } from '@angular/router';

let paginationTimeoutRef: any;

@Component({
    selector: 'ufm-wa-page-blog',
    templateUrl: './wa-page-blog.component.html',
    styleUrls: ['./wa-page-blog.component.scss']
})
export class WAPageBlogComponent {

    numberOfPosts: number = 9;

    activePageIndex: number = 0;

    loading: boolean = true;

    blogPostList: Array<any> = [];

    pages: Array<any> = [];

    postOffset: number = 0;

    showPagination: boolean = false;

    constructor(
        private WADBService: WADBService,
        private WALoaderService: WALoaderService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        if (this.route.snapshot.params.pageNumber) {
            this.activePageIndex = this.route.snapshot.params.pageNumber - 1;
            const initialLoad = this.WALoaderService.pageLoadingStateChange.subscribe((state: boolean) => {
                if (!state) {
                    this.loadPages();
                    initialLoad.unsubscribe();
                }
            });
        } else {
            this.router.navigate(["/blog/pages/1"]);
        }
    }

    loadPages() {
        this.loading = false;
        this.pages = this.WADBService.getBlogPages()
        this.WALoaderService.togglePageLoadingState(false);
        this.showPagination = true;
    }

    loadPage(pageIndex: number) {
        this.router.navigate(["/blog/pages/" + (pageIndex + 1)]);
        window.scroll(0, 0);
        this.loading = true;
        const pageLoad = this.WALoaderService.pageLoadingStateChange.subscribe((state: boolean) => {
            if (!state) {
                this.loading = false;
                this.activePageIndex = pageIndex;
                pageLoad.unsubscribe();
            }
        });
        this.WALoaderService.togglePageLoadingState(true);
        this.WALoaderService.togglePageLoadingState(false);
    }
}