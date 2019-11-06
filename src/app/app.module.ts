import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SuspenseModule } from 'angular-suspense';

import { AppComponent } from './app.component';
import { FakeComponent, MockApiComponent } from './fake.component';
import { PageContainerComponent } from './page-container.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    PageContainerComponent,
    FakeComponent,
    MockApiComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'repos',
        loadChildren: () =>
          import('./repos/repos.module').then(m => m.ReposModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then(m => m.UsersModule),
      },
      {
        path: 'fake',
        component: FakeComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/fake',
      },
    ]),
    SuspenseModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
