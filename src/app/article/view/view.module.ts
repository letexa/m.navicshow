import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleMenuModule } from '../../widget/article-menu/article.menu.module';
import { ViewComponent } from './view.component';
import { SpinnerModule } from '../../widget/spinner/spinner.module';

@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    ArticleMenuModule,
    SpinnerModule
  ],
})

export class ViewModule { }