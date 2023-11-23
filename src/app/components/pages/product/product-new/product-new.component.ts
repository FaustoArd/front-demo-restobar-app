import { Component ,OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryDto } from 'src/app/models/categoryDto';
import { ProductDto } from 'src/app/models/productDto';


@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit{

  constructor(private productService:ProductService,private snackBar:MatSnackBar,private categoryService:CategoryService){}

  categories:CategoryDto[] = [];
  product!:ProductDto;
  errorData:any;

  productForm  = new FormGroup({
    id: new FormControl(''),
    productName: new FormControl('', [Validators.required,Validators.nullValidator]),
    categoryId: new FormControl([],[Validators.required, Validators.nullValidator]),
    
    productPrice: new FormControl('', Validators.required),
    
  })

ngOnInit(): void {
    this.getAllCategories();
}

get productName(){
  return this.productForm.controls.productName;
}
get productPrice(){
  return this.productForm.controls.productPrice;
}

get categoryId(){
  return this.productForm.controls.categoryId;
}



  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(cats => this.categories = cats);
  }

  saveProduct():void{
    
     console.log(this.productForm.controls.categoryId)
   
    if(this.productForm.valid){
   console.log(this.productForm.value)
   this.product = new ProductDto();
   this.product = Object.assign(this.product, this.productForm.value)
   this.productService.saveProduct(this.product).subscribe({
    next:()=>{
      this.onSnackBarMessage("Producto guardado!")
      this.productForm.reset();
    },
    error:(errorData)=>{
      this.errorData = errorData;
      this.onSnackBarMessage(this.errorData)
    }
   })

    }else{
     this.productForm.markAllAsTouched();
    }


  }



  onSnackBarMessage(message:any){
    this.snackBar.open(message, 'Cerrar', {
         duration: 3000,
         verticalPosition: 'top',
         horizontalPosition: 'center',
         
       });
  }

}
