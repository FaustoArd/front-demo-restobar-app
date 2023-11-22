import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserDto } from '../models/userDto';

const USER_BASE_URL = 'http://localhost:8080/api/v1/arbam/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private handleError(error:HttpErrorResponse){

    if(error.status===0){
      console.error("Error en el servidor", error.error)
      return throwError(() => Error('Error en el servidor, intente nuevamente en unos segundos'));
    }else if(error.status===401) { 
      console.error("401", error.status)
      return throwError(() => Error('Usuario no autorizado'));
    }
    else{
      console.error("Error!, HttpStatus: ", error.status)
    }
    return throwError(() => new Error('Algo fallo, intente nuevamente en unos segundos'));
}

getUserById(id:number):Observable<UserDto>{
  return this.http.get<UserDto>(`${USER_BASE_URL}/${id}`,this.httpOptions).pipe(catchError(this.handleError));
}

}
