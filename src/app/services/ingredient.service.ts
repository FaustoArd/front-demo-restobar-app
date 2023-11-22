import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IngredientDto } from '../models/ingredientDto';

const INGREDIENT_BASE_URL = 'http://localhost:8080/api/v1/arbam/ingredients';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http:HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

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

  getAllIngredients():Observable<IngredientDto[]>{
    return this.http.get<IngredientDto[]>(`${INGREDIENT_BASE_URL}/all`,this.httpOptions).pipe(catchError(this.handleError));
  }

  getIngredientById(id:number):Observable<IngredientDto>{
    return this.http.get<IngredientDto>(`${INGREDIENT_BASE_URL}/${id}`,this.httpOptions).pipe(catchError(this.handleError));
  }

}
