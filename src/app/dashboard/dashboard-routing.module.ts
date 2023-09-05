import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { IsSuperAdminGuard } from 'src/app/guards/is-superadmin.guard';
import { CartComponent } from 'src/app/dashboard/product/buyer/cart/cart.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: "product", loadChildren: () => import('./product/product.module').then(m => m.ProductModule),canActivate:[AuthGuard] },
      { path: "user", loadChildren: () => import('./user/user.module').then(m => m.UserModule),canActivate:[IsSuperAdminGuard]},
      { path: 'dashboard/product/cart', component: CartComponent , canActivate:[AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
