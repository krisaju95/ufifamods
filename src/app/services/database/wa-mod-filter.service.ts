import { Injectable } from '@angular/core';
import { WABlogPost } from '../../interfaces/blog-post.interface';
import { WADBService } from './wa-db.service';
import { WAFIFADBService } from './wa-fifa-db.service';
import { FIFADBPlayer } from 'src/app/interfaces';

export interface WASearchFilterConfig {
    game: string;
    league?: number;
    club?: number;
    player?: string;
    nationality?: number;
    searchKey?: string;
}

@Injectable()
export class WAModFilterService {

    constructor(
        private WADBService: WADBService,
        private WAFIFADBService: WAFIFADBService
    ) { }

    filterMods(filterConfig: WASearchFilterConfig): WABlogPost[] {
        let searchSet: WABlogPost[] = this.WADBService.filterPostsData(filterConfig.game + "-mods");
        let filteredPosts: WABlogPost[] = searchSet;

        if (filterConfig.player) {
            filteredPosts = [];
            searchSet.forEach((post: WABlogPost) => {
                if (post.starheads && (post.starheads.indexOf(filterConfig.player) > -1)) {
                    filteredPosts.push(post);
                }
            });
            return filteredPosts;
        }

        if (filterConfig.nationality) {
            filteredPosts = [];
            searchSet.forEach((post: WABlogPost) => {
                if (post.starheads) {
                    post.starheads.some((starhead: string) => {
                        const starheadData: FIFADBPlayer = this.WAFIFADBService.fifaDBPlayers[starhead];
                        if (starheadData && (starheadData.nationality.id == filterConfig.nationality)) {
                            filteredPosts.push(post);
                            return true;
                        }
                        return false;
                    });
                }
            });
            searchSet = filteredPosts;
        }
        
        if (filterConfig.club) {
            filteredPosts = [];
            searchSet.forEach((post: WABlogPost) => {
                if (post.starheads) {
                    post.starheads.some((starhead: string) => {
                        const starheadData: FIFADBPlayer = this.WAFIFADBService.fifaDBPlayers[starhead];
                        if (starheadData && (starheadData.club.id == filterConfig.club)) {
                            filteredPosts.push(post);
                            return true;
                        }
                        return false;
                    });
                }
            });
            searchSet = filteredPosts;
        }
        
        if (filterConfig.league) {
            filteredPosts = [];
            searchSet.forEach((post: WABlogPost) => {
                if (post.starheads) {
                    post.starheads.some((starhead: string) => {
                        const starheadData: FIFADBPlayer = this.WAFIFADBService.fifaDBPlayers[starhead];
                        if (starheadData && (starheadData.league.id == filterConfig.league)) {
                            filteredPosts.push(post);
                            return true;
                        }
                        return false;
                    });
                }
            });
        }

        return filteredPosts;
    }
}