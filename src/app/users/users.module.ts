import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserPageComponent } from './user-page.component';
import { UserDetailsComponent } from './user-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':login',
        component: UserPageComponent,
      }
    ]),
  ],
  declarations: [
    UserPageComponent,
    UserDetailsComponent,
  ],
  exports: [UserPageComponent],
  entryComponents: [UserPageComponent],
})
export class UsersModule {}
