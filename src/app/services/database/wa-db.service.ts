import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WALoaderService } from '../loader/wa-loader.service';

@Injectable()
export class WADBService {

    blogData: object = {};

    blogPostsList: Array<any> = [];

    constructor(
        private http: HttpClient,
        private WALoaderService: WALoaderService
    ) { }

    loadBlogData(): void {
        const requestHeaders: HttpHeaders = new HttpHeaders();
        requestHeaders.append('pragma', 'no-cache');
        requestHeaders.append('cache-control', 'no-cache');
        this.WALoaderService.togglePageLoadingState(true);
        this.http.get("/assets/db/blog-posts-list", { headers: requestHeaders }).subscribe((data: Response) => {
            this.blogData = data;
            this.blogPostsList = this.createBlogPostsArray(data);
            this.WALoaderService.togglePageLoadingState(false);
        }, (error: Response) => {
            console.log(error);
        });

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
            if (blogPost['is-featured']) {
                featuredPostsData.push(blogPost);
            }
            switch (category) {
                case 'featured': {
                    if (blogPost['is-featured']) {
                        filteredPostsData.push(blogPost);
                    }
                    break;
                }
                case 'featured|!first': {
                    if (featuredPostsData.length > 1 && blogPost['is-featured']) {
                        filteredPostsData.push(blogPost);
                    }
                    break;
                }
                case '!featured': {
                    if (!blogPost['is-featured'] || featuredPostsData.length > 4) {
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
}