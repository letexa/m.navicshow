import { NgModule } from '@angular/core';
import { ArticleRoutingModule } from '../../article/article-routing.module';
import { ArticleMenuComponent } from './article.menu.component';

@NgModule({
  declarations: [ArticleMenuComponent],
  imports: [
    ArticleRoutingModule,
  ],
  exports: [ArticleMenuComponent],
})

export class ArticleMenuModule { }