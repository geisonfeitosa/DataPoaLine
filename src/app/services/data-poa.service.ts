import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataPoaService {

  loadingEmitter = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  getLineBus(): Observable<any> {
    return this.http.get("http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%&t=o").pipe(take(1));
  }

  getLineLotation() {
    return this.http.get("http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%&t=l").pipe(take(1));
  }

  getItinerary(id) {
    return this.http.get(`http://www.poatransporte.com.br/php/facades/process.php?a=il&p=${id}`).pipe(take(1));
  }

}
