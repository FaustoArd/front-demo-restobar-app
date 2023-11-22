import { Injectable } from '@angular/core';
import { Observable, catchError,  throwError,tap } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RegistrationDto } from '../models/registrationDto';
import { LoginDto } from '../models/loginDto';

const AUTH_BASE_URL = 'http://localhost:8080/api/v1/arbam/authentication';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json ' })
  };

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Error', error.error);
      return throwError(() => Error('Error en el servidor, intente nuevamente en unos segundos'));
    } else if (error.status === 401) {
      console.error('Error', error.status);
      return throwError(() => Error('Usuario o contraseña incorrecto'));
    } else if (error.status === 417) {
      console.error('Error', error.status);
      return throwError(() => new Error('Direccion de email invalida'));
    } else {
      console.error("Error!, HttpStatus: ", error.status)
      return throwError(() => new Error('Algo fallo, intente nuevamente en unos segundos'));
    }
   }

  registerUser(reg: RegistrationDto): Observable<RegistrationDto> {
    return this.http.post<RegistrationDto>(`${AUTH_BASE_URL}/register`, reg, this.httpOptions).pipe(tap(() =>{

    }), catchError(this.handleError));
  }

  loginUser(login: LoginDto): Observable<LoginDto> {
    return this.http.post<LoginDto>(`${AUTH_BASE_URL}/login`, login, this.httpOptions).pipe(catchError(this.handleError));
  }
}
