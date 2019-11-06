import { Component, Optional, Input, OnInit } from '@angular/core';
import { Suspense, SuspenseConfig } from './suspense.service';

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
export class SuspenseComponent implements OnInit {
  @Input() busyMinDurationMs?: SuspenseConfig['busyMinDurationMs'];

  constructor(public suspense: Suspense) {}

  ngOnInit() {
    this.suspense.configure({
      busyMinDurationMs: this.busyMinDurationMs,
    });
  }
}
