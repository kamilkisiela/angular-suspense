import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class ErrorBoundary {
  onError = new Subject<any>();
  error = this.onError.pipe(take(1));

  handleError(error: any) {
    setTimeout(() => {
      this.onError.next(error);
      this.onError.complete();
    });
  }
}
