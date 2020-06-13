import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WADBService } from '../../../services/database/wa-db.service';
import { WALoaderService } from '../../../services/loader/wa-loader.service';
import { WABlogPost } from 'src/app/interfaces/blog-post.interface';

@Component({
    selector: 'ufm-wa-blog-post',
    templateUrl: './wa-blog-post.component.html',
    styleUrls: ['./wa-blog-post.component.scss']
})

export class WABlogPostComponent {

    siteURL: string = "http://ufifamods.com/";

    loadingTimeoutRef: any;

    loading: boolean = true;

    post: WABlogPost = ({} as WABlogPost);

    fileURL: string = "";

    constructor(
        private WADBService: WADBService,
        private WALoaderService: WALoaderService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.fileURL = this.WADBService.getActivePostURL(this.route);
        this.loadPost(this.fileURL);
    }

    loadPost(url: string) {
        this.toggleLoadingState(true);
        this.fileURL = url;
        const pageLoadingStateChange = this.WALoaderService.pageLoadingStateChange.subscribe((state: boolean) => {
            if (!state) {
                this.WADBService.getSinglePost(this.fileURL).subscribe((posts: WABlogPost[]) => {
                    if (posts && posts[0]) {
                        this.toggleLoadingState(false);
                        this.WALoaderService.togglePageLoadingState(false);
                        this.post = posts[0] || ({} as WABlogPost);
                        pageLoadingStateChange.unsubscribe();
                    }
                });
            }
        })
    }

    toggleLoadingState(state: boolean): void {
        if (this.loadingTimeoutRef || state) {
            clearTimeout(this.loadingTimeoutRef);
            this.loadingTimeoutRef = false;
            this.loading = true;
        } else {
            this.loadingTimeoutRef = setTimeout(() => {
                this.loading = false;
            }, 500);
        }
    }

    download(downloadLink: string) {
        window.open(downloadLink, "blank");
    }
}