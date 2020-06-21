import { Injectable } from '@angular/core';
// import { WALoaderService } from '../loader/wa-loader.service';
import { WABlogPost } from '../../interfaces/blog-post.interface';
// import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

@Injectable()
export class WADBService {

    blogData: object = {};

    blogPostsList: Array<any> = [];

    // constructor(
    //     private WALoaderService: WALoaderService,
    //     private http: HttpClient
    // ) { }

    loadBlogData(pageSize: number = 20): void {
        // const table: Subscription = this.getBlogPage(pageSize, "firstPage").subscribe((data) => {
        //     this.blogPostsList = this.createBlogPostList(data);
        //     this.WALoaderService.togglePageLoadingState(false);
        //     table.unsubscribe();
        // });

        // this.http.get("https://docs.google.com/spreadsheets/d/1WXxmCBfEJt058umbg7LXy2bbINSTRbjKm5XH4wCyKis/gviz/tq?tqx=out:json&sheet=playerNames", { responseType: 'text'}).subscribe((response: any) => {
        //     response = (response || "").split('setResponse(')[1] || "";
        //     response = response.replace(");", "");
        //     response = JSON.parse(response);
        //     response = response.table;
        //     const blogData: Array<any> = [];
        //     const columns: Array<string> = [];
        //     (<Array<any>>(response.cols)).forEach((col: any) => {
        //         columns.push(col.id);
        //     });
        //     (<Array<any>>(response.rows)).forEach((row: any, rowIndex) => {
        //         columns.push(col.id);
        //     });
        //     console.log(JSON.parse(response));
        // });
    }

    getBlogPage(pageSize: number, retrieveMethod: string) {
        let base: any;//: Base = this.airtable.base('appGpn6FEIJsIQem3');
        return base.table({ tableId: "tblOmzCatsiKekwAX" }).select({
            pageSize: pageSize,
            sort: [{
                field: 'Date',
                direction: 'desc'
            }]
        })[retrieveMethod]();
    }

    createBlogPostList(records: any): WABlogPost[] {
        const blogPostList: WABlogPost[] = [];
        for (let record of records) {
            const blogPost: WABlogPost = this.createBlogPost(record);
            blogPostList.push(blogPost);
        }
        return blogPostList;
    }

    createBlogPost(record: any): WABlogPost {
        const post: any = record['fields'];
        return {
            id: record['id'],
            public: post['Public'] != false,
            featured: post['Featured'],
            url: post['URL'],
            title: post['Title'],
            shortTitle: post['Short Title'],
            date: post['Date'],
            thumbnail: post['Thumbnail'],
            postPageThumbnail: post['Post Page Thumbnail'],
            category: post['Primary Category'],
            tags: post['Categories'],
            description: post['Brief Description'],
            body: post['Post Body'],
            author: post['Author'],
            contributors: post['Contributors'],
            downloadLink: post['Download Link'],
            linkType: post['Link Type'],
            starheads: post['Custom Star-head(s)'],
            screenshots: post['Screenshots'],
            video: post['Video']
        };
    }

    getBlogData(): object {
        return this.blogData;
    }

    getBlogPostsList(): Array<any> {
        return this.blogPostsList;
    }

    createBlogPostsArray(blogPostsObject: object): Array<any> {
        const blogPostsArray: Array<any> = [];
        for (let blogPost in blogPostsObject) {
            let postObject: object = blogPostsObject[blogPost];
            postObject["post-link"] = blogPost;
            blogPostsArray.push(postObject);
        }
        return blogPostsArray;
    }

    filterPostsData(blogPosts: Array<any>, category: string, numberOfPosts?: number, route?: ActivatedRoute): Array<any> {
        const filteredPostsData: Array<any> = [];
        const activePostURL: string = location.href.includes("/blog/") ? this.getActivePostURL(route) : "";
        blogPosts.some((post: WABlogPost) => {
            if (activePostURL != post.url) {
                switch (category) {
                    case 'featured': {
                        if (post.featured) {
                            filteredPostsData.push(post);
                        }
                        break;
                    }
                    case 'fifa-20-mods': {
                        if (post.tags.includes("mods") && post.tags.includes("fifa 20")) {
                            filteredPostsData.push(post);
                        }
                    }
                    case 'fifa-16-mods': {
                        if (post.tags.includes("mods") && post.tags.includes("fifa 16")) {
                            filteredPostsData.push(post);
                        }
                    }
                    case 'all': {
                        filteredPostsData.push(post);
                        break;
                    }
                    default: {
                        if (post.tags.indexOf(category) > -1) {
                            filteredPostsData.push(post);
                        }
                    }
                }
            }
            return numberOfPosts && (filteredPostsData.length == numberOfPosts);
        });
        return filteredPostsData;
    }

    getSinglePost(url: string) {
        let base: any; //Base = this.airtable.base('appGpn6FEIJsIQem3');
        return base.table({ tableId: "tblOmzCatsiKekwAX" }).select({
            pageSize: 1,
            filterByFormula: "URL='" + url + "'"
        }).firstPage().map((posts: Array<any>) => {
            return posts.map((post: any) => {
                return this.createBlogPost(post);
            })
        });
    }

    getActivePostURL(route?: ActivatedRoute) {
        return "/blog/post/" + this.getParam("year", route) + '/' + this.getParam("month", route) + '/' + this.getParam("day", route) + '/' + this.getParam("title", route);
    }

    getParam(paramName: string, route: ActivatedRoute) {
        return route.snapshot.paramMap.get(paramName);
    }
}