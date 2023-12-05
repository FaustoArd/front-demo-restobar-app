import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable,catchError,pipe,throwError } from 'rxjs';
import { WorkingDayDto } from '../models/workingDayDto';
import { EmployeeDto } from '../models/employeeDto';

const WORKINGDAY_BASE_URL = "http://localhost:8080/api/v1/arbam/working_days";

const EXCEL_BASE_URL = "http://localhost:8080/api/v1/arbam/excel";

@Injectable({
  providedIn: 'root'
})
export class WorkingDayService {

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

 
  getallWorkingDayByDateAsc():Observable<WorkingDayDto[]>{
    return this.http.get<WorkingDayDto[]>(`${WORKINGDAY_BASE_URL}/all`,this.httpOptions).pipe(catchError(this.handleError));
  }

  startWorkingDay(workingDay:WorkingDayDto):Observable<WorkingDayDto>{
    return this.http.post<WorkingDayDto>(`${WORKINGDAY_BASE_URL}/`,workingDay,this.httpOptions).pipe(catchError(this.handleError));
  }

  updateWorkingDay(workingDay:WorkingDayDto):Observable<WorkingDayDto>{
    return this.http.put<WorkingDayDto>(`${WORKINGDAY_BASE_URL}/`,workingDay,this.httpOptions).pipe(catchError(this.handleError));
  }

  closeWorkingDay(id:number):Observable<string>{
    return this.http.get<string>(`${WORKINGDAY_BASE_URL}/close/${id}`,this.httpOptions).pipe(catchError(this.handleError));
  }

  getWorkingDayById(id:number):Observable<WorkingDayDto>{
    return this.http.get<WorkingDayDto>(`${WORKINGDAY_BASE_URL}/${id}`,this.httpOptions).pipe(catchError(this.handleError));
  }

  deleteWorkingDay(id:number):Observable<string>{
    return this.http.delete<string>(`${WORKINGDAY_BASE_URL}/${id}`,this.httpOptions).pipe(catchError(this.handleError));
  }

  deleteEmployeesById(employeesId:number,workingDayId:number):Observable<WorkingDayDto>{
    return this.http.delete<WorkingDayDto>(`${WORKINGDAY_BASE_URL}/employees?employeesId=${employeesId}&workingDayId=${workingDayId}`)
    .pipe(catchError(this.handleError));
  }

  isDayStarted(workingDayId:number):Observable<boolean>{
    return this.http.get<boolean>(`${WORKINGDAY_BASE_URL}/is_started?workingDayId=${workingDayId}`).pipe(catchError(this.handleError));
  }

  findCurrentEmployees(workingDayId:number):Observable<EmployeeDto[]>{
    return this.http.get<EmployeeDto[]>(`${WORKINGDAY_BASE_URL}/find_employees?workingDayId=${workingDayId}`).pipe(catchError(this.handleError));
  }

  create(){
    
  }
  

  exportToExcel(workingDayId:number):Observable<Blob>{
    return this.http.get<Blob>(`${EXCEL_BASE_URL}/${workingDayId}`,this.httpOptions).pipe(catchError(this.handleError));
  }

 

}
