import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDto } from 'src/app/models/productDto';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
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
  deleteData!:string;
  confirmData!:boolean;

  constructor(private productService:ProductService,private snackBar:MatSnackBar,private confirmDialogService:ConfirmDialogService){}


  ngOnInit(): void {
      this.getAllProductsByNameAsc();
  }

 

  getAllProductsByNameAsc(){
    this.productService.getAllProductsByProductNameAsc().subscribe({
      next:(productsData)=>{
      this.products = productsData;
      },
      error:(errorData)=>{
        this.errorData = errorData;
        this.onSnackBarMessage(this.errorData);
      }
    });
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

confirm(id:number){
  var confirmMessage="Esta seguro que va a eliminar este producto?,Tambien se eliminara la receta.";
  this.confirmDialogService.confirmDialog(confirmMessage).subscribe({
    next:(confirmData)=>{
      this.confirmData = confirmData;
      if(this.confirmData){
        this.deleteProductbyId(id);
       
      }else{
        this.onSnackBarMessage("Cancelado!");
      }
    }
  });
}

deleteProductbyId(id:number):void{
  this.productService.deleteProduct(id).subscribe({
    next:(deleteData)=>{
      this.deleteData = deleteData;
    },
    error:(errorData)=>{
      this.errorData = errorData;
    },
    complete:()=>{
      this.onSnackBarMessage(this.deleteData);
      this.getAllProductsByNameAsc();
    }
  })
}

onSnackBarMessage(message:any){
  this.snackBar.open(message, 'Cerrar', {
       duration: 2500,
       verticalPosition: 'bottom',
       horizontalPosition: 'center',
       
     });
}
}
