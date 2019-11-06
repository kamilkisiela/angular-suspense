import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Suspense } from 'angular-suspense';

@Component({
  selector: 'page-container',
  template: `
    <ng-content></ng-content>
  `,
})
export class PageContainerComponent {
  // constructor(suspense: Suspense) {

  // }
}
