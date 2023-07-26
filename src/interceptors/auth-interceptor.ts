import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser();
        
        let N = API_CONFIG.baseUrl.length; // pego o tamanho
        let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl; // ver se req é igual ao do localhost

        if (localUser && requestToAPI) { // só adiciona cabeçalho do token se a requisição for pra minha API
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq); // retorna a requisição com o clone do token
        } 
        else {
            return next.handle(req); // se não existir retorna a requisição original sem adiciona cabeçalho
        }
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};