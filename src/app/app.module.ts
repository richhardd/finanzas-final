import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import {} from '../../node_modules/node-irr';
import {} from '../../node_modules/formula-pmt';
import {} from '../../node_modules/node-finance';
import { GrillaComponent } from '../app/grilla/grilla.component';
import { LoginComponent } from '../app/login/login.component';

@NgModule({
  declarations: [AppComponent, GrillaComponent, LoginComponent],
  imports: [BrowserModule, AgGridModule.withComponents([])],
  providers: [],
  bootstrap: [AppComponent, GrillaComponent, LoginComponent],
})
export class AppModule {}
