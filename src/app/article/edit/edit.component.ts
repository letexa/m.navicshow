import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs";
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ArticleFormGroup } from './form.model';
import { ArticleRest } from '../article.rest.service';
import { Article } from '../article.model';
import { Category } from '../../category/category.model';
import { CategoryRest } from '../../category/category.rest.service';
import { Rest } from '../../rest.model';

@AutoUnsubscribe()
@Component({
    templateUrl: './edit.component.html'
})

export class EditComponent {

    private isEdit: boolean = false;

    private formSubmitted: boolean = false;

    private formGroup: ArticleFormGroup = new ArticleFormGroup();

    private article: Article;

    private categories: Category[];

    private showForm: boolean = false;

    private Editor = ClassicEditor;

    private editorConfig: any;

     /**
     * Список подписок
     */
    private subscriptions: Subscription = new Subscription();

    constructor(
        private articleRest: ArticleRest,
        private categoryRest: CategoryRest,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {
        this.editorConfig = {
            ckfinder: {
               uploadUrl: articleRest.getUploadsUrl(),
            }
         };
    }

    ngOnInit() {
        this.categoryRest.all()
            .toPromise()
            .then((data: Rest) => {
                if (data.code === 200 && data.message) {
                    this.showForm = true;
                    this.categories = Object.keys(data.message).map(key => ({
                        id: data.message[key].id,
                        name: data.message[key].name,
                        created: data.message[key].created,
                        updated: data.message[key].updated
                    }));

                    this.subscriptions.add(
                        this.activeRoute.params.subscribe(params => {
                            if (params.id !== undefined) {
                                this.isEdit = true;
                                this.articleRest.get(params.id)
                                    .toPromise()
                                    .then((data: Rest) => {
                                        if (data.code === 200 && data.message) {
                                            this.article = new Article();
                                            this.article.id = data.message.id;
                                            this.article.title = data.message.title;
                                            this.article.text = data.message.text;
                                            this.article.categoryId = data.message.category_id;
                                            this.article.created = data.message.created;
                                            this.article.updated = data.message.updated;
                                            this.formGroup.setValue({
                                                title: this.article.title,
                                                categoryId: this.article.categoryId,
                                                text: this.article.text
                                            });
                                        }
                                    });
                            }
                        })
                    );
                }
            });
    }

    ngOnDestroy() { }

    submitForm(form: NgForm) {
        this.formSubmitted = true;
        if (this.formGroup.valid) {
            this.article = this.article ? this.article : new Article();
            this.article.title = form.value.title;
            this.article.categoryId = form.value.categoryId;
            this.article.text = form.value.text;
            if (!this.isEdit) {
                this.articleRest.add(this.article, (res) => {
                    if (res.code && res.code === 200) {
                        this.router.navigateByUrl('/article');
                    }
                });
            } else {
                this.articleRest.update(this.article, (res) => {
                    if (res.code && res.code === 200) {
                        this.router.navigateByUrl('/article/view/' + this.article.id);
                    }
                });
            }
        }
    }
}
