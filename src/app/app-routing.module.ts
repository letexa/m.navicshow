import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'article', loadChildren: './article/article.module#ArticleModule'},
  { path: 'category', loadChildren: './category/category.module#CategoryModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
