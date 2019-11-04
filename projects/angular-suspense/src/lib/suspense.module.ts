import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuspenseComponent } from './suspense.component';
import { ErrorBoundryComponent } from './error-boundry.component';

@NgModule({
  declarations: [SuspenseComponent, ErrorBoundryComponent],
  imports: [CommonModule],
  exports: [SuspenseComponent, ErrorBoundryComponent],
})
export class SuspenseModule {}
