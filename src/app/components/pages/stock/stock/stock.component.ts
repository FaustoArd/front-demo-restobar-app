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

  constructor(private productService:ProductService,private snackBar:MatSnackBar){}



  ngOnInit(): void {
      this.getAllProducts();

  }

  onCreateStock(productId:number,productStock:string):void{

    let productStockNum = Number(productStock);
    if(productStockNum<0){
      this.onSnackBarMessage("No puedes poner cantidad 0");
    }else{
      this.productStock = new ProductStock();
      this.productStock.productStock = productStockNum;
      this.productService.createStock(this.productStock,productId).subscribe({
        complete:()=>{
          this.getAllProducts();
        }
      })
    }

  

  }

  getAllProducts():void{
      this.productService.getAllProducts().subscribe(prods => this.products = prods);
  }
 onSnackBarMessage(message: any) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

}
