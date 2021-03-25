import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styles: [
  ]
})
export class LineComponent {

  @Input() dataSource: any[] = [];
  @Output() detailEmitter =  new EventEmitter();
  @Output() clearMapEmitter =  new EventEmitter();
  dataSourceView: any[] = []

  constructor() { }
  

  applyFilter(event: Event) {
    if (this.dataSourceView.length == 0) this.dataSourceView = [...this.dataSource];
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource = this.dataSourceView.filter(i => i.nome.toLowerCase().includes(filterValue) || i.codigo.toLowerCase().includes(filterValue));
  }

  getItinerary(id) {
    this.detailEmitter.emit(id);
  }

  clearMap() {
    this.clearMapEmitter.emit();
  }

}
