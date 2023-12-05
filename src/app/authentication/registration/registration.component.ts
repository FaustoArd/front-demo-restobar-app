import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegistrationDto } from 'src/app/models/registrationDto';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

registrationDto!:RegistrationDto;
regData!:RegistrationDto;
errorData!:string;

  constructor(private authenticationService:AuthenticationService,private snackBar:MatSnackBar
    ,private formBuilder:FormBuilder,private router:Router){}


    registrationForm = this.formBuilder.group({

      name: ['',Validators.required],
      lastname: ['',Validators.required],
      username:['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required],
    
    });

    get name(){
      return this.registrationForm.controls.name;
    }
    get lastname(){
      return this.registrationForm.controls.lastname;
    }

    get username(){
      return this.registrationForm.controls.username;
    }
    get email(){
      return this.registrationForm.controls.email;
    }
    get password(){
      return this.registrationForm.controls.password;
    }
    
    onSubmit(){
      this.onRegister();
    }

    onRegister():void{
      if(this.registrationForm.valid){
        console.log(this.registrationForm.value)
        this.registrationDto = new RegistrationDto();
        this.registrationDto = Object.assign(this.registrationDto,this.registrationForm.value);

        this.authenticationService.registerUser(this.registrationDto).subscribe({
          next:(regData)=>{
            this.regData = regData;
          },
          error:(errorData)=>{
            this.errorData = errorData;
            this.onSnackBarMessage(this.errorData);
          },
          complete:()=>{
            this.onSnackBarMessage("Registro exitoso, gracias " + this.regData.name + "!");
            this.router.navigateByUrl("/login")

          }
        })

      }
     
    }

    onSnackBarMessage(message:string){
      this.snackBar.open(message,'Cerrar',{
        duration:3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
        });
    }
}
