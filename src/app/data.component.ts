import { Component, Input, OnInit, Optional } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Suspense } from 'angular-suspense';

@Component({
  selector: 'app-data',
  template: `
    <h2>{{ text | async }}</h2>
  `,
})
export class DataComponent implements OnInit {
  @Input() time: number;
  @Input() title: string;
  @Optional() @Input() throw?: boolean;

  text: Observable<string>;

  constructor(private suspense: Suspense) {}

  ngOnInit() {
    if (this.throw) {
      this.text = this.suspense.use(
        throwError('Error!').pipe(delay(this.time)),
      );
    } else {
      this.text = this.suspense.use(of(this.title).pipe(delay(this.time)));
    }
  }
}
