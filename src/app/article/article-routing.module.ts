import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
    { path: '', component: ListComponent},
    { path: 'add', component: EditComponent},
    { path: ':page', component: ListComponent },
    { path: 'edit/:id', component: EditComponent },
    { path: 'view/:id', component: ViewComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticleRoutingModule { }
