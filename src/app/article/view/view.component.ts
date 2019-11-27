import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { ArticleRest } from '../article.rest.service';
import { Rest } from '../../rest.model';
import { Article } from '../article.model';

@AutoUnsubscribe()
@Component({
    templateUrl: './view.component.html'
})

export class ViewComponent {

    private article: Article = new Article();

    private show: boolean = false;

    constructor(
        private activeRoute: ActivatedRoute,
        private articleRest: ArticleRest
    ) {}

    /**
     * Список подписок
     */
    private subscriptions: Subscription = new Subscription();

    ngOnInit() {
        this.subscriptions.add(
            this.activeRoute.params.subscribe(params => {
                if (params.id !== undefined) {
                    this.articleRest.get(params.id)
                        .toPromise()
                        .then((data: Rest) => {
                            if (data.code === 200 && data.message) {
                                this.show = true;
                                this.article.id = data.message.id;
                                this.article.title = data.message.title;
                                this.article.text = data.message.text;
                                this.article.categoryId = data.message.category_id;

                                let updated = data.message.updated.date.split(' ');
                                updated = updated[0].split('-');
                                this.article.updated = new Date(Number(updated[0]), Number(updated[1]) - 1, Number(updated[2]) + 1);
                            }
                        });
                }
            })
        );
    }

    ngOnDestroy() { }
}