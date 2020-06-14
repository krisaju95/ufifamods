import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WAFIFADBService {

    players: Array<any> = [];

    playerNames: Array<any> = [];

    leagueTeamLinks: Array<any> = [];

    constructor(
        private http: HttpClient
    ) {
        this.fetchData();
    }

    fetchData() {
        this.http.get("/assets/db/fifa/players.json", { responseType: 'json' }).subscribe((response: Array<any>) => {
            this.players = response;
            this.http.get("/assets/db/fifa/playerNames.json", { responseType: 'json' }).subscribe((response: Array<any>) => {
                this.playerNames = response;
                this.http.get("/assets/db/fifa/leagueTeamLinks.json", { responseType: 'json' }).subscribe((response: Array<any>) => {
                    this.leagueTeamLinks = response;
                });
            });
        });
    }
}