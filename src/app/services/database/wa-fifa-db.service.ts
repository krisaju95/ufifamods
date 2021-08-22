import { Injectable } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable, Subscription } from 'rxjs';
import {
    FIFADBTuple, FIFADBPlayerTuple, FIFADBPlayerNamesTuple, FIFADBTeamsTuple,
    FIFADBTeamPlayerLinksTuple, FIFADBLeaguesTuple, FIFADBLeagueTeamLinksTuple,
    FIFADBNationsTuple, FIFADBPlayer, FIFADBPlayerClub, FIFADBPlayerName,
    FIFADBPlayerRating, FIFADBPlayerNationality, FIFADBPlayerLeague,
    FIFADBPositionMap
} from 'src/app/interfaces';
import { WARootScope } from '../globals/wa-rootscope';

const numberOfSheets: number = 7;

@Injectable()
export class WAFIFADBService {

    sheetsLoaded: number = 0;

    sheetNames: string[] = ["players", "playernames", "teams", "teamplayerlinks", "leagues", "leagueteamlinks", "nations"];

    players: Array<any> = [];

    playersMap: any = {};

    playernames: Array<any> = [];

    playerNamesMap: any = {};

    teams: Array<any> = [];

    teamsMap: any = {};

    teamplayerlinks: Array<any> = [];

    teamPlayerLinksMap: any = {};

    leagues: Array<any> = [];

    leaguesMap: any = {};

    leagueTeamLinks: Array<any> = [];

    leagueTeamLinksMap: any = {};

    nations: Array<any> = [];

    nationsMap: any = {};

    fifaDBData$: Array<Observable<any>> = [];

    fifaDBData: Array<any> = [];

    fifaDBPlayers: any = {};

    constructor(
        private WARootScope: WARootScope,
        private googleSheetsDbService: GoogleSheetsDbService
    ) {
        this.loadFIFADBData();
    }

    loadFIFADBData(): void {
        this.sheetsLoaded = 0;
        this.WARootScope.fifaDBGenerated = false;

        for (let sheetIndex = 0; sheetIndex < numberOfSheets; sheetIndex++) {
            this.fifaDBData$[sheetIndex] = this.googleSheetsDbService.get<any>(
                '1WXxmCBfEJt058umbg7LXy2bbINSTRbjKm5XH4wCyKis',
                this.sheetNames[sheetIndex],
                FIFADBTuple
            );

            const table: Subscription = this.fifaDBData$[sheetIndex].subscribe((data: any[]) => {
                this.fifaDBData[sheetIndex] = data;
                table.unsubscribe();
                this.sheetsLoaded++;
                if (this.sheetsLoaded == numberOfSheets) {
                    this.parseFIFADBData();
                }
            });
        }
    }

    parseFIFADBData() {
        this.generateFIFADBMaps();
        this.generateFIFADB();
        this.WARootScope.fifaDBGenerated = true;
    }

    generateFIFADB() {
        try {
            const players: FIFADBPlayerTuple[] = this.fifaDBData[1];
            players.forEach((playerTuple: FIFADBPlayerTuple) => {
                const club: FIFADBTeamPlayerLinksTuple = this.teamPlayerLinksMap[playerTuple.playerid];
                const player: FIFADBPlayer = {
                    id: parseInt(playerTuple.playerid),
                    name: this.getPlayerName(playerTuple),
                    rating: this.getPlayerRating(playerTuple),
                    position: FIFADBPositionMap[playerTuple.position],
                    isScanned: (playerTuple.headclasscode == "0"),
                    club: this.getPlayerClub(club),
                    nationality: this.getPlayerNationality(playerTuple),
                    league: this.getPlayerLeague(club),
                    image: "https://www.fifaindex.com/static/FIFA20/images/players/10/" + playerTuple.playerid + ".webp"
                    // image: "https://www.fifarosters.com/assets/players/fifa20/faces/" + playerTuple.playerid + ".png"
                };
                this.fifaDBPlayers[playerTuple.playerid] = player;
            });
            this.WARootScope.fifaDBGenerated = true;
        } catch (e) {
            this.WARootScope.fifaDBGenerated = false;
        }
    }

    generateFIFADBMaps() {
        const playerNames: FIFADBPlayerNamesTuple[] = this.fifaDBData[2];
        const teams: FIFADBTeamsTuple[] = this.fifaDBData[3];
        const teamPlayerinks: FIFADBTeamPlayerLinksTuple[] = this.fifaDBData[4];
        this.leagues = this.fifaDBData[5];
        const leagueTeamLinks: FIFADBLeagueTeamLinksTuple[] = this.fifaDBData[6];
        this.nations = this.fifaDBData[7];
        this.playerNamesMap = this.convertArrayToObject(playerNames, "nameid");
        this.teamsMap = this.convertArrayToObject(teams, "teamid");
        this.leaguesMap = this.convertArrayToObject(this.leagues, "leagueid");
        this.leagueTeamLinks = this.getLeagueTeamsMap(leagueTeamLinks);
        this.leagueTeamLinksMap = this.convertArrayToObject(leagueTeamLinks, "teamid");
        this.teamPlayerLinksMap = this.convertArrayToObject(teamPlayerinks, "playerid", "club");
        this.nationsMap = this.convertArrayToObject(this.nations, "nationid");
    }

    getPlayerName(playerTuple: FIFADBPlayerTuple): FIFADBPlayerName {
        const firstName: string = (<FIFADBPlayerNamesTuple>(this.playerNamesMap[playerTuple.firstnameid] || {})).name || "";
        const lastName: string = (<FIFADBPlayerNamesTuple>(this.playerNamesMap[playerTuple.lastnameid] || {})).name || "";
        const fullName: string = (firstName + " " + lastName).trim();
        const commonName: string = (<FIFADBPlayerNamesTuple>(this.playerNamesMap[playerTuple.commonnameid] || {})).name || "";
        const jerseyName: string = (<FIFADBPlayerNamesTuple>(this.playerNamesMap[playerTuple.playerjerseynameid] || {})).name || "";
        return {
            firstName: firstName,
            lastName: lastName,
            fullName: fullName,
            commonName: commonName,
            jerseyName: jerseyName,
            searchName: [fullName, commonName, jerseyName].join(" ").trim()
        }
    }

    getPlayerRating(playerTuple: FIFADBPlayerTuple): FIFADBPlayerRating {
        return {
            base: parseInt(playerTuple.overallrating || ""),
            potential: parseInt(playerTuple.potential || "")
        }
    }

    getPlayerClub(club: FIFADBTeamPlayerLinksTuple): FIFADBPlayerClub {
        const teamID: string = club.teamid;
        const teamData: FIFADBTeamsTuple = this.teamsMap[teamID];
        const colors: any = this.getStarheadCardColors(teamData);
        return {
            id: parseInt(teamID),
            name: teamData.teamname,
            image: "https://www.fifarosters.com/assets/clubs/fifa20/" + teamID + ".png",
            background: colors.background,
            foreground: colors.foreground
        }
    }

    getPlayerNationality(playerTuple: FIFADBPlayerTuple): FIFADBPlayerNationality {
        return {
            id: parseInt(playerTuple.nationality),
            name: (<FIFADBNationsTuple>this.nationsMap[playerTuple.nationality]).nationname || "",
            image: "https://www.fifarosters.com/assets/nations/fifa17/" + playerTuple.nationality + ".png"
        }
    }

    getPlayerLeague(club: FIFADBTeamPlayerLinksTuple): FIFADBPlayerLeague {
        const leagueID: number = parseInt((<FIFADBLeaguesTuple>this.leagueTeamLinksMap[club.teamid]).leagueid);
        const leagueName: string = (<FIFADBLeaguesTuple>this.leaguesMap[leagueID]).leaguename || "";
        const nationID: string = (<FIFADBLeaguesTuple>this.leaguesMap[leagueID]).countryid;
        return {
            id: leagueID,
            name: leagueName.split(" (")[0] || "",
            image: "https://www.fifarosters.com/assets/nations/fifa17/" + nationID + ".png"
        }
    }

    getLeagueTeamsMap(leagueTeamLinks: FIFADBLeagueTeamLinksTuple[]): any {
        const leagueTeamsMap: any = {};
        leagueTeamLinks.forEach((tuple: FIFADBLeagueTeamLinksTuple) => {
            const leagueID: string = tuple.leagueid;
            const team: any = {
                id: tuple.teamid,
                name: this.teamsMap[tuple.teamid] ? (this.teamsMap[tuple.teamid].teamname || "") : "",
                image: "https://www.fifarosters.com/assets/clubs/fifa20/" + tuple.teamid + ".png",
            };
            if (leagueTeamsMap[leagueID]) {
                leagueTeamsMap[leagueID].push(team);
            } else {
                leagueTeamsMap[leagueID] = [team];
            }
        });
        return leagueTeamsMap;
    }

    convertArrayToObject(array: Array<any>, key: string, sortObjectInfo?: string): any {
        const map: any = {};
        (array || []).forEach((item: any) => {
            if (
                sortObjectInfo == 'club' &&
                (
                    (<FIFADBLeagueTeamLinksTuple>this.leagueTeamLinksMap[item.teamid]).leagueid == "78"
                    || (item.teamid == "112190")
                )
            ) {
                return;
            } else {
                map[item[key]] = item;
            }
        });
        return map;
    };

    getStarheadCardColors(teamData: FIFADBTeamsTuple): any {
        let foreground: string = "";
        const background: string = "rgb(" + teamData.teamcolor1r + ", " + teamData.teamcolor1g + ", " + teamData.teamcolor1b + ")";
        const r: number = parseInt(teamData.teamcolor1r);
        const g: number = parseInt(teamData.teamcolor1g);
        const b: number = parseInt(teamData.teamcolor1b);
        const hsp = Math.sqrt(
            0.299 * (r * r) +
            0.587 * (g * g) +
            0.114 * (b * b)
        );
        if (hsp > 127.5) {
            foreground = "#2A2A2A"
        } else {
            foreground = "#F5F5F5"
        }
        return {
            background: background,
            foreground: foreground
        }
    }
}