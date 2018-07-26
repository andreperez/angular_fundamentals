import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { GitSearchService } from "../git-search.service";
import { GitSearch } from "../git-search";
import { combineLatest } from '../../../node_modules/rxjs';

@Component({
    selector: 'app-git-search',
    templateUrl: './git-search.component.html',
    styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {

    searchResults: GitSearch;
    searchQuery: string;
    title: string;
    displayQuery: string;
    page: number;

    constructor(
        private gitSearchService: GitSearchService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {

        const combined = combineLatest(this.route.params, this.route.queryParams, this.route.data);

        combined.subscribe(([params, queryParams, data]) => {
            console.log(params);
            console.log(queryParams);
            console.log(data);

            this.searchQuery = params.query;
            this.displayQuery = params.query;
            this.page = (queryParams.page == null ? 1 : parseInt(queryParams.page));
            this.title = data.title;

            return this.gitSearch();
        });

    }

    gitSearch = () => {
        this.gitSearchService.gitSearch(this.searchQuery, this.page).then((response) => {
            this.searchResults = response;
        }, (error) => {
            alert("Error: " + error.statusText)
        })
    }

    sendQuery = () => {
        this.page = 1;
        this.searchResults = null;
        this.router.navigate(['/search/' + this.searchQuery],
            {
                queryParams:
                    { page: this.page }
            }
        );
    }

    nextPage() {
        this.router.navigate(
            [`/search/${this.searchQuery}`],
            {
                queryParams:
                    { page: this.page + 1 }
            }
        );
    }

    previousPage() {
        this.page = (this.page === 1 ? 1 : this.page - 1);

        this.router.navigate(
            [`/search/${this.searchQuery}`],
            {
                queryParams:
                    { page: this.page }
            }
        );
    }

}
