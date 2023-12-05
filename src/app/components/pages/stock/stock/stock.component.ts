import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDto } from 'src/app/models/productDto';
import { ProductStock } from 'src/app/models/productStock';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

product!:ProductDto;
products:ProductDto[]= [];
productStock!:ProductStock;
errorData!:string;
messageData!:string;


  constructor(private productService:ProductService,private snackBar:MatSnackBar){}



  ngOnInit(): void {
      this.getAllProductsByProductNameAsc();
     

  }

  onCreateStock(productId:number,productStock:string):void{

    let productStockNum = Number(productStock);
    if(productStockNum<0){
      this.onSnackBarMessage("No puedes poner cantidad negativa");
    }else{
      this.productStock = new ProductStock();
      this.productStock.productStock = productStockNum;
      this.productService.createStock(this.productStock,productId).subscribe({
        error:(errorData)=>{
          this.errorData = errorData;
          this.onSnackBarMessage("No hay suficiente cantidad de ingredientes...");
        },
        complete:()=>{
          this.getAllProductsByProductNameAsc();
        }
      });
    }
   }

   onReduceStock(productId:number,productStock:string):void{
    let productStockNum = Number(productStock);
    console.log(productStockNum)
    if(productStockNum<0){
      this.onSnackBarMessage("No puede poner cantidad negativa");
    }else if(productStockNum==0){
      this.onSnackBarMessage("Debe ingresar una cantidad");

    }else{
      this.productStock = new ProductStock();
      this.productStock.productStock = productStockNum;
      this.productService.reduceStock(this.productStock,productId).subscribe({
        next:(messageData)=>{
          this.messageData = messageData;
          this.onSnackBarMessage(this.messageData)
        },
        error:(errorData)=>{
          this.errorData = errorData;
          this.onSnackBarMessage("No se puede realizar la operacion, el stock quedaria en negativo")
        },
        complete:()=>{
          this.getAllProductsByProductNameAsc();
        }
      });
    }
   }

  getAllProductsByProductNameAsc():void{
      this.productService.getAllProductsByProductNameAsc().subscribe(prods => this.products = prods);
  }
 onSnackBarMessage(message: any) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2500,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }

}
