import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'finanzasFinal';
  validador = true;
  validador2 = false;
  validador3 = true;

  cambiar() {
    if (this.validador == false) {
      this.validador = true;
      this.validador2 = false;
      this.validador3 = false;
    } else {
      this.validador = false;
      this.validador2 = true;
      this.validador3 = true;
    }
  }
}
