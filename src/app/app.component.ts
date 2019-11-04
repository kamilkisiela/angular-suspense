import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <error-boundry>
      <h2 fallback>Error #1</h2>

      <suspense>
        <h2 fallback>Loading #1</h2>
        <app-data title="Ready #1" time="1000"></app-data>

        <error-boundry>
          <h2 fallback>Error #1</h2>
          <suspense>
            <h2 fallback>Loading #2</h2>
            <app-data title="Ready #2" time="2000" [throw]="true"></app-data>
          </suspense>
        </error-boundry>
      </suspense>
    </error-boundry>
  `,
})
export class AppComponent {}
