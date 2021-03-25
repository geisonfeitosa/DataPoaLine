import { Component, OnInit } from '@angular/core';
import 'leaflet-bing-layer';
import 'leaflet-draw';

import { DataPoaService } from './../../services/data-poa.service';
import { MapComponent } from './../map/map.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  lineBus: any[] = [];
  lineLotation: any[] = [];

  constructor(
    private _dataPoaService: DataPoaService
  ) { }

  ngOnInit(): void {
    this.getLineBus();
    this.getLineLotation();
  }

  getLineBus() {
    this._dataPoaService.getLineBus().subscribe((r: any) => {
      this.lineBus = r;
    }, error => {
      console.log(error);
    });
  }

  getLineLotation() {
    this._dataPoaService.getLineLotation().subscribe((r: any) => {
      this.lineLotation = r;
    }, error => {
      console.log(error);
    });
  }

  getItinerary(id) {
    this._dataPoaService.getItinerary(id).subscribe((r: any) => {
      let codigo = r.codigo;
      let nome = r.nome;
      delete (r.codigo);
      delete (r.idlinha);
      delete (r.nome);

      let coord = Object.keys(r).map(key => ({ key: key, ...r[key] }));
      MapComponent.getItineraryEmitter.emit({codigo, nome, coord});
    }, error => {
      console.log(error);
    });
  }

  clearMap() {
    MapComponent.clearMapEmitter.emit();
  }

}
