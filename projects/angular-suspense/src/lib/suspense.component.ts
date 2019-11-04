import { Component } from '@angular/core';
import { Suspense } from './suspense.service';

@Component({
  selector: 'suspense',
  template: `
    <ng-content
      *ngIf="suspense.loading | async"
      select="[fallback]"
    ></ng-content>
    <ng-content *ngIf="suspense.ready | async"></ng-content>
  `,
  providers: [Suspense],
})
export class SuspenseComponent {
  constructor(public suspense: Suspense) {}
}
