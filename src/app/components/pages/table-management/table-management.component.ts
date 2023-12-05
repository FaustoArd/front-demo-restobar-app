import { Component, OnInit } from '@angular/core';
import { RestoTableDto } from 'src/app/models/restoTableDto';
import { OrderDto } from 'src/app/models/orderDto';
import { RestoTableService } from 'src/app/services/resto-table.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductDto } from 'src/app/models/productDto';
import { CategoryDto } from 'src/app/models/categoryDto';
import { StorageService } from 'src/app/services/storage.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import {  FormBuilder, Validators } from '@angular/forms';
import { PaymentMethodDto } from 'src/app/models/PaymentMethodDto';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';

@Component({
  selector: 'app-table-management',
  templateUrl: './table-management.component.html',
  styleUrls: ['./table-management.component.css']
})
export class TableManagementComponent implements OnInit {

  product!: ProductDto;
   products: ProductDto[] = [];
  categories: CategoryDto[] = [];
  restoTable!: RestoTableDto;
  order!: OrderDto;
  orders: OrderDto[] = [];
  payMethod!:PaymentMethodDto;
  private productQuantity!: number;
  private deleteData!: string;
  private errorData!: string;
  private addedOrderData:any;
  private categoryId!:number;
  private  tableClosedData!:any;
  confirmData!:boolean;
 
  paymentMethods:PaymentMethodDto[] = [];
  


  constructor(private restoTableService: RestoTableService, private productService: ProductService,
    private storageService: StorageService, private orderService: OrderService,
    private router: Router, private snackBar: MatSnackBar, private categoryService:CategoryService,
    private formBuilder:FormBuilder,private confirmationService:ConfirmDialogService) { }

  ngOnInit(): void {
    this.getRestoTableById(Number(this.storageService.getTableIdAfterTableSelection()))
    this.getAllCategories();
    this.getAllOrdersByRestoTableId();
    this.updateTablePrice();
    this.getAllPaymentsMethods();

  }
  createNewOrder(productId: number, productQuantity: string) {
    console.log(productId);
    this.order = new OrderDto();
    this.order.productId = productId;
    this.order.productQuantity = Number(productQuantity);
    this.order.restoTableId = Number(this.storageService.getTableIdAfterTableSelection());
    this.orderService.createOrder(this.order).subscribe({
      next:(addedOrderData)=>{
        this.addedOrderData = addedOrderData;
      },
      error:(errorData)=>{
        this.errorData =String (errorData);
       this.onSnackBarMessage(this.errorData);
       },
      complete: () => {
        this.onSnackBarMessage("se agrego: " + this.addedOrderData.productQuantity + " " +  this.addedOrderData.productName );
        this.updateTablePrice();
        this.getAllOrdersByRestoTableId();
        this.getProductsByCategoryId(this.categoryId)
       
      }
    });
  }
  deleteOrderById(id: number) {
    this.orderService.deleteOrderById(id).subscribe({
      next: (deleteData) => {
        this.deleteData = deleteData;
      },
      error: (errorData) => {
      this.onSnackBarMessage(errorData)
      },
      complete: () => {
        this.onSnackBarMessage(this.deleteData);
        this.getAllOrdersByRestoTableId();
        this.updateTablePrice();
        this.getProductsByCategoryId(this.categoryId)
      }
    });
}

paymentMethodForm = this.formBuilder.group({
  paymentMethod:['',Validators.required]
})

get paymentMethod(){
  return this.paymentMethodForm.controls.paymentMethod;
}

confirmCloseTable():void{
  if(this.paymentMethodForm.valid){
  var confirmText = "Seguro que desea cerrar la mesa?";
  this.confirmationService.confirmDialog(confirmText).subscribe({
    next:(confirmData)=>{
    this.confirmData = confirmData;
    if(this.confirmData){
      this.onCloseTable();
    }else{
      this.onSnackBarMessage("Cancelado!");
    }
  }
  });
  }else{
    this.onSnackBarMessage("Debes ingresar un metodo de pago.");
  }
}


onCloseTable() {
 if(this.paymentMethodForm.valid){
 this.payMethod = new PaymentMethodDto();
  this.payMethod = Object.assign(this.payMethod, this.paymentMethodForm.value)
  var restoTableId = Number(this.storageService.getTableIdAfterTableSelection());
  var workingDayId = Number(this.storageService.getCurrentWorkingDayId());
   
  this.restoTableService.closeTable(restoTableId,workingDayId, this.payMethod).subscribe({
    next: (tableData) => {
      this.tableClosedData = tableData;
     },
    error:(errorData)=>{
      this.onSnackBarMessage(errorData)
    },
    complete:()=>{
      this.onSnackBarMessage(this.tableClosedData);
      this.router.navigateByUrl('/home')
    }
  });
}else{
  this.onSnackBarMessage("Debes ingresar un metodo de pago.");
}
}

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(categories => this.categories = categories);
  }

  getRestoTableById(id: number) {
   
    this.restoTableService.getTableById(id).subscribe(restoTable => this.restoTable = restoTable);
  }

  getProductsByCategoryId(id: number) {
    this.categoryId = id;
    this.productService.getProductsByCategoryId(id).subscribe(products => this.products = products);
  }

  updateTablePrice() {
    this.restoTableService.updateTablePrice(Number(this.storageService.getTableIdAfterTableSelection())).subscribe(restoTable => this.restoTable = restoTable);
  }
  getAllOrdersByRestoTableId() {
    this.orderService.getAllOrdersbyRestoTableId(Number(this.storageService.getTableIdAfterTableSelection())).subscribe(orders => this.orders = orders);
  }

  getAllPaymentsMethods(){
    this.restoTableService.getAllPaymentsMethods().subscribe({
      next:(paymentData)=>{
        this.paymentMethods = paymentData;
        console.log(this.paymentMethod)
      },
      error:(errorData)=>{
        this.errorData = errorData;
        this.onSnackBarMessage(this.errorData);
      }
    })
  }

  
  reLoad() {
    this.router.navigate([this.router.url])
  }

  onSnackBarMessage(message:any){
   this.snackBar.open(message, 'Cerrar', {
        duration: 2500,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        
      });
}
}
