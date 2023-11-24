import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ProductDto } from '../models/productDto';
import { CategoryDto } from '../models/categoryDto';
import { ProductStock } from '../models/productStock';

const PRODUCT_BASE_URL = 'http://localhost:8080/api/v1/arbam/products';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json' })
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Error', error.error);
      return throwError(() => Error(error.error));
    } else if(error.status===400){
      return throwError(()=> Error(error.error));
    }
    return throwError(() => new Error(error.error));
  }

  getProductsByCategoryId(id:number):Observable<ProductDto[]>{
    return this.http.get<ProductDto[]>(`${PRODUCT_BASE_URL}/all_by_category/${id}`,this.httpOptions).pipe(catchError(this.handleError));
  }

  getProductById(id:number):Observable<ProductDto>{
    return this.http.get<ProductDto>(`${PRODUCT_BASE_URL}/${id}`,this.httpOptions).pipe(catchError(this.handleError));
  }

  getAllProducts():Observable<ProductDto[]>{
    return this.http.get<ProductDto[]>(`${PRODUCT_BASE_URL}/all`,this.httpOptions).pipe(catchError(this.handleError));
  }

  getAllProductsByProductNameAsc():Observable<ProductDto[]>{
    return this.http.get<ProductDto[]>(`${PRODUCT_BASE_URL}/all_asc`,this.httpOptions).pipe(catchError(this.handleError));
  }

  saveProduct(product:ProductDto):Observable<ProductDto>{
    return this.http.post<ProductDto>(`${PRODUCT_BASE_URL}/`,product,this.httpOptions).pipe(catchError(this.handleError));
  }

  updateProduct(product:ProductDto):Observable<ProductDto>{
    return this.http.put<ProductDto>(`${PRODUCT_BASE_URL}/`,product,this.httpOptions).pipe(catchError(this.handleError));
  }

  deleteProduct(id:number):Observable<string>{
    return this.http.delete<string>(`${PRODUCT_BASE_URL}/${id}`,this.httpOptions).pipe(catchError(this.handleError));
  }

  //this
  createStock(productStock:ProductStock,productId:number):Observable<ProductDto>{
    return this.http.post<ProductDto>(`${PRODUCT_BASE_URL}/create_stock?productId=${productId}`,productStock,this.httpOptions)
    .pipe(catchError(this.handleError));

  }

  reduceStock(productStock:ProductStock,productId:number):Observable<string>{
    return this.http.put<string>(`${PRODUCT_BASE_URL}/reduce_stock?productId=${productId}`,productStock,this.httpOptions)
    .pipe(catchError(this.handleError));
  }
 
}
