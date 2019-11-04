import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SuspenseModule } from 'angular-suspense';

import { AppComponent } from './app.component';
import { DataComponent } from './data.component';

@NgModule({
  declarations: [AppComponent, DataComponent],
  imports: [BrowserModule, SuspenseModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
