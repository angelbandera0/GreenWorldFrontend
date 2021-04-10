import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { ShopComponent } from './shop/shop.component';


@NgModule({
  declarations: [
    ShopComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule
  ]
})
export class CmsModule { }
