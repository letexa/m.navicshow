import { NgModule } from "@angular/core";
import { CategoryRoutingModule } from "./category-routing.module";
import { ListModule } from "./list/list.module";
import { EditModule } from "./edit/edit.module";
import { CategoryRest } from "./category.rest.service";

@NgModule({
  imports: [
    CategoryRoutingModule,
    ListModule,
    EditModule,
  ],
  providers: [
    CategoryRest
  ],
})

export class CategoryModule { }