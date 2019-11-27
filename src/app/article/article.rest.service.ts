import { Injectable } from '@angular/core';
import { Article } from './article.model';
import { RestService } from '../rest.service';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { Rest } from '../rest.model';

@Injectable()
export class ArticleRest {

    public limit: number;

    private config: any;

    constructor(private rest: RestService) {
        this.config = AppConfig.settings.article;
        this.limit = this.config.limit;
    }

    public getUploadsUrl(): string {
        return this.rest.apiServer.protocol +
          '://' +
          this.rest.apiServer.host +
          '/file/upload?authorization=' +
          this.rest.apiServer.token;
    }

    /**
     * Все статьи
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
        return this.rest.get('article/list', params);
    }

    /**
     * Сколько всего статей в базе
     */
    count() {
        return this.rest.get('article/count');
    }

    /**
     * Добавление статьи
     * @param newArticle ./article.model
     */
    add(newArticle: Article, callback: (res: Rest) => void) {
        this.rest.put('article/create', {
            title: newArticle.title,
            category_id: newArticle.categoryId,
            text: newArticle.text
        }).subscribe((res) => {
              const response = new Rest();
              Object.keys(res).map(key => {
                response[key] = res[key];
              });
              callback(res);
          });
    }

    /**
     * Обновление статьи
     * @param article ./article.model
     */
    update(article: Article, callback: (res: Rest) => void) {
        this.rest.patch('article/update', {
            id: article.id,
            title: article.title,
            category_id: article.categoryId,
            text: article.text
        }).subscribe((res) => {
            const response = new Rest();
            Object.keys(res).map(key => {
              response[key] = res[key];
            });
            callback(res);
        });
    }

    get(id: number): Observable<any> {
        return this.rest.get('article/' + id);
    }

    delete(id: number, callback: (res: Rest) => void) {
        this.rest.delete('article/delete', { id: id })
          .subscribe((res) => {
            const response = new Rest();
            Object.keys(res).map(key => {
              response[key] = res[key];
            });
            callback(res);
          });
      }
}