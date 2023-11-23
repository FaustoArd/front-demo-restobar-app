import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule} from '@angular/material/toolbar'
import { MatInputModule} from '@angular/material/input'
import { MatDialogModule} from '@angular/material/dialog'
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from '@angular/material/checkbox'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DialogTemplateComponent } from './components/dialog/dialog-template-component/dialog-template-component';
import { RestoComponent } from './components/pages/resto/resto.component';
import { TableManagementComponent } from './components/pages/table-management/table-management.component';
import { WorkingDayComponent } from './components/pages/working-day/working-day.component';
import { CategoryViewComponent } from './components/pages/category/category-view/category-view.component';
import { CategoryNewComponent } from './components/pages/category/category-new/category-new.component';
import { ProductViewComponent } from './components/pages/product/product-view/product-view.component';
import { ProductNewComponent } from './components/pages/product/product-new/product-new.component';
import { ProductEditComponent } from './components/pages/product/product-edit/product-edit.component';
import { StockComponent } from './components/pages/stock/stock/stock.component';
import { IngredientViewComponent } from './components/pages/ingredient/ingredient-view/ingredient-view.component';
import { IngredientNewComponent } from './components/pages/ingredient/ingredient-new/ingredient-new.component';




@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    DialogTemplateComponent,
    RestoComponent,
    TableManagementComponent,
    WorkingDayComponent,
    CategoryViewComponent,
    CategoryNewComponent,
    ProductViewComponent,
    ProductNewComponent,
    ProductEditComponent,
    StockComponent,
    IngredientViewComponent,
    IngredientNewComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true,
    
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
