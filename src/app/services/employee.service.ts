import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EmployeeDto } from '../models/employeeDto';
import { EmployeeJobDto } from '../models/employeeJobDto';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

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


  /*Employee*/
  getAllEmployees():Observable<EmployeeDto[]>{
    return this.http.get<EmployeeDto[]>(`${EMPLOYEE_BASE_URL}/all`,this.httpOptions).pipe(catchError(this.handleError));
  }

getEmployeeById(id:number):Observable<EmployeeDto>{
  return this.http.get<EmployeeDto>(`${EMPLOYEE_BASE_URL}/employee/${id}`,this.httpOptions)
  .pipe(catchError(this.handleError));
}

  getEmployeesByJobRole(jobRole:string):Observable<EmployeeDto[]>{
    return this.http.get<EmployeeDto[]>(`${EMPLOYEE_BASE_URL}/by_role?jobRole=${jobRole}`,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  getAllEmployeesbyId(ids:number[]):Observable<EmployeeDto[]>{
    return this.http.get<EmployeeDto[]>(`${EMPLOYEE_BASE_URL}/all_by_id?employeesId=${ids}`,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  createEmployee(employee:EmployeeDto):Observable<string>{
    return this.http.post<string>(`${EMPLOYEE_BASE_URL}/new_employee`,employee,this.httpOptions).pipe(catchError(this.handleError));
  }

  deleteEmployeeById(id:number):Observable<string>{
    return this.http.delete<string>(`${EMPLOYEE_BASE_URL}/employee/${id}`,this.httpOptions).pipe(catchError(this.handleError));
  }

   /*Employee Job*/
  getAllJobRolesOrderAsc():Observable<EmployeeJobDto[]>{
    return this.http.get<EmployeeJobDto[]>(`${EMPLOYEE_BASE_URL}/all_jobs`,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  getEmployeeJobById(id:number):Observable<EmployeeJobDto>{
    return this.http.get<EmployeeJobDto>(`${EMPLOYEE_BASE_URL}/employee_job/${id}`,this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  createJobRole(jobRole:EmployeeJobDto):Observable<EmployeeJobDto>{
    return this.http.post<EmployeeJobDto>(`${EMPLOYEE_BASE_URL}/new_job_role`,jobRole,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  deleteEmployeeJobById(id:number):Observable<string>{
    return this.http.delete<string>(`${EMPLOYEE_BASE_URL}/employee_job/${id}`,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  

}
