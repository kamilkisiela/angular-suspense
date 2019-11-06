import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepoPageComponent } from './repo-page.component';
import { RouterModule } from '@angular/router';
import { RepoDetailsComponent } from './repo-details.component';
import { RepoContributorsComponent } from './repo-contributors.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'facebook/react',
      },
      {
        path: ':org/:repo',
        component: RepoPageComponent,
      }
    ]),
  ],
  declarations: [
    RepoPageComponent,
    RepoDetailsComponent,
    RepoContributorsComponent,
  ],
  exports: [RepoPageComponent],
  entryComponents: [RepoPageComponent],
})
export class ReposModule {}
