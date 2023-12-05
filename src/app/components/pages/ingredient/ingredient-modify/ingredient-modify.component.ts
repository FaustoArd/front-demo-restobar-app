import { Component, OnInit } from '@angular/core';
import { IngredientDto } from 'src/app/models/ingredientDto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IngredientService } from 'src/app/services/ingredient.service';
import { CategoryDto } from 'src/app/models/categoryDto';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-ingredient-modify',
  templateUrl: './ingredient-modify.component.html',
  styleUrls: ['./ingredient-modify.component.css']
})
export class IngredientModifyComponent implements OnInit {
  ingredient!: IngredientDto;
  udpatedIngredient!:IngredientDto;
  ingredientsCategory:CategoryDto[]= [];
  errorData!:string;
  category!:CategoryDto;

  constructor(private ingredientService: IngredientService,
    private snackBar: MatSnackBar, private formBuilder: FormBuilder,private route:ActivatedRoute,private router: Router) {
  }


  ingredientFormBuilder = this.formBuilder.group({

    id:[0],
    ingredientName: ['', Validators.required],
    ingredientAmount: [0, Validators.required],
    categoryId: [0, Validators.required]

  });

  ngOnInit(): void {
    this.getIngredientById();
    this.getIngredientCategories();
}

  onUpdateIngredientShow():void{
    this.ingredientFormBuilder.patchValue({
      id:this.ingredient?.id,
      ingredientName:this.ingredient?.ingredientName,
      categoryId:this.ingredient?.categoryId,
      ingredientAmount:this.ingredient?.ingredientAmount
    })
  }

  get ingredientName(){
    return this.ingredientFormBuilder.controls.ingredientName;
  }
  get ingredientAmount(){
    return this.ingredientFormBuilder.controls.ingredientAmount;
  }
  get categoryId(){
    return this.ingredientFormBuilder.controls.categoryId;
  }

getIngredientById(){
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.ingredientService.getIngredientById(id).subscribe({
    next:(ingredientData)=>{
      this.ingredient = ingredientData;
      this.onUpdateIngredientShow();
    },
    error:(errorData)=>{
      this.errorData = errorData;
      this.onSnackBarMessage(this.errorData);
    }
  })
}

onUpdateIngredient(){
  this.udpatedIngredient = new IngredientDto();
  this.udpatedIngredient = Object.assign(this.udpatedIngredient, this.ingredientFormBuilder.value)
  this.ingredientService.updateIngredient(this.udpatedIngredient).subscribe({
    next:(ingredientData)=>{
     this.udpatedIngredient = ingredientData;
    },
    error:(errorData)=>{
      this.errorData = errorData;
      this.onSnackBarMessage(this.errorData);
    },
    complete:()=>{
      this.onSnackBarMessage("Ingrediente actualizado!")
      this.router.navigateByUrl('ingredient-view')

    }
  })
}

getIngredientCategories():void{
  this.ingredientService.getAllIngredientCategories().subscribe(cats => this.ingredientsCategory = cats);
}


  onSnackBarMessage(message:any){
    this.snackBar.open(message, 'Cerrar', {
         duration: 2500,
         verticalPosition: 'top',
         horizontalPosition: 'center',
         
       });
  }
}
