import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable,catchError,throwError } from 'rxjs';
import { RestoTableClosedDto } from '../models/restoTableClosedDto';

const RESTOTABLECLOSED_BASE_URL = "http://localhost:8080/api/v1/arbam/tables_closed";

@Injectable({
  providedIn: 'root'
})
export class RestoTableClosedService {

  constructor(private http:HttpClient) { }

  private handleError(error:HttpErrorResponse){

    if(error.status===500){
      return throwError(() => Error('Error en la conexion con el servidor, intente nuevamente en unos segundos') )
    }else if(error.status===400){
      return throwError(() => Error(error.error) );
    }else{
      return throwError(() => Error(error.error) );
    }
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json'})
  }

  getAllRestoTableClosedByWorkingDayIdOrderByTableNumberAsc(id:number):Observable<RestoTableClosedDto[]>{
    return this.http.get<RestoTableClosedDto[]>(`${RESTOTABLECLOSED_BASE_URL}/all/${id}`,this.httpOptions).pipe(catchError(this.handleError));
  }


  
}
