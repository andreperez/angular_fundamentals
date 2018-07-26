import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GitSearch } from './git-search';
import { GitUsers } from './git-users';

@Injectable({
    providedIn: 'root'
})
export class GitSearchService {

    cachedValues: Array<{
        [query: string]: GitSearch
    }> = [];

    constructor(private http: HttpClient) {
    }

    gitSearch = (query: string, page: number): Promise<GitSearch> => {
        const promise = new Promise<GitSearch>((resolve, reject) => {
            if (this.cachedValues[query]) {
                resolve(this.cachedValues[query]);
            } else {
                this.http.get(`https://api.github.com/search/repositories?q=${query}&page=${page}`)
                    .toPromise()
                    .then((response) => {
                        resolve(response as GitSearch);
                    }, (error) => {
                        reject(error);
                    });
            }
        });
        return promise;
    }

    gitSearchUsers = (query: string): Promise<GitUsers> => {
        const promise = new Promise<GitUsers>((resolve, reject) => {
            if (this.cachedValues[query]) {
                resolve(this.cachedValues[query]);
            } else {
                this.http.get('https://api.github.com/search/users?q=' + query)
                    .toPromise()
                    .then((response) => {
                        resolve(response as GitUsers);
                    }, (error) => {
                        reject(error);
                    });
            }
        });
        return promise;
    }

}
