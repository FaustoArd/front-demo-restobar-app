import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { LoginDto } from 'src/app/models/loginDto';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

private authError!:string;
private loginData!:LoginDto;

  constructor(private formBuilder: FormBuilder, private authenticationService:AuthenticationService,
    private storageService:StorageService,private snackBar:MatSnackBar, private router:Router){}


 

  loginForm = this.formBuilder.group({
    username:['',Validators.required],
    password:['', Validators.required]
  })

  get username(){
    return this.loginForm.controls.username;
  }

  get password(){
    return this.loginForm.controls.password;
  }

  onSubmit(){
    this.storageService.deleteToken();
    this.onLogin();

  }

  onLogin(){
    if(this.loginForm.valid){
      this.authenticationService.loginUser(this.loginForm.value as LoginDto).subscribe({
        next:(loginData)=>{
          this.loginData = loginData;
        this.storageService.setAuthToken(loginData.jwtToken);
        this.storageService.setCurrentUserId(String(loginData.id));
           },
        error:(errorData)=>{
          this.authError = errorData;
        
            this.snackBar.open(this.authError,'Cerrar',{
              duration:3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
              });
          
        },
        complete:()=>{
          if(this.loginData.jwtToken!=null){
          this.snackBar.open('Login exitoso!','Cerrar',{
            duration:3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
            });
            this.router.navigateByUrl('/home');
            this.loginForm.reset();
          }else{
            this.snackBar.open('Nombre de usuario o contraseña incorrecto!','Cerrar',{
              duration:3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
              });
          }
        }
      })
    }
  }
}
