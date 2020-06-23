import { Injectable } from '@angular/core';
import { WALoaderService } from '../loader/wa-loader.service';
import { WABlogPost, WABlogPostAttributeMap } from '../../interfaces/blog-post.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable } from 'rxjs';

const numberOfSheets: number = 2;

@Injectable()
export class WADBService {

    blogPostsList: Array<WABlogPost> = [];

    blogPosts$: Array<Observable<WABlogPost[]>> = [];

    constructor(
        private WALoaderService: WALoaderService,
        private googleSheetsDbService: GoogleSheetsDbService
    ) { }

    loadBlogData(): void {
        for (let sheetIndex = 1; sheetIndex <= numberOfSheets; sheetIndex++) {
            this.blogPosts$[sheetIndex] = this.googleSheetsDbService.get<WABlogPost>(
                '1gM7dvuanzHj010o5jlnf8z3BjTWBlYBKYdJkPL5xOLc',
                sheetIndex,
                WABlogPostAttributeMap
            );

            const table: Subscription = this.blogPosts$[sheetIndex].subscribe((data: WABlogPost[]) => {
                this.blogPostsList = Array.prototype.concat(this.blogPostsList, this.createBlogPostList(data));
                table.unsubscribe();

                if (sheetIndex == numberOfSheets) {
                    this.sortBlogPostList();
                    this.WALoaderService.togglePageLoadingState(false);
                }
            });
        }
    }

    sortBlogPostList() {
        this.blogPostsList = this.blogPostsList.sort((a: any, b: any) => b.date - a.date);
    }

    getBlogPages() {
        const pages: Array<Array<WABlogPost>> = [];
        let i: number, j: number, pageSize: number = 12;
        for (i = 0, j = this.blogPostsList.length; i < j; i += pageSize) {
            pages.push(this.blogPostsList.slice(i, i + pageSize));
        }
        return pages;
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
        const post: any = record;
        post.date = new Date(post.date);
        this.formatBlogPostArrayAttributes(post);
        this.generateBlogPostURL(post);
        return post;
    }

    formatBlogPostArrayAttributes(post: WABlogPost): void {
        const delimiter: string = "!!!";
        const attributes: Array<string> = ["starheads", "tags", "screenshots", "contributors"];
        attributes.forEach((attribute: string) => {
            let attributeValue: string = post[attribute];
            if (attributeValue) {
                let attributeList: Array<any> = [];
                attributeValue = attributeValue.replace(/\n/g, delimiter);
                attributeValue = attributeValue.replace(/, /g, delimiter);
                attributeValue = attributeValue.replace(/,/g, delimiter);
                attributeList = attributeValue.split(delimiter);
                post[attribute] = attributeList;
            }
        })
    }

    generateBlogPostURL(post: WABlogPost): void {
        const date: Date = new Date(post.date);
        post.url =
            "/blog/post/" +
            date.getFullYear() + "/" +
            (date.getMonth() + 1) + "/" +
            date.getDate() + "/" +
            this.getBlogPostURLTitle(post);
    }

    getBlogPostURLTitle(post: WABlogPost): string {
        let title: string = post.title;
        let titleParts: string[] = [];
        title = title.replace(/[^\w\s]/gi, ' ');
        title = title.toLowerCase();
        titleParts = title.split(' ');
        titleParts = titleParts.filter((value: string) => !!value);
        return titleParts.join('-');
    }

    getBlogPostsList(): Array<any> {
        return this.blogPostsList;
    }

    filterPostsData(category: string, numberOfPosts?: number, route?: ActivatedRoute): Array<any> {
        const filteredPostsData: Array<any> = [];
        const activePostURL: string = location.href.includes("/blog/") ? this.getActivePostURL(route) : "";
        this.blogPostsList.some((post: WABlogPost) => {
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

    getSingleBlogPostPost(url: string) {
        for (let post of this.blogPostsList) {
            if (post.url == url) {
                return {
                    exists: true,
                    data: post
                };
            }
        }

        return {
            exists: false,
            data: {}
        }
    }

    getActivePostURL(route?: ActivatedRoute) {
        return "/blog/post/" + this.getParam("year", route) + '/' + this.getParam("month", route) + '/' + this.getParam("day", route) + '/' + this.getParam("title", route);
    }

    getParam(paramName: string, route: ActivatedRoute) {
        return route.snapshot.paramMap.get(paramName);
    }
}