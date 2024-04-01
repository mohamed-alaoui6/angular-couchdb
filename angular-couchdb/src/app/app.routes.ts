import { Routes } from '@angular/router';
import path from 'node:path';
import { ProductsComponent } from './products/products.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { LoginComponent } from './login/login.component';
import { AdmintemplateComponent } from './admintemplate/admintemplate.component';
import { authenticationGuard } from './guards/authentication.guard';
import { CartComponent } from './cart/cart.component';
import { CategorieComponent } from './categorie/categorie.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
 {path:'productdetails',component:ProductdetailsComponent},
{path:'login',component:LoginComponent},
{path:'admin',component:AdmintemplateComponent,canActivate:[authenticationGuard],children:[{path : 'products' ,
component: ProductsComponent},{ path: 'cart', component: CartComponent },{path: 'categorie/:category', component: CategorieComponent},
{path:'navbar',component:NavbarComponent},

]},
{path:'',component:LoginComponent},


];
