import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleMenuModule } from '../../widget/article-menu/article.menu.module';
import { ListComponent } from './list.component';
import { ArticleRoutingModule } from '../article-routing.module';
import { SpinnerModule } from '../../widget/spinner/spinner.module';
import { PaginationModule } from '../../widget/pagination/pagination.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ArticleMenuModule,
    SpinnerModule,
    PaginationModule,
    ArticleRoutingModule
  ],
})

export class ListModule { }