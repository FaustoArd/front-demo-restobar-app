import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IngredientMixDto } from '../models/ingredientMixDto';

const INGREDIENT_MIX_BASE_URL = 'http://localhost:8080/api/v1/arbam/ingredient_mixes';

@Injectable({
  providedIn: 'root'
})
export class IngredientMixService {

  constructor(private http:HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
     // console.error('se ha producido un error', error.error);
    }else if (error.status===400){
      return throwError(() => new Error("El ingrediente ya existe en esta receta"))
     // console.error('Backend retorno el codigo de estado', error.status, error.error)
    }
      return throwError(() => new Error(error.error))
    }

  


  getMixesByProductId(productId:number):Observable<IngredientMixDto[]>{

    return this.http.get<IngredientMixDto[]>(`${INGREDIENT_MIX_BASE_URL}/all_by_product_id?productId=${productId}`,this.httpOptions)
    .pipe(catchError(this.handleError));

  }
  createMix(ingredientMix:IngredientMixDto,productId:number):Observable<IngredientMixDto>{
    return this.http.post<IngredientMixDto>(`${INGREDIENT_MIX_BASE_URL}/?productId=${productId}`,ingredientMix,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  deleteIngredientFromMix(id:number):Observable<string>{
   return  this.http.delete<string>(`${INGREDIENT_MIX_BASE_URL}/${id}`,this.httpOptions).pipe(catchError(this.handleError));
  }

}
