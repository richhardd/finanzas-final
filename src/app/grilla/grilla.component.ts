import { Component, OnInit } from '@angular/core';
import { pow } from '../../../node_modules/math-power';
import { element } from 'protractor';
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
  getMetodo(e) {
    this.metodoEscogido = e;
    console.log(e);
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

    this.calcularTasaPeriodo();
    this.calcularTablaAmericano();

    switch (this.metodoEscogido) {
      case '1': {
        //americano

        break;
      }
      case '2': {
        //aleman
        break;
      }
      case '2': {
        //frances
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  calcularTasaPeriodo() {
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

  calcularTablaAmericano() {
    let totalTiempo = Number(this.frecuencia) * Number(this.plazo);
    let data;
    let calculoInteres;
    let calculoPrima;
    let calculoBonista;
    let calculoEmisor;
    let bonista = [];
    /* */
    for (let i = 0; i <= totalTiempo; i++) {
      if (i == 0) {
        calculoBonista =
          -parseFloat(this.valorNominal) * (parseFloat(this.gastoB) / 100 + 1);
        data = [{ nominal: this.valorNominal, cuotaB: calculoBonista }];
        bonista.push(calculoBonista);
        calculoEmisor =
          parseFloat(this.valorNominal) * (1 - parseFloat(this.gastoE) / 100);
        data = [
          {
            nominal: this.valorNominal,
            cuotaB: calculoBonista,
            cuotaE: calculoEmisor,
          },
        ];
      } /**/ else if (i < totalTiempo) {
        calculoInteres =
          (parseFloat(this.TEPb) * parseFloat(this.valorNominal)) / 100;
        calculoInteres = parseFloat(calculoInteres).toFixed(2);

        data = [
          {
            nominal: this.valorNominal,
            interes: calculoInteres,
            periodoGracia: 'S',
            cuotaB: calculoInteres,
            cuotaE: -calculoInteres,
          },
        ];
      } else if (i == totalTiempo) {
        calculoPrima =
          (parseFloat(this.primaRedencion) * parseFloat(this.valorNominal)) /
          100;
        calculoPrima = parseFloat(calculoPrima).toFixed(2);

        data = [
          {
            nominal: this.valorNominal,
            interes: calculoInteres,
            periodoGracia: 'S',
            prima: calculoPrima,
            cuotaB:
              parseFloat(this.valorNominal) +
              parseFloat(calculoPrima) +
              parseFloat(calculoInteres),
          },
        ];
      }
      this.gridApi.applyTransaction({ add: data });
    }
    // this.rowData.push({});
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  constructor() {}

  ngOnInit(): void {}
}
