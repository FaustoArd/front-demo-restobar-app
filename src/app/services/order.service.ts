import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { OrderDto } from '../models/orderDto';
import { RestoTableDto } from '../models/restoTableDto';

const ORDER_BASE_URL = 'http://localhost:8080/api/v1/arbam/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json' })
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
     // console.error('se ha producido un error', error.error);
    }else if (error.status===400){
      return throwError(() => new Error(error.error))
     // console.error('Backend retorno el codigo de estado', error.status, error.error)
    }else if(error.status===417){
      return throwError(() => new Error(error.error))
    }else if(error.status===400){
      return throwError(() => new Error(error.error))
    }
    return throwError(() => new Error(error.error))
  }
  
  createOrder(order:OrderDto):Observable<OrderDto>{
    return this.http.post<OrderDto>(`${ORDER_BASE_URL}/create_order`,order,this.httpOptions).pipe(catchError(this.handleError));
  }

  getAllOrdersbyRestoTableId(id:number):Observable<OrderDto[]>{
    return this.http.get<OrderDto[]>(`${ORDER_BASE_URL}/all_by_restotable/${id}`,this.httpOptions).pipe(catchError(this.handleError));
  }

  deleteOrderById(id:number):Observable<any>{
    return this.http.delete<any>(`${ORDER_BASE_URL}/${id}`,this.httpOptions).pipe(catchError(this.handleError));
  }



}
