import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Suspense } from 'angular-suspense';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Api } from '../api.service';

@Component({
  selector: 'user-page',
  template: `
    <user-details [user]="user | async"></user-details>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class UserPageComponent implements OnInit {
  user: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private api: Api,
    private suspense: Suspense,
  ) {}

  ngOnInit() {
    const login = this.route.paramMap.pipe(map(params => params.get('login')));

    this.user = login.pipe(
      switchMap(id => this.suspense.use(this.api.fetchUser(id))),
    );
  }
}
