import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuspenseComponent } from './suspense.component';
import { ErrorBoundaryComponent } from './error-boundary.component';

@NgModule({
  declarations: [SuspenseComponent, ErrorBoundaryComponent],
  imports: [CommonModule],
  exports: [SuspenseComponent, ErrorBoundaryComponent],
})
export class SuspenseModule {}
