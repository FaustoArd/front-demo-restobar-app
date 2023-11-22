import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EmployeeDto } from '../models/employeeDto';

const EMPLOYEE_BASE_URL = 'http://localhost:8080/api/v1/arbam/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Error', error.error);
      return throwError(() => Error('Error en el servidor, intente nuevamente en unos segundos'));
    } 
    return throwError(() => new Error('Algo fallo, intente nuevamente en unos segundos'));
  }

  getAllEmployees():Observable<EmployeeDto[]>{
    return this.http.get<EmployeeDto[]>(`${EMPLOYEE_BASE_URL}/all`,this.httpOptions).pipe(catchError(this.handleError));
  }
  getEmployeesByJobRole(jobRole:string):Observable<EmployeeDto[]>{
    return this.http.get<EmployeeDto[]>(`${EMPLOYEE_BASE_URL}/by_role?jobRole=${jobRole}`,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  getAllEmployeesbyId(ids:number[]):Observable<EmployeeDto[]>{
    return this.http.get<EmployeeDto[]>(`${EMPLOYEE_BASE_URL}/all_by_id?waitressesIds=${ids}`,this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  

}
