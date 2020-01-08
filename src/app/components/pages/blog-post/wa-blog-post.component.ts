import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WADBService } from '../../../services/database/wa-db.service';
import { WALoaderService } from '../../../services/loader/wa-loader.service';

@Component({
    selector: 'ufm-wa-blog-post',
    templateUrl: './wa-blog-post.component.html',
    styleUrls: ['./wa-blog-post.component.scss']
})

export class WABlogPostComponent {

    loading: boolean = true;
    siteURL: string = "";
    postURL: string = "";
    postMap: Array<object>;
    fileURL: string = "";
    postData: object = {};
    postMainTextArray: Array<string> = [];
    contributorsList: Array<string>;
    facesIncludedList: Array<string>;
    screenshotsList: Array<string>;
    futSquadInfo: object = {}
    showModDisclaimer: boolean = false;
    downloadText: string = "Download";
    categoryList: Array<string> = [];

    constructor(
        private WADBService: WADBService,
        private WALoaderService: WALoaderService,
        private route: ActivatedRoute,
        private http: HttpClient,
    ) { }

    ngOnInit() {
        this.postURL = this.getPostURL();
        const pageLoadingStateChange = this.WALoaderService.pageLoadingStateChange.subscribe((state: boolean) => {
            if (!state) {
                this.fileURL = this.getFileURL(this.WADBService.getBlogData());
                this.WADBService.getSinglePost(this.getParam('year') + '/' + this.getParam('month') + '/' + this.fileURL).subscribe((post: any) => {
                    this.postData = post;
                    this.postMainTextArray = this.postData['post-main-text-array'] || [];
                    this.contributorsList = this.postData['contributors-list'];
                    this.facesIncludedList = this.postData['faces-included-list'];
                    this.screenshotsList = this.postData['screenshots-list'];
                    this.futSquadInfo = this.postData['fut-squad'];
                    this.loading = false;
                    pageLoadingStateChange.unsubscribe();
                });
            }
        })
    }

    initialiseData(postURL: string) {
        this.postURL = postURL;
        this.loading = true;
        this.getPostData();
    }

    getPostData() {
        let startTime = new Date().getTime();
        this.http.get('/assets/db/blog-posts-list')
            .subscribe((data) => {
                this.fileURL = this.getFileURL(data);
                this.http.get('/assets/db/blog-posts/' + this.getParam('year') + '/' + this.getParam('month') + '/' + this.fileURL)
                    .subscribe((postData) => {
                        let timeDiff = new Date().getTime() - startTime;
                        if (timeDiff < 1500) {
                            setTimeout(() => {
                                this.loading = false;
                                this.postData = postData;
                                this.postMainTextArray = this.postData['post-main-text-array'] || [];
                                this.contributorsList = this.postData['contributors-list'];
                                this.facesIncludedList = this.postData['faces-included-list'];
                                this.screenshotsList = this.postData['screenshots-list'];
                                this.futSquadInfo = this.postData['fut-squad'];
                                this.showModDisclaimer = (this.postData['show-mod-disclaimer'] == true || this.postData['show-mod-disclaimer'] == 'true')
                                this.getPostCategories();
                                window.scroll(0, 0);
                            }, 1500 - timeDiff);
                        } else {
                            this.loading = false;
                        }
                    });
            });
    }

    getPostURL() {
        let postParameters = [this.getParam("year"), this.getParam("month"), this.getParam("date"), this.getParam("title")]
        return "/blog/post/" + postParameters.join("/");
    }

    getFileURL(data) {
        let postObject = data[this.postURL];
        if (postObject) {
            return postObject["post-json-url"];
        }
        return "";
    }

    getParam(paramName) {
        return this.route.snapshot.paramMap.get(paramName);
    }

    getPostCategories() {
        if (typeof this.postData["post-category-list"] == 'string') {
            this.categoryList = this.postData["post-category-list"].split(";");
        } else {
            this.categoryList = this.postData["post-category-list"];
        }
    }
}