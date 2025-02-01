import {Routes} from '@angular/router';
import {UserComponent} from "./components/user/user.component";
import {CategoryComponent} from "./components/category/category.component";
import {ProductComponent} from "./components/product/product.component";
import {NotFoundComponent} from "./components/error/not-found.component";
import {LayoutComponent} from "./components/home/layout/layout.component";
import {HomeComponent} from "./components/home/home.component";

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'user', component: UserComponent},
      {path: 'product', component: ProductComponent},
      {path: 'category', component: CategoryComponent},
    ]
  },
  {path: '**', component: NotFoundComponent},
];
