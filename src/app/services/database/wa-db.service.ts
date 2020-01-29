import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WALoaderService } from '../loader/wa-loader.service';
import { Airtable, Base } from 'ngx-airtable';
import { WABlogPost } from '../../interfaces/blog-post.interface';
import { Subscription } from 'rxjs';

@Injectable()
export class WADBService {

    blogData: object = {};

    blogPostsList: Array<any> = [];

    constructor(
        private http: HttpClient,
        private airtable: Airtable,
        private WALoaderService: WALoaderService
    ) { }

    loadBlogData(): void {
        const base: Base = this.airtable.base('appGpn6FEIJsIQem3');
        const table: Subscription = base.table({ tableId: "tblOmzCatsiKekwAX" }).select({
            pageSize: 20,
            sort: [{
                field: 'Date',
                direction: 'desc'
            }]
        }).firstPage().subscribe((data) => {
            this.blogPostsList = this.createBlogPostList(data);
            this.WALoaderService.togglePageLoadingState(false);
            table.unsubscribe();
        });
    }

    createBlogPostList(records: any): WABlogPost[] {
        const blogPostList: WABlogPost[] = [];
        for (let record of records) {
            const post: any = record['fields'];
            const blogPost: WABlogPost = {
                public: post['Public'],
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
                downloadink: post['Download Link'],
                starheads: post['Custom Star-head(s)']
            };
            blogPostList.push(blogPost);
        }
        return blogPostList;
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

    filterPostsData(blogPosts: Array<any>, category: string, numberOfPosts: number): Array<any> {
        const filteredPostsData: Array<any> = [];
        const featuredPostsData: Array<any> = [];
        blogPosts.some((blogPost: any) => {
            if (blogPost['featured']) {
                featuredPostsData.push(blogPost);
            }
            switch (category) {
                case 'featured': {
                    if (blogPost['featured']) {
                        filteredPostsData.push(blogPost);
                    }
                    break;
                }
                case 'featured|!first': {
                    if (featuredPostsData.length > 1 && blogPost['featured']) {
                        filteredPostsData.push(blogPost);
                    }
                    break;
                }
                case '!featured': {
                    if (!blogPost['featured'] || featuredPostsData.length > 4) {
                        filteredPostsData.push(blogPost);
                    }
                    break;
                }
                default: {
                    let categoriesList: Array<string> = [];
                    if (typeof blogPost['post-category-list'] == 'string') {
                        categoriesList = (blogPost["post-category-list"].toLowerCase()).split(";");
                    } else {
                        categoriesList = blogPost["post-category-list"];
                    }
                    if (categoriesList.indexOf(category.toLowerCase()) > -1) {
                        filteredPostsData.push(blogPost);
                    }
                }
            }
            return (filteredPostsData.length == numberOfPosts);
        });
        return filteredPostsData;
    }

    getSinglePost(url: string) {
        return this.http.get('/assets/db/blog-posts/' + url);
    }
}