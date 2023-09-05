import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { AddProductComponent} from './seller/add-product/add-product.component';
import { ProductListComponent } from './seller/product-list/product-list.component';
import { CartComponent } from './buyer/cart/cart.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: ProductComponent,
        children: [
            {path:"add", component: AddProductComponent},
            {path:"",component:ProductListComponent},
            {path:"cart",component:CartComponent,canActivate:[AuthGuard]},
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
