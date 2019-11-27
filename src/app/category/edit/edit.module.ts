import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CategoryMenuModule } from '../../widget/category-menu/category.menu.module';
import { EditComponent } from './edit.component';

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryMenuModule
  ],
})

export class EditModule { }