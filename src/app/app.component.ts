import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <header>
      <error-boundary>
        <h1 fallback>Oops! Check the console.</h1>
        <suspense>
          <spinner fallback [isBig]="true"></spinner>
          <page-container>
            <router-outlet></router-outlet>
          </page-container>
        </suspense>
      </error-boundary>
    </header>
  `,
  styles: [
    `
      :host {
        display: block;
        text-align: center;
      }

      header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
      }

      header > * {
        width: 700px;
      }
    `,
  ],
})
export class AppComponent {}
