import { Input, Component, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html'
})

export class PaginationComponent {

    /**
     * Количество записей на странице
     * 
     */
    private _limit: number;

    /**
     * Текущая странице
     * 
     */
    private _currentPage: number;

    /**
     * Общее количество записей
     * 
     */
    private _itemTotal: number;

    /**
     * Url для пагинатора
     * 
     */
    private _url: string;

    /**
     * Номера страниц для пагинатора
     * 
     */
    private numbers: Array<number>;

    /**
     * Количество кнопок в пагинаторе
     * 
     */
    private numbersLimit: number = 5;

    /**
     * Номер предыдущей страницы
     * 
     */
    private previousNumber: number;

    /**
     * Номер следующей страницы
     * 
     */
    private nextNumber: number;

    /**
     * Всего страниц
     * 
     */
    private pagesTotal: number;

    @Input() 
    set currentPage(currentPage:number) {
        this._currentPage = currentPage;
    }

    @Input() 
    set itemTotal(itemTotal:number) {
        this._itemTotal = itemTotal;
    }

    @Input()
    set limit(limit:number) {
        this._limit = limit;
    }

    @Input()
    set url(url:string) {
        this._url = url;
    }

    get limit():number {
        return this._limit;
    }

    get currentPage():number {
        return this._currentPage;
    }

    get itemTotal():number {
        return this._itemTotal;
    }

    get url():string {
        return this._url;
    }

    ngOnChanges(changes: SimpleChanges) {
        // Проверяем, изменились ли переменные
        let change = false;
        for (let propName in changes) {
            if (
                ( propName === 'currentPage' ||
                  propName === 'itemTotal' ||
                  propName === 'limit' ) &&
                changes[propName].previousValue !== changes[propName].currentValue
            ) {
                change = true;
            }
        }

        if (change && this._itemTotal && this._limit && this._currentPage) {

            this.pagesTotal = Math.ceil(this._itemTotal / this._limit);

            this.numbers = new Array();

            let i = 1;
            if (this._currentPage > this.numbersLimit - 2) {
                i = this._currentPage - (this.numbersLimit - 2) + 1;
            }
            if (i > (this.pagesTotal - this.numbersLimit) + 1) {
                i = (this.pagesTotal - this.numbersLimit) + 1;
            }
            i = i <= 0 ? 1 : i;

            for (let k = 1; k <= this.numbersLimit; k++, i++) {
                if (i <= this.pagesTotal) {
                    this.numbers.push(i);
                } else {
                    break;
                }
            }

            this.previousNumber = this.currentPage == 1 ? 0 : Number(this.currentPage) - 1;
            this.nextNumber = this.currentPage == this.pagesTotal ? 0 : Number(this.currentPage) + 1;
        }
    }
}
