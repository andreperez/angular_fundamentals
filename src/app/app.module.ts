import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { GitSearchService } from './git-search.service';
import { GitSearchComponent } from './git-search/git-search.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'search',
        redirectTo: '/search/angular',
        pathMatch: 'full'
    },
    {
        path: 'search/:query',
        component: GitSearchComponent,
        data: {
            title: 'Git Search'
        }
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]

@NgModule({
    declarations: [
        AppComponent,
        GitSearchComponent,
        HomePageComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [GitSearchService],
    bootstrap: [AppComponent]
})
export class AppModule { }
