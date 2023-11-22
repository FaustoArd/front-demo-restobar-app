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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component:LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path:'table-management', component:TableManagementComponent },
  { path:'working-day', component:WorkingDayComponent },
  { path:'category-view', component:CategoryViewComponent},
  { path:'category-new',component:CategoryNewComponent},
  {path: 'product-view', component:ProductViewComponent},
  { path:'product-new', component:ProductNewComponent},
  { path:'product-edit/:id', component:ProductEditComponent},
  { path:'stock',component:StockComponent},
  { path:'ingredient-view', component:IngredientViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
