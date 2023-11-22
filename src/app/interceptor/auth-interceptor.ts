import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private storageService: StorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const jwtToken = this.storageService.getAuthToken();

        if (jwtToken !== null) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
            })
            return next.handle(authReq);
        }
        const authReq = req.clone({
            headers: req.headers.set('Content-Type', 'application/json')
        });
        return next.handle(authReq);
    }
}