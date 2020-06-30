import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.scss'],
})
export class GrillaComponent implements OnInit {
  defaultColDef = {
    resizable: true,
  };
  metodos = [
    { name: 'Aleman', value: 1 },
    { name: 'Americano', value: 2 },
    { name: 'Frances', value: 3 },
  ];
  metodoEscogido;
  valorNominal;
  tasaCupon;
  plazo;
  tasaMercado;
  primaRedencion;
  estructuracion;
  colocacion;
  flotacion;
  cavali;

  TEPb;
  TEPm;
  gastoB;
  gastoE;

  x;
  getMetodo(value) {
    this.x = document.getElementById('metodo');
    console.log(value);
    console.log(this.x);
  }
  getValorNominal(value) {
    console.log(value);
    this.valorNominal = value;
  }
  getTasaCupon(value) {
    console.log(value);
    this.tasaCupon = value;
  }
  getPlazo(value) {
    console.log(value);
    this.plazo = value;
  }
  getTasaMercado(value) {
    console.log(value);
    this.tasaMercado = value;
  }
  getPrimaRedencion(value) {
    console.log(value);
    this.primaRedencion = value;
  }
  getEstructuracion(value) {
    console.log(value);
    this.estructuracion = value;
  }
  getColocacion(value) {
    console.log(value);
    this.colocacion = value;
  }

  getFlotacion(value) {
    console.log(value);
    this.flotacion = value;
  }
  getCavali(value) {
    console.log(value);
    this.cavali = value;
  }
  calculos() {
    this.gastoB = Number(this.flotacion) + Number(this.cavali);
    this.gastoE =
      Number(this.flotacion) +
      Number(this.cavali) +
      Number(this.colocacion) +
      Number(this.estructuracion);
    console.log(this.gastoB);
  }

  columnDefs = [
    { headerName: 'Nominal', field: 'nominal' },
    { headerName: 'Periodo de Gracia', field: 'periodoGracia' },
    { headerName: 'Interés', field: 'interes' },
    { headerName: 'Prima', field: 'prima' },
    { headerName: 'Cuota Bonista', field: 'cuotaB' },
    { headerName: 'Cuota Emisor', field: 'cuotaE' },
  ];

  rowData = [{ nominal: '1' }];
  constructor() {}

  ngOnInit(): void {}
}
