import { Injectable } from '@angular/core';
import { WALoaderService } from '../loader/wa-loader.service';
import { Airtable, Base } from 'ngx-airtable';
import { WABlogPost } from '../../interfaces/blog-post.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class WADBService {

    blogData: object = {};

    blogPostsList: Array<any> = [];

    constructor(
        private airtable: Airtable,
        private WALoaderService: WALoaderService
    ) { }

    loadBlogData(pageSize: number = 20): void {
        const table: Subscription = this.getBlogPage(pageSize, "firstPage").subscribe((data) => {
            this.blogPostsList = this.createBlogPostList(data);
            this.WALoaderService.togglePageLoadingState(false);
            table.unsubscribe();
        });
    }

    getBlogPage(pageSize: number, retrieveMethod: string) {
        const base: Base = this.airtable.base('appGpn6FEIJsIQem3');
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
            date: post['Date'],
            thumbnail: post['Thumbnail'],
            category: post['Primary Category'],
            tags: post['Categories'],
            description: post['Brief Description'],
            body: post['Post Body'],
            author: post['Author'],
            contributors: post['Contributors'],
            downloadLink: post['Download Link'],
            linkType: post['Link Type'],
            starheads: post['Custom Star-head(s)'],
            screenshots: post['Screenshots']
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

    filterPostsData(blogPosts: Array<any>, category: string, numberOfPosts: number, route: ActivatedRoute): Array<any> {
        const filteredPostsData: Array<any> = [];
        const activePostURL: string = this.getActivePostURL(route);
        blogPosts.some((post: WABlogPost) => {
            if (activePostURL != post.url) {
                switch (category) {
                    case 'featured': {
                        if (post.featured) {
                            filteredPostsData.push(post);
                        }
                        break;
                    }
                }
            }
            return (filteredPostsData.length == numberOfPosts);
        });
        return filteredPostsData;
    }

    getSinglePost(url: string) {
        const base: Base = this.airtable.base('appGpn6FEIJsIQem3');
        return base.table({ tableId: "tblOmzCatsiKekwAX" }).select({
            pageSize: 1,
            filterByFormula: ("url=" + url)
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