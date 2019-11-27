import { NgModule } from '@angular/core';
import { CategoryRoutingModule } from '../../category/category-routing.module';
import { CategoryMenuComponent } from './category.menu.component';

@NgModule({
  declarations: [CategoryMenuComponent],
  imports: [
    CategoryRoutingModule,
  ],
  exports: [CategoryMenuComponent],
})

export class CategoryMenuModule { }