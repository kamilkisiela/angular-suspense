import { Component, Input } from '@angular/core';

@Component({
  selector: 'repo-contributors',
  template: `
    <h2>Contributors</h2>
    <ul>
      <li *ngFor="let user of contribs">
        <a href="#" [routerLink]="['/users', user.login]">{{ user.login }}</a>
      </li>
    </ul>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      ul {
        text-align: left;
        line-height: 1.7em;
      }

      a {
        color: white;
      }
    `,
  ],
})
export class RepoContributorsComponent {
  @Input() contribs: any[];
}
