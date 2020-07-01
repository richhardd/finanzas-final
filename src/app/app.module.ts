import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

import { GrillaComponent } from './grilla/grilla.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AppComponent, GrillaComponent, LoginComponent],
  imports: [BrowserModule, AgGridModule.withComponents([])],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
