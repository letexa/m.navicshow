import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Article } from '../article.model';
import { ArticleRest } from '../article.rest.service';
import { Rest } from '../../rest.model';

@AutoUnsubscribe()
@Component({
    templateUrl: './list.component.html'
})

export class ListComponent {

    private articles: Article[] = [];

    /**
     * Надо ли выводить спиннер
     */
    private isSpinner: boolean = false;

    private showArticles: boolean = false;

    /**
     * Список подписок
     */
    private subscriptions: Subscription = new Subscription();

    /**
     * Номер текущей страницы
     */
    private page: number;

    /**
     * Всего категорий
     */
    private count: number;

    /**
     * Количество записей на странице
     */
    private limit: number;

    constructor(
        private repository: ArticleRest,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) { }

    get list() {
        return this.articles;
    }

    ngOnInit() {
        this.limit = this.repository.limit;

        this.pageRendering(this.activeRoute);

        this.repository.count()
            .toPromise()
            .then((data: Rest) => {
                if (data.code === 200 && data.message) {
                    this.count = Number(data.message);
                }
            });

        this.subscriptions.add(
            this.router.events.subscribe((event) => {
                this.pageRendering(this.activeRoute);
            })
        );
    }

    ngOnDestroy() { }

    public deleteArticle(id: number) {
        this.repository.delete(id, res => {
            if (res.code === 200) {
                this.articles = this.articles.filter(item => item.id !== id);
                this.pageRendering(this.activeRoute);
                this.count -= 1;
            }
        });
    }

    /**
     * Запрос списка статей в зависимости от текущей страницы
     * @param activeRoute ActivatedRoute
     */
    private pageRendering(activeRoute: ActivatedRoute) {

        this.showSpinner();

        this.subscriptions.add (
            activeRoute.params.subscribe(params => {

                let isUpdate = false;

                if (params.page && this.page !== params.page) {
                    this.page = params.page;
                    isUpdate = true;
                } else {
                    this.page = this.page ? this.page : 1;
                }
                
                if (isUpdate || this.page === 1) {
                    this.repository.all(this.page)
                        .toPromise()
                        .then((data: Rest) => {
                            if (data.code === 200 && data.message) {
                                this.isSpinner = false;
                                this.showArticles = true;
                                this.articles = Object.keys(data.message).map(key => ({
                                    id: data.message[key].id,
                                    title: data.message[key].title,
                                    preview: data.message[key].preview,
                                }));
                            }
                        });
                }
            })
        );
    }

    /**
     * Показывает спиннер загрузки.
     * Выводится, если статей нет больше одной секунды.
     * Спиннер показывать не меньше секунды, чтобы не было мимолетного показа
     * и дерганий страницы.
     * 
     */
    private showSpinner() {
        let timer = 0;
        const articleInterval = setInterval(() => {
            timer += 100;
            if (timer >= 1000 && this.articles.length === 0) {
                this.showArticles = false;
                this.isSpinner = true;
                clearInterval(articleInterval);
                const spinnerInterval = setInterval(() => {
                    timer += 100;
                    if (timer >= 1000 && this.articles.length > 0) {
                        this.isSpinner = false;
                        this.showArticles = true;
                        clearInterval(spinnerInterval);
                    }
                }, 100);
            }
        }, 100);
    }
}
