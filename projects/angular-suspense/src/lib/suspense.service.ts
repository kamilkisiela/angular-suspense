import { Injectable, Optional } from '@angular/core';
import {
  Observable,
  defer,
  never,
  BehaviorSubject,
  asyncScheduler,
} from 'rxjs';
import {
  finalize,
  catchError,
  subscribeOn,
  takeUntil,
  map,
} from 'rxjs/operators';
import { ErrorBoundry } from './error-boundry.service';

@Injectable()
export class Suspense {
  private counter = new BehaviorSubject<number>(0);

  loading: Observable<boolean>;
  ready: Observable<boolean>;

  constructor(@Optional() private errorBoundry?: ErrorBoundry) {
    this.loading = this.counter.pipe(
      subscribeOn(asyncScheduler),
      takeUntil(this.errorBoundry.error),
      map(count => count !== 0),
    );
    this.ready = this.loading.pipe(
      takeUntil(this.errorBoundry.error),
      map(loading => !loading),
    );
  }

  catchError<T>(error: any, source: Observable<T>): Observable<T> {
    if (!this.errorBoundry) {
      return source;
    }

    this.errorBoundry.handleError(error);
    return never();
  }

  use<T>(obs: Observable<T>): Observable<T> {
    return defer(() => {
      this.counter.next(this.counter.value + 1);
      return obs.pipe(
        catchError((error, source) => this.catchError(error, source)),
        finalize(() => {
          this.counter.next(this.counter.value - 1);
        }),
      );
    });
  }
}
