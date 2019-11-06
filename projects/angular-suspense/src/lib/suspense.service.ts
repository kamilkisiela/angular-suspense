import { Injectable, Optional } from '@angular/core';
import { Observable, defer, never, BehaviorSubject, of } from 'rxjs';
import {
  finalize,
  catchError,
  takeUntil,
  map,
  delay,
  startWith,
  distinctUntilChanged,
  tap,
  switchMap,
} from 'rxjs/operators';
import { ErrorBoundary } from './error-boundary.service';

export interface SuspenseConfig {
  /**
   * If we show fallback, force it to stick for a bit
   */
  busyMinDurationMs?: number;
}

@Injectable()
export class Suspense {
  private counter = new BehaviorSubject<number>(0);
  private config: Required<SuspenseConfig> = {
    busyMinDurationMs: 0,
  };

  loading: Observable<boolean>;
  ready: Observable<boolean>;

  constructor(@Optional() private errorBoundary?: ErrorBoundary) {
    let loadingStartedAt: number;

    this.loading = this.counter.pipe(
      takeUntil(this.errorBoundary.error),
      map(count => count !== 0),
      distinctUntilChanged(),
      switchMap(isLoading => {
        if (isLoading) {
          loadingStartedAt = Date.now();
        }

        const now = Date.now();
        const took = now - loadingStartedAt;
        const shouldStayBusy =
          !isLoading && took < this.config.busyMinDurationMs;

        if (shouldStayBusy) {
          return of(isLoading).pipe(
            delay(this.config.busyMinDurationMs - took),
          );
        } else {
          return of(isLoading);
        }
      }),
      distinctUntilChanged(),
      tap(isLoading => {
        console.log('isLoading', isLoading);
      }),
    );

    this.ready = this.loading.pipe(
      takeUntil(this.errorBoundary.error),
      map(loading => !loading),
      distinctUntilChanged(),
      startWith(true),
      tap(isReady => {
        console.log('isReady', isReady);
      }),
    );
  }

  configure(config: SuspenseConfig) {
    this.config = {
      ...this.config,
      ...config,
    };
  }

  catchError<T>(error: any, source: Observable<T>): Observable<T> {
    if (!this.errorBoundary) {
      return source;
    }

    this.errorBoundary.handleError(error);
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
