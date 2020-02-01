import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WADBService } from '../../../services/database/wa-db.service';
import { WALoaderService } from '../../../services/loader/wa-loader.service';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';
import { WABlogPost } from 'src/app/interfaces/blog-post.interface';

@Component({
    selector: 'ufm-wa-blog-post',
    templateUrl: './wa-blog-post.component.html',
    styleUrls: ['./wa-blog-post.component.scss']
})

export class WABlogPostComponent {

    siteURL: string = "http://ufifamods.com/";

    loading: boolean = true;

    post: WABlogPost = ({} as WABlogPost);

    fileURL: string = "";

    faCloudDownloadAlt: IconDefinition = faCloudDownloadAlt;

    constructor(
        private WADBService: WADBService,
        private WALoaderService: WALoaderService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const pageLoadingStateChange = this.WALoaderService.pageLoadingStateChange.subscribe((state: boolean) => {
            if (!state) {
                this.fileURL = this.getFileURL();
                this.WADBService.getSinglePost(this.fileURL).subscribe((posts: WABlogPost[]) => {
                    if (posts && posts[0]) {
                        this.loading = false;
                        this.post = posts[0] || ({} as WABlogPost);
                        pageLoadingStateChange.unsubscribe();
                    }
                });
            }
        })
    }

    getFileURL() {
        return "/blog/post/" + this.getParam("year") + '/' + this.getParam("month") + '/' + this.getParam("day") + '/' + this.getParam("title");
    }

    getParam(paramName) {
        return this.route.snapshot.paramMap.get(paramName);
    }

    download(downloadLink: string) {
        window.open(downloadLink, "blank");
    }
}