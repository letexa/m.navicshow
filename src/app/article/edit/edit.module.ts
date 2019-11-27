import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ArticleMenuModule } from '../../widget/article-menu/article.menu.module';
import { EditComponent } from './edit.component';
import { SpinnerModule } from '../../widget/spinner/spinner.module';

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArticleMenuModule,
    SpinnerModule,
    CKEditorModule
  ],
})

export class EditModule { }