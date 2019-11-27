import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfig } from './app.config';

@Injectable()
export class RestService {

  public apiServer: any;

  constructor(private http: HttpClient) {
    this.apiServer = AppConfig.settings.apiServer;
  }
  
  /**
   * Отправление GET запроса в api
   * @param data Объект с параметрами
   */
  get(uri: string, data?: object): Observable<object> {
    const httpOptions = {
      params: new HttpParams().set('authorization', this.apiServer.token)
    }

    if (data) {
      for (const key in data) {
        if (httpOptions.params.get(key)) {
          httpOptions.params = httpOptions.params.set(key, data[key]);
        } else {
          httpOptions.params = httpOptions.params.append(key, data[key]);
        }
      }
    }

    return this.http.get(
        this.apiServer.protocol + '://' + this.apiServer.host + '/' + uri,
        httpOptions
      ).pipe(
        catchError(this.handleError)
      );
  }

  put(uri: string, data: object): Observable<object> {
    const httpOptions = {
      params: new HttpParams().set('authorization', this.apiServer.token)
    }

    return this.http.put(
      this.apiServer.protocol + '://' + this.apiServer.host + '/' + uri, 
      data, 
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  patch(uri: string, data: object): Observable<object> {
    const httpOptions = {
      params: new HttpParams()
        .set('authorization', this.apiServer.token)
    }
    
    return this.http.patch(
      this.apiServer.protocol + '://' + this.apiServer.host + '/' + uri,
      data,
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  delete(uri: string, data: object): Observable<object> {
    const httpOptions = {
      params: new HttpParams().set('authorization', this.apiServer.token),
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: data
    };

    return this.http.delete(
      this.apiServer.protocol + '://' + this.apiServer.host + '/' + uri,
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
