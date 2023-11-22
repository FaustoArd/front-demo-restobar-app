import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CategoryDto } from '../models/categoryDto';

const CATEGORY_BASE_URL = 'http://localhost:8080/api/v1/arbam/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json' })
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Error', error.error);
      return throwError(() => Error('Error en el servidor, intente nuevamente en unos segundos'));
    } 
    return throwError(() => new Error('Algo fallo, intente nuevamente en unos segundos'));
  }


  getAllCategories():Observable<CategoryDto[]>{
    return this.http.get<CategoryDto[]>(`${CATEGORY_BASE_URL}/all`,this.httpOptions).pipe(catchError(this.handleError));
  }

  findCategoryById(id:number):Observable<CategoryDto>{
    return this.http.get<CategoryDto>(`${CATEGORY_BASE_URL}/${id}`,this.httpOptions)
  }
  saveCategory(category:CategoryDto):Observable<CategoryDto>{
    return this.http.post<CategoryDto>(`${CATEGORY_BASE_URL}/`,category,this.httpOptions).pipe(catchError(this.handleError));
  }

}
