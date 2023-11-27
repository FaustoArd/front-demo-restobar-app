import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RestoTableDto } from '../models/restoTableDto';
import { StorageService } from './storage.service';
import { RestoTableCreateDto } from '../models/resto-table-create-dto';
import { OrderDto } from '../models/orderDto';
import { PaymentMethodDto } from '../models/PaymentMethodDto';

const RESTOTABLE_BASE_URL = 'http://localhost:8080/api/v1/arbam/resto_tables';

@Injectable({
  providedIn: 'root'
})
export class RestoTableService {


  constructor(private http: HttpClient, private storageService:StorageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
     
      return throwError(() => Error('Error en el servidor, intente nuevamente en unos segundos'));
    } else if(error.status===401) {
      return throwError(() => new Error('No authorizado!'));
    }else if(error.status===400) {
      return throwError(() => new Error(error.error));
    }
    return throwError(() => new Error(error.error));
  }

  getTableById(id:number):Observable<RestoTableDto>{
    return this.http.get<RestoTableDto>(`${RESTOTABLE_BASE_URL}/${id}`,this.httpOptions).pipe(catchError(this.handleError));
  }

getAllTables():Observable<RestoTableDto[]>{
  return this.http.get<RestoTableDto[]>(`${RESTOTABLE_BASE_URL}/all`,this.httpOptions).pipe(catchError(this.handleError));
}

getAllTablesOrderByIdAsc(): Observable<RestoTableDto[]>{
  return this.http.get<RestoTableDto[]>(`${RESTOTABLE_BASE_URL}/all_id_asc`,this.httpOptions).pipe(catchError(this.handleError));
}

openNewTable(table:RestoTableCreateDto):Observable<RestoTableCreateDto>{
  return this.http.post<RestoTableCreateDto>(`${RESTOTABLE_BASE_URL}/open_table`,table,this.httpOptions).pipe(catchError(this.handleError));
}

updateTablePrice(id:number):Observable<RestoTableDto>{
  return this.http.put<RestoTableDto>(`${RESTOTABLE_BASE_URL}/update_price/${id}`,this.httpOptions).pipe(catchError(this.handleError));
}

closeTable(restoTableId:number,workingDayId:number,paymentMethod:PaymentMethodDto):Observable<any>{
  return this.http.put<any>(`${RESTOTABLE_BASE_URL}/close_table?restoTableId=${restoTableId}&workingDayId=${workingDayId}`,paymentMethod,this.httpOptions).pipe(catchError(this.handleError));
}

getAllPaymentsMethods():Observable<PaymentMethodDto[]>{
  return this.http.get<PaymentMethodDto[]>(`${RESTOTABLE_BASE_URL}/all_methods`,this.httpOptions).pipe(catchError(this.handleError));
}


isAnyTableOpen():Observable<boolean>{
  return this.http.get<boolean>(`${RESTOTABLE_BASE_URL}/any_table_open`,this.httpOptions).pipe(catchError(this.handleError));
}





}
