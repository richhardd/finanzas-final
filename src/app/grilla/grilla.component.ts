import { Component, OnInit } from '@angular/core';
import { pow } from '../../../node_modules/math-power';
@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.scss'],
})
export class GrillaComponent implements OnInit {
  private gridApi;
  defaultColDef = {
    resizable: true,
  };
  columnDefs = [
    { headerName: 'Nominal', field: 'nominal' },
    {
      headerName: 'Periodo de Gracia',
      field: 'periodoGracia',
      editable: true,
      resizable: true,
    },
    { headerName: 'Interés', field: 'interes' },
    { headerName: 'Prima', field: 'prima' },
    { headerName: 'Cuota Bonista', field: 'cuotaB' },
    { headerName: 'Cuota Emisor', field: 'cuotaE' },
  ];
  rowData = [];
  metodoEscogido;
  valorNominal;
  tasaBono;
  tasaTipoBono;
  tasaTipoMercado;
  frecuencia;
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
  getTasaTipoBono(e) {
    this.tasaTipoBono = e;
  }
  getFrecuencia(e) {
    this.frecuencia = e;
  }
  getTasaTipoMercado(e) {
    this.tasaTipoMercado = e;
  }
  getMetodo(value) {
    this.metodoEscogido = value;
  }
  getValorNominal(value) {
    console.log(value);
    this.valorNominal = value;
  }
  getTasaBono(value) {
    console.log(value);
    this.tasaBono = value;
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
    this.calcularTasaPerioso();
    this.calcularTabla();
  }

  calcularTasaPerioso() {
    if (this.tasaTipoBono == 1) {
      let val =
        (Math.pow(
          parseFloat(this.tasaBono) / 100.0 + 1.0,
          1 / parseFloat(this.frecuencia)
        ) -
          1.0) *
        100;
      this.TEPb = parseFloat(val.toString()).toFixed(2);
    } else if (this.tasaTipoBono == 2) {
      let val =
        (Math.pow(
          parseFloat(this.tasaBono) / 36000.0 + 1,
          360.0 / parseFloat(this.frecuencia)
        ) -
          1.0) *
        100;
      this.TEPb = parseFloat(val.toString()).toFixed(2);
    }
    if (this.tasaTipoMercado == 1) {
      let val =
        (Math.pow(
          parseFloat(this.tasaMercado) / 100.0 + 1.0,
          1 / parseFloat(this.frecuencia)
        ) -
          1.0) *
        100;
      this.TEPm = parseFloat(val.toString()).toFixed(2);
    } else if (this.tasaTipoMercado == 2) {
      let val =
        (Math.pow(
          parseFloat(this.tasaMercado) / 36000.0 + 1,
          360.0 / parseFloat(this.frecuencia)
        ) -
          1.0) *
        100;
      this.TEPm = parseFloat(val.toString()).toFixed(2);
    }
  }

  calcularTabla() {
    let totalTiempo = Number(this.frecuencia) * Number(this.plazo);
    for (let i = 0; i <= totalTiempo; i++) {
      if (i == 0) {
        this.rowData.push({ nominal: this.valorNominal });
      }

      this.gridApi.applyTransaction({ add: this.rowData });
    }
    // this.rowData.push({});
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }

  constructor() {}

  ngOnInit(): void {}
}
