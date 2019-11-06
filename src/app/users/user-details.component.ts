import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-details',
  template: `
    <h1>{{user?.name}}</h1>
    <h2>{{user?.login}}</h2>
  `,
})
export class UserDetailsComponent {
  @Input() user: any;
}
