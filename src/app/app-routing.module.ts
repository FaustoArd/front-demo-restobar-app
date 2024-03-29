import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
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
import { IngredientModifyComponent } from './components/pages/ingredient/ingredient-modify/ingredient-modify.component';
import { IngredientMixComponent } from './components/pages/ingredient-mix/ingredient-mix.component';
import { EmployeeManagerComponent } from './components/pages/employee-manager/employee-manager.component';
import { EmployeeComponent } from './components/pages/employee/employee/employee.component';
import { StatisticMainComponent } from './components/pages/statistic/statistic-main/statistic-main.component';
import { StatsEmployeesComponent } from './components/pages/statistic/stats-employees/stats-employees.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { TablesClosedComponent } from './components/pages/statistic/tables-closed/tables-closed.component';
import { IngredientCategoryComponent } from './components/pages/category/ingredient-category/ingredient-category.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component:LoginComponent },
  { path:'register',component:RegistrationComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path:'table-management', component:TableManagementComponent },
  { path:'working-day', component:WorkingDayComponent },
  { path:'category-view', component:CategoryViewComponent },
  { path:'category-new',component:CategoryNewComponent },
  { path:'ingredient-category', component:IngredientCategoryComponent},
  { path: 'product-view', component:ProductViewComponent },
  { path:'product-new', component:ProductNewComponent },
  { path:'product-edit/:id', component:ProductEditComponent },
  { path:'stock',component:StockComponent },
  { path:'ingredient-view', component:IngredientViewComponent },
  { path:'ingredient-new',component:IngredientNewComponent },
  { path:'ingredient-edit',component:IngredientViewComponent },
  { path:'ingredient-modify/:id',component:IngredientModifyComponent },
  { path:'ingredient-mix', component:IngredientMixComponent },
  { path:'employee-manager', component:EmployeeManagerComponent },
  { path:'employee-new', component:EmployeeComponent },
  { path:'statistic-main',component:StatisticMainComponent},
  { path:'stats-employees/:id', component:StatsEmployeesComponent},
  { path:'stats-tables/:id', component:TablesClosedComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
