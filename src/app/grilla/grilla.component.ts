import { Component, OnInit } from '@angular/core';

import { element } from 'protractor';
import { InnerRendererComponent } from 'ag-grid-community/dist/lib/components/framework/componentTypes';
import { irr } from '../../../node_modules/node-irr/dist';
import {} from '../../../node_modules/formula-pmt';

import { npv, pmt } from 'financial';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.scss'],
})
export class GrillaComponent implements OnInit {
  private gridApi;
  defaultColDef = {
    resizable: true,
    width: 110,
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

  bonoPrecio;
  TCEAb;
  TCEPb;

  TCEAe;
  TCEPe;

  bonista = [];
  emisor = [];
  getTasaTipoBono(e) {
    this.tasaTipoBono = e;
    console.log(e);
  }
  getFrecuencia(e) {
    this.frecuencia = e;
    console.log(e);
  }
  getTasaTipoMercado(e) {
    this.tasaTipoMercado = e;
    console.log(e);
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
    this.bonista = [];
    this.emisor = [];
    this.gridApi.setRowData([]);

    switch (this.metodoEscogido) {
      case '1': {
        //americano
        console.log('hola caso 1');

        this.calcularTablaAmericano();
        break;
      }
      case '2': {
        //aleman
        console.log('hola caso 2');
        this.calcularTablaAleman();
        break;
      }
      case '3': {
        //frances
        console.log('hola caso 3');
        this.calcularTablaFrances();
        break;
      }
      default: {
        //statements;
        break;
      }
    }
    this.calcularDatosFinales();
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
    /* */
    for (let i = 0; i <= totalTiempo; i++) {
      if (i == 0) {
        //ayuda  a determinar la couta inicial del bonista
        calculoBonista =
          parseFloat(this.valorNominal) *
          (parseFloat(this.gastoB) / 100 + 1) *
          -1;
        calculoBonista = parseFloat(calculoBonista).toFixed(2);
        console.log(calculoBonista);

        calculoEmisor =
          parseFloat(this.valorNominal) * (1 - parseFloat(this.gastoE) / 100);
        calculoEmisor = parseFloat(calculoEmisor).toFixed(2);
        data = [
          {
            nominal: this.valorNominal,
            cuotaB: calculoBonista,
            cuotaE: calculoEmisor,
          },
        ];

        this.bonista.push(calculoBonista);
        this.emisor.push(calculoEmisor);
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
        calculoInteres = Number(calculoInteres);
        this.bonista.push(calculoInteres);
        this.emisor.push(-1 * calculoInteres);
      } else if (i == totalTiempo) {
        calculoPrima =
          (parseFloat(this.primaRedencion) * parseFloat(this.valorNominal)) /
          100;
        calculoPrima = parseFloat(calculoPrima).toFixed(2);
        let cuotaBonistaFinal =
          parseFloat(this.valorNominal) +
          parseFloat(calculoPrima) +
          parseFloat(calculoInteres);
        data = [
          {
            nominal: this.valorNominal,
            interes: calculoInteres,
            periodoGracia: 'S',
            prima: calculoPrima,
            cuotaB: cuotaBonistaFinal,
            cuotaE: -cuotaBonistaFinal,
          },
        ];
        this.bonista.push(cuotaBonistaFinal);
        this.emisor.push(-1 * cuotaBonistaFinal);
      }
      this.gridApi.applyTransaction({ add: data });
      console.log(this.emisor);
      console.log(this.bonista);
    }
  }
  calcularDatosFinales() {
    console.log('valor final bonista');
    console.log(this.bonista);
    this.TCEPb = irr(this.bonista) * 100;
    this.TCEPb = parseFloat(this.TCEPb).toFixed(2);

    this.TCEPe = irr(this.emisor) * 100;
    this.TCEPe = parseFloat(this.TCEPe).toFixed(2);

    this.TCEAb = (Math.pow(1 + this.TCEPb / 100, this.frecuencia) - 1) * 100;
    this.TCEAb = parseFloat(this.TCEAb).toFixed(2);

    this.TCEAe = (Math.pow(1 + this.TCEPe / 100, this.frecuencia) - 1) * 100;
    this.TCEAe = parseFloat(this.TCEAe).toFixed(2);
    var bonoAcumulado = this.bonista;

    bonoAcumulado.splice(0, 1);

    console.log(this.bonista);
    console.log(bonoAcumulado);
    let TEPM = parseFloat(this.TEPm) / 100;
    this.bonoPrecio = npv(TEPM, bonoAcumulado);
    this.bonoPrecio = parseFloat(this.bonoPrecio).toFixed(2);
  }

  calcularTablaAleman() {
    let totalTiempo = Number(this.frecuencia) * Number(this.plazo);
    let data;
    let calculoInteres;
    let calculoPrima;
    let calculoBonista;
    let calculoEmisor;
    let reduccionNominal = this.valorNominal;
    let reduccion = parseFloat(this.valorNominal) / totalTiempo;
    for (let i = 0; i <= totalTiempo; i++) {
      if (i == 0) {
        calculoBonista =
          parseFloat(reduccionNominal) *
          (1 + parseFloat(this.gastoB) / 100) *
          -1;
        calculoBonista = parseFloat(calculoBonista).toFixed(2);
        console.log(calculoBonista);

        calculoEmisor =
          parseFloat(reduccionNominal) * (1 - parseFloat(this.gastoE) / 100);
        calculoEmisor = parseFloat(calculoEmisor).toFixed(2);
        data = [
          {
            nominal: this.valorNominal,
            cuotaB: calculoBonista,
            cuotaE: calculoEmisor,
          },
        ];

        this.bonista.push(calculoBonista);
        this.emisor.push(calculoEmisor);
      } else if (i < totalTiempo) {
        calculoInteres =
          (parseFloat(this.TEPb) * parseFloat(reduccionNominal)) / 100;
        calculoInteres = parseFloat(calculoInteres).toFixed(2);
        let cuotabonista = parseFloat(calculoInteres) + reduccion;
        cuotabonista = parseFloat(
          parseFloat(cuotabonista.toString()).toFixed(2)
        );

        data = [
          {
            nominal: parseFloat(reduccionNominal).toFixed(2),
            interes: calculoInteres,
            periodoGracia: 'S',
            cuotaB: cuotabonista,
            cuotaE: -cuotabonista,
          },
        ];
        reduccionNominal = reduccionNominal - reduccion;

        this.bonista.push(cuotabonista);
        this.emisor.push(-1 * cuotabonista);
      } else if (i == totalTiempo) {
        calculoPrima =
          (parseFloat(this.primaRedencion) * parseFloat(reduccionNominal)) /
          100;
        calculoPrima = parseFloat(calculoPrima).toFixed(2);
        calculoInteres =
          (parseFloat(this.TEPb) * parseFloat(reduccionNominal)) / 100;
        calculoInteres = parseFloat(calculoInteres).toFixed(2);
        let cuotaBonistaFinal =
          parseFloat(reduccionNominal) +
          parseFloat(calculoPrima) +
          parseFloat(calculoInteres);
        cuotaBonistaFinal = parseFloat(
          parseFloat(cuotaBonistaFinal.toString()).toFixed(2)
        );
        data = [
          {
            nominal: parseFloat(reduccionNominal).toFixed(2),
            interes: calculoInteres,
            periodoGracia: 'S',
            prima: calculoPrima,
            cuotaB: cuotaBonistaFinal,
            cuotaE: -cuotaBonistaFinal,
          },
        ];
        this.bonista.push(cuotaBonistaFinal);
        this.emisor.push(-1 * cuotaBonistaFinal);
      }
      this.gridApi.applyTransaction({ add: data });
    }
    console.log(this.emisor);
    console.log(this.bonista);
  }

  calcularTablaFrances() {
    let totalTiempo = Number(this.frecuencia) * Number(this.plazo);
    let data;
    let calculoInteres;
    let calculoPrima;
    let calculoBonista;
    let calculoEmisor;
    let reduccion;
    let reduccionNominal = this.valorNominal;
    let TEPB = parseFloat(this.TEPb) / 100;
    let cuotaFrances = -1 * pmt(TEPB, totalTiempo, this.valorNominal);
    console.log('cuota frances ' + cuotaFrances);
    for (let i = 0; i <= totalTiempo; i++) {
      if (i == 0) {
        calculoBonista =
          parseFloat(this.valorNominal) *
          (parseFloat(this.gastoB) / 100 + 1) *
          -1;
        calculoBonista = parseFloat(calculoBonista).toFixed(2);
        console.log('valor bonista');
        console.log(calculoBonista);

        calculoEmisor =
          parseFloat(this.valorNominal) * (1 - parseFloat(this.gastoE) / 100);
        calculoEmisor = parseFloat(calculoEmisor).toFixed(2);
        data = [
          {
            nominal: this.valorNominal,
            cuotaB: calculoBonista,
            cuotaE: calculoEmisor,
          },
        ];

        this.bonista.push(parseFloat(calculoBonista));
        this.emisor.push(parseFloat(calculoEmisor));
      } else if (i < totalTiempo) {
        calculoInteres =
          (parseFloat(this.TEPb) * parseFloat(reduccionNominal)) / 100;
        calculoInteres = parseFloat(calculoInteres).toFixed(2);
        data = [
          {
            nominal: parseFloat(reduccionNominal).toFixed(2),
            interes: calculoInteres,
            periodoGracia: 'S',
            cuotaB: parseFloat(cuotaFrances.toString()).toFixed(2),
            cuotaE: -parseFloat(cuotaFrances.toString()).toFixed(2),
          },
        ];
        reduccion = cuotaFrances - parseFloat(calculoInteres);
        reduccionNominal = reduccionNominal - reduccion;

        this.bonista.push(cuotaFrances);
        this.emisor.push(-1 * cuotaFrances);
      } else if (i == totalTiempo) {
        calculoPrima =
          (parseFloat(this.primaRedencion) * parseFloat(reduccionNominal)) /
          100;
        calculoPrima = parseFloat(calculoPrima).toFixed(2);
        calculoInteres =
          (parseFloat(this.TEPb) * parseFloat(reduccionNominal)) / 100;
        calculoInteres = parseFloat(calculoInteres).toFixed(2);
        let cuotaBonistaFinal =
          parseFloat(reduccionNominal) +
          parseFloat(calculoPrima) +
          parseFloat(calculoInteres);
        cuotaBonistaFinal = parseFloat(
          parseFloat(cuotaBonistaFinal.toString()).toFixed(2)
        );
        data = [
          {
            nominal: parseFloat(reduccionNominal).toFixed(2),
            interes: calculoInteres,
            periodoGracia: 'S',
            prima: calculoPrima,
            cuotaB: cuotaBonistaFinal,
            cuotaE: -cuotaBonistaFinal,
          },
        ];
        this.bonista.push(cuotaBonistaFinal);
        this.emisor.push(-1 * cuotaBonistaFinal);
      }
      this.gridApi.applyTransaction({ add: data });
    }
    console.log('emisor');
    console.log(this.emisor);
    console.log('bonista');
    console.log(this.bonista);
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }
  constructor() {}

  ngOnInit(): void {}
}
