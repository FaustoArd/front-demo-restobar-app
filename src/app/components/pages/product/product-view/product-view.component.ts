import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDto } from 'src/app/models/productDto';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  products:ProductDto[]= [];
  product:ProductDto | undefined;
  errorData!:string;

  constructor(private productService:ProductService,private snackBar:MatSnackBar){}


  ngOnInit(): void {
      this.getAllProducts();
  }

getAllProducts(){
  this.productService.getAllProducts().subscribe({
    next:(productsData)=>{
    this.products = productsData;
    },
    error:(errorData)=>{
      this.errorData = errorData;
      this.onSnackBarMessage(this.errorData);
    }
  });
}
getProductById(id:number):void{
  this.productService.getProductById(id).subscribe({
    next:(productData)=>{

    }
  })
}


onSnackBarMessage(message:any){
  this.snackBar.open(message, 'Cerrar', {
       duration: 3000,
       verticalPosition: 'top',
       horizontalPosition: 'center',
       
     });
}
}
