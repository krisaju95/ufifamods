export interface FIFADBPlayer {
    id: number;
    name: FIFADBPlayerName;
    rating: FIFADBPlayerRating;
    position: string;
    isScanned: boolean;
    nationality: FIFADBPlayerNationality;
    club: FIFADBPlayerClub;
    league: FIFADBPlayerLeague;
    image: string;
}

export interface FIFADBPlayerName {
    firstName: string;
    lastName: string;
    fullName: string;
    jerseyName: string;
    commonName: string;
    searchName: string;
}

export interface FIFADBPlayerRating {
    base: number;
    potential: number;
}

export interface FIFADBPlayerNationality {
    id: number;
    name: string;
    image: string;
}

export interface FIFADBPlayerClub {
    id: number;
    name: string;
    image: string;
    color: string;
}

export interface FIFADBPlayerLeague {
    id: number;
    name: string;
    image: string;
}

export interface FIFADBPlayerTuple {
    playerid: string;
    firstnameid: string;
    lastnameid: string;
    playerjerseynameid: string;
    commonnameid: string;
    potential: string;
    position: string;
    headclasscode: string;
    nationality: string;
    overallrating: string;
}

export interface FIFADBPlayerNamesTuple {
    nameid: string;
    name: string;
}

export interface FIFADBTeamsTuple {
    teamid: string;
    teamname: string;
    teamcolor1r: string;
    teamcolor1g: string;
    teamcolor1b: string;
}

export interface FIFADBTeamPlayerLinksTuple {
    teamid: string;
    playerid: string;
}

export interface FIFADBLeaguesTuple {
    leagueid: string;
    leaguename: string;
    countryid: string;
    ignore?: boolean;
}

export interface FIFADBLeagueTeamLinksTuple {
    leagueid: string;
    teamid: string;
}

export interface FIFADBNationsTuple {
    nationid: string;
    isocountrycode: string;
    nationname: string;
}

export const FIFADBTuple: any = {
    playerid: "playerid",
    firstnameid: "firstnameid",
    lastnameid: "lastnameid",
    playerjerseynameid: "playerjerseynameid",
    commonnameid: "commonnameid",
    potential: "potential",
    position: "position",
    headclasscode: "headclasscode",
    nationality: "nationality",
    overallrating: "overallrating",
    nameid: "nameid",
    name: "name",
    teamid: "teamid",
    teamname: "teamname",
    leagueid: "leagueid",
    leaguename: "leaguename",
    ignore: "ignore",
    countryid: "countryid",
    nationid: "nationid",
    isocountrycode: "isocountrycode",
    nationname: "nationname",
    teamcolor1r: "teamcolor1r",
    teamcolor1g: "teamcolor1g",
    teamcolor1b: "teamcolor1b"
}

export const FIFADBPositionMap: any = {
    0: "GK",
    2: "RWB",
    3: "RB",
    4: "RCB",
    5: "CB",
    6: "LCB",
    7: "LB",
    8: "LWB",
    10: "CDM",
    12: "RM",
    14: "CM",
    16: "LM",
    18: "CAM",
    21: "CF",
    23: "RW",
    25: "ST",
    27: "LW"
}