import { Component } from '@angular/core';
import { startWith, mapTo } from 'rxjs/operators';
import { ErrorBoundary } from './error-boundary.service';

@Component({
  selector: 'error-boundary',
  template: `
    <ng-content *ngIf="hasError | async" select="[fallback]"></ng-content>
    <ng-content *ngIf="noError | async"></ng-content>
  `,
  providers: [ErrorBoundary],
})
export class ErrorBoundaryComponent {
  constructor(private errorBoundary: ErrorBoundary) {}

  hasError = this.errorBoundary.error.pipe(mapTo(true));
  noError = this.errorBoundary.error.pipe(
    mapTo(false),
    startWith(true),
  );
}
