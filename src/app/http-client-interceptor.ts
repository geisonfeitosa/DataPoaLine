import { AlertService } from './services/alert.service';
import {
    HttpEvent, HttpHandler,
    HttpInterceptor, HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoadingService } from './services/loading.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private loadingService: LoadingService,
        private alertService: AlertService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.start();
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.loadingService.close();
                }
            }, () => {
                this.loadingService.close();
                this.alertService.openError("Erro ao tentar acessar o servidor, tente novamente mais tarde.");
            }));
    }

}
