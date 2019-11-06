import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Suspense } from 'angular-suspense';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Api } from '../api.service';

@Component({
  selector: 'repo-page',
  template: `
    <repo-details [repo]="repo | async"></repo-details>
    <hr />
    <repo-contributors [contribs]="contribs | async"></repo-contributors>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class RepoPageComponent implements OnInit {
  repo: Observable<any>;
  contribs: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private api: Api,
    private suspense: Suspense,
  ) {}

  ngOnInit() {
    const repoId = this.route.paramMap.pipe(
      map(params => {
        return `${params.get('org')}/${params.get('repo')}`;
      }),
    );

    this.repo = repoId.pipe(
      switchMap(id => this.suspense.use(this.api.fetchRepo(id))),
    );

    this.contribs = repoId.pipe(
      switchMap(id => this.suspense.use(this.api.fetchRepoContribs(id))),
    );
  }
}
