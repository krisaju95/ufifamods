import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WADBService } from '../../../services/database/wa-db.service';
import { WALoaderService } from '../../../services/loader/wa-loader.service';
import { IconDefinition, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

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

    title: string = '';

    date: string = '';

    author: string = '';

    intro: string = '';

    imageURL: string = '';

    postMainTextArray: Array<string> = [];

    hasModDownloadLink: boolean = false;

    downloadURL: string = '';

    faTwitter: IconDefinition = faTwitter;

    faGlobe: IconDefinition = faGlobe;

    constructor(
        private WADBService: WADBService,
        private WALoaderService: WALoaderService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.postURL = this.getPostURL();
        const pageLoadingStateChange = this.WALoaderService.pageLoadingStateChange.subscribe((state: boolean) => {
            if (!state) {
                this.fileURL = this.getFileURL(this.WADBService.getBlogData());
                this.WADBService.getSinglePost(this.getParam('year') + '/' + this.getParam('month') + '/' + this.fileURL).subscribe((post: any) => {
                    this.loading = false;
                    this.setPostData(post);
                    pageLoadingStateChange.unsubscribe();
                });
            }
        })
    }

    setPostData(post: any) {
        this.title = post['post-title'] || '';
        this.date = post['post-date'] || '';
        this.author = post['post-author'] || 'krisaju95';
        this.intro = post['post-intro-text'] || '';
        this.imageURL = post['post-image'] || '';
        this.postMainTextArray = post['post-main-text-array'] || [];
        this.hasModDownloadLink = (post['show-mod-disclaimer'] == true || post['show-mod-disclaimer'] == 'true');
        this.downloadURL = post['mod-download-link'];
        if (this.intro && this.postMainTextArray.length == 0) {
            this.postMainTextArray = [this.intro];
            this.intro = '';
        }
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

    download() {
        window.open(this.downloadURL, '_blank');
    }
}