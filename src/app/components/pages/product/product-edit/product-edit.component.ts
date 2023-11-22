import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDto } from 'src/app/models/categoryDto';
import { ProductDto } from 'src/app/models/productDto';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  categories:CategoryDto[] = [];
  product: ProductDto | undefined;
  products:ProductDto[]= [];
  savedProduct:ProductDto | undefined;
  errorData: any;

  constructor(private productServive: ProductService, private snackBar: MatSnackBar,
     private route: ActivatedRoute,private formBuilder:FormBuilder,private categoryService:CategoryService,private router:Router) { }


  ngOnInit(): void {
    this.getProductbyId()
    this.getAllCategories();
    this.getAllProducts();
   
  }

  productEditForm = this.formBuilder.group({
    id:[0],
    productName:['', Validators.required],
    categoryId:[0,Validators.required],
    productPrice:[0,Validators.required]
  })

  get productName(){
    return this.productEditForm.controls.productName;
  }
  get productPrice(){
    return this.productEditForm.controls.productPrice;
  }
  get categoryId(){
    return this.productEditForm.controls.categoryId;
  }

  updateProduct(){
    if(this.productEditForm.valid){
      console.log(this.productEditForm.value)
      this.savedProduct = new ProductDto();
      this.savedProduct = Object.assign(this.savedProduct, this.productEditForm.value)
      this.productServive.updateProduct(this.savedProduct).subscribe({
        next:(productData)=>{
          this.product= productData;
        },
        error:(errorData)=>{
          this.errorData = errorData;
          this.onSnackBarMessage(this.errorData);
        },
        complete:()=>{
          this.onSnackBarMessage("EL producto se actualizo correctamente!")
          this.router.navigateByUrl('/product-view')
        }
      })
    }

  }


  onUpdateProductShow():void{
    this.productEditForm.patchValue({
      id:this.product?.id,
      productName:this.product?.productName,
      categoryId:this.product?.categoryId,
      productPrice:this.product?.productPrice,



    })
  }



  getProductbyId() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productServive.getProductById(id).subscribe({
      next: (productData) => {
        this.product = productData;
        this.onUpdateProductShow();
        
      },
      error: () => {
        this.errorData = this.errorData;
        this.onSnackBarMessage(this.errorData);
      }
    });
  }

  onSnackBarMessage(message: any) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(cats => this.categories = cats);
  }

  getAllProducts():void{
    this.productServive.getAllProducts().subscribe({
      next:(productsData)=>{
        this.products = productsData;
      },
      error:(errorData)=>{
        this.errorData= errorData;
        this.onSnackBarMessage(this.errorData);
      }
    })
  }
}
