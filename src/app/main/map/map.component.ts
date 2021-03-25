import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-bing-layer';
import 'leaflet-draw';
import drawLocales from 'leaflet-draw-locales';


@Component({
  selector: 'app-map',
  template: `<div class="map-container">
  <div class="map-frame">
      <div id="map"></div>
  </div>
</div>`
})
export class MapComponent implements OnInit {

  private map;
  private drawnItems;
  private centro;

  static getItineraryEmitter = new EventEmitter();
  static clearMapEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.centro = [-30.017885, -51.213680];
    setTimeout(() => {
      this.initMap();
    }, 500);
    MapComponent.getItineraryEmitter.subscribe(({codigo, nome, coord}) => {
      setTimeout(() => {
        this.getItinerary({codigo, nome, coord});
      });
    });
    MapComponent.clearMapEmitter.subscribe(() => {
      this.clearMap();
    });
  }

  getItinerary({codigo, nome, coord}) {
    this.map.panTo([Number(coord[0].lat), Number(coord[0].lng)]);
    let layer = MapComponent.createLayersFromJson(coord, this.drawnItems);
    layer.on('mouseover', e => {
      L.popup().setLatLng((<any>e).latlng).setContent(`(${codigo}) ${nome}`).openOn(this.map);
    });
    this.drawnItems.addLayer(layer);
  }

  clearMap() {
    this.map.closePopup();
    this.drawnItems.clearLayers();
  }

  private initMap(): void {
    this.map = new L.Map('map', { preferCanvas: true, center: new L.LatLng(this.centro[0], this.centro[1]), zoom: 13 });
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    var osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib });
    this.drawnItems = L.featureGroup().addTo(this.map);

    L.control.layers({
      'Rodovias': osm,
      "Google": L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 18,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }).addTo(this.map),
      'Bing': (L as any).tileLayer.bing('AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L')
    }).addTo(this.map);

    var layers = (this.drawnItems as any)._layers;
    var centros: any = MapComponent.getCenter(layers, this.centro[0], this.centro[1]);
    this.map.panTo(centros);

    const locale = drawLocales('pt');
    (L as any).drawLocal = locale;

    this.map.on('draw:created', function (event) {
      var layer = event.layer;
      this.drawnItems.addLayer(layer);
    });
  }

  static getCenter(layers, latitude, longitude) {
    var centros = [];
    for (let key in layers) {
      var layer = layers[key];
      if (layer._mRadius) {
        centros.push(layer._latlng);
      }
    }
    var polygon = L.polygon(centros, {});
    if (polygon != null && Object.keys(polygon.getBounds()).length > 0) {
      let centro = polygon.getBounds().getCenter();
      return centro;
    } else {
      return [latitude, longitude];
    }
  }

  static createLayersFromJson(geojson, drawnItems) {
    let coordinates = [];
    for (let coord of geojson) {
      let layer = L.circle([Number(coord.lat), Number(coord.lng)], { radius: 1, color: "#ff0000" });
      drawnItems.addLayer(layer);
      let latlng = [Number(coord.lat), Number(coord.lng)];
      coordinates.push(latlng);
    }
    let polygon = L.polyline(coordinates, {
      stroke: true,
      color: "#ff0000",
      weight: 3,
    });
    return polygon;
  }

}
