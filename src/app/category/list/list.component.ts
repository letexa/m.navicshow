import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Category } from '../category.model';
import { CategoryRest } from '../category.rest.service';
import { Rest } from "../../rest.model";

@AutoUnsubscribe()
@Component({
    templateUrl: './list.component.html'
})

export class ListComponent {

    private categories: Category[] = [];

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

    /**
     * Надо ли выводить спиннер
     */
    private isSpinner: boolean = false;

    private showCaterogies: boolean = false;

    /**
     * Список подписок
     */
    private subscriptions: Subscription = new Subscription();

    constructor(
        private repository: CategoryRest,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) { }

    get list() {
        return this.categories;
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

    public deleteCategory(id: number) {
        this.repository.delete(id, res => {
            if (res.code === 200) {
                this.categories = this.categories.filter(item => item.id !== id);
                this.pageRendering(this.activeRoute);
                this.count -= 1;
            }
        });
    }

    /**
     * Запрос списка категорий в зависимости от текущей страницы
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
                                this.showCaterogies = true;
                                this.categories = Object.keys(data.message).map(key => ({
                                    id: data.message[key].id,
                                    name: data.message[key].name,
                                    created: data.message[key].created,
                                    updated: data.message[key].updated
                                }));
                            }
                        });
                }
            })
        );
    }

    /**
     * Показывает спиннер загрузки.
     * Выводится, если категорий нет больше одной секунды.
     * Спиннер показывать не меньше секунды, чтобы не было мимолетного показа
     * и дерганий страницы.
     * 
     */
    private showSpinner() {
        let timer = 0;
        const categoriesInterval = setInterval(() => {
            timer += 100;
            if (timer >= 1000 && this.categories.length === 0) {
                this.showCaterogies = false;
                this.isSpinner = true;
                clearInterval(categoriesInterval);
                const spinnerInterval = setInterval(() => {
                    timer += 100;
                    if (timer >= 1000 && this.categories.length > 0) {
                        this.isSpinner = false;
                        this.showCaterogies = true;
                        clearInterval(spinnerInterval);
                    }
                }, 100);
            }
        }, 100);
    }
}
