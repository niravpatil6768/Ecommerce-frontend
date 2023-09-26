import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule ,DatePipe } from '@angular/common';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { AddProductComponent } from './seller/add-product/add-product.component';
import { ProductListComponent } from './seller/product-list/product-list.component';
import { CartComponent } from './buyer/cart/cart.component';
import { UpdateProductComponent } from './seller/update-product/update-product.component';


@NgModule({
  declarations: [
    ProductComponent,
    AddProductComponent,
    ProductListComponent,
    CartComponent,
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,

    ProductRoutingModule,
    
  ],
  providers:[DatePipe]
})
export class ProductModule { }
