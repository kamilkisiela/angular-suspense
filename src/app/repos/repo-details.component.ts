import { Component, Input } from '@angular/core';

@Component({
  selector: 'repo-details',
  template: `
    <h1>
      {{ repo?.name }}
    </h1>
  `,
})
export class RepoDetailsComponent {
  @Input() repo: any;
}
