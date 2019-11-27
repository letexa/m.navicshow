import { Injectable } from "@angular/core";
import { Category } from "./category.model";
import { RestService } from "../rest.service";
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { Rest } from "../rest.model";

@Injectable()
export class CategoryRest {

    public limit: number;

    private config: any;

    constructor(private rest: RestService) {
      this.config = AppConfig.settings.category;
      this.limit = this.config.limit;
    }

    /**
     * Все категории
     * 
     * @param page Номер страницы
     */
    all(page: number|null = null): Observable<any> {
      let params: any = {};
      if (page !== null) {
        params = {
          limit: this.limit,
          offset: page
        };
      }
      return this.rest.get('category/list', params);
    }

    /**
     * Сколько всего категорий в базе
     */
    count() {
      return this.rest.get('category/count');
    }

    /**
     * Добавление категории
     * @param newCategory ./category.model
     */
    add(newCategory: Category, callback: (res: Rest) => void) {
      this.rest.put('category/create', { name: newCategory.name })
        .subscribe((res) => {
          const response = new Rest();
          Object.keys(res).map(key => {
            response[key] = res[key];
          });
          callback(res);
        });
    }

    /**
     * Обновление категории
     * @param category ./category.model
     */
    update(category: Category, callback: (res: Rest) => void) {
      this.rest.patch('category/update', { id: category.id, name: category.name })
        .subscribe((res) => {
          const response = new Rest();
          Object.keys(res).map(key => {
            response[key] = res[key];
          });
          callback(res);
        });
    }

    delete(id: number, callback: (res: Rest) => void) {
      this.rest.delete('category/delete', { id: id })
        .subscribe((res) => {
          const response = new Rest();
          Object.keys(res).map(key => {
            response[key] = res[key];
          });
          callback(res);
        });
    }

    get(id: number): Observable<any> {
      return this.rest.get('category/' + id);
    }
}