import { Component, Input, OnInit, Optional } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Suspense } from 'angular-suspense';

@Component({
  selector: 'mock-api',
  template: `
    <h2>{{ text | async }}</h2>
  `,
})
export class MockApiComponent implements OnInit {
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

@Component({
  selector: 'fake',
  template: `
    Mocked
    <mock-api title="Ready #1" time="2000"></mock-api>
    <!--<suspense-list>-->
      <suspense>
        <h2 fallback>Loading #2</h2>
        <mock-api title="Ready #2" time="6000"></mock-api>
      </suspense>
      <suspense>
        <h2 fallback>Loading #3</h2>
        <mock-api title="Ready #3" time="4000"></mock-api>
      </suspense>
    <!--</suspense-list>-->
  `,
})
export class FakeComponent {}
