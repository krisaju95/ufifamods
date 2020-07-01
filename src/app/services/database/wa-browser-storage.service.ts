import { Injectable } from '@angular/core';

@Injectable()
export class WABrowserStorageService {

    setItem(key: string, item: any, storageType: string = "local") {
        if (typeof item == "object") {
            item = JSON.stringify(item);
        }
        window[storageType + "Storage"][key] = item;
    }

    getItem(key: string, storageType: string = "local", itemType: string = "object") {
        let item: any = window[storageType + "Storage"][key];
        if (item && itemType == "object") {
            item = JSON.parse(item);
        }
        return item;
    }
}