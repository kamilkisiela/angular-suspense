import { Component } from '@angular/core';
import { startWith, mapTo } from 'rxjs/operators';
import { ErrorBoundry } from './error-boundry.service';

@Component({
  selector: 'error-boundry',
  template: `
    <ng-content *ngIf="hasError | async" select="[fallback]"></ng-content>
    <ng-content *ngIf="noError | async"></ng-content>
  `,
  providers: [ErrorBoundry],
})
export class ErrorBoundryComponent {
  constructor(private errorBoundry: ErrorBoundry) {}

  hasError = this.errorBoundry.error.pipe(mapTo(true));
  noError = this.errorBoundry.error.pipe(
    mapTo(false),
    startWith(true),
  );
}
