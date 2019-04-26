import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from '../../../environments/environment';
import { ReturnModel } from '../models/return.model';
import { TypedResponse } from '../models/base';
const BASE_URL = env.serverUrl;
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private httpClient: HttpClient) { }

  private objectToQueryParameter(obj: any): HttpParams {
    let params: HttpParams = new HttpParams();
        for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            params = params.set(key, element);
        }
    }
    return params;
}

  public get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.httpClient.get<T>(BASE_URL + path, {params}).pipe(map(res => res));
  }

  public getList<T>(path: string, params): Observable<TypedResponse<T>> {
    console.log(`${BASE_URL + path}`);
    return this.httpClient.get<TypedResponse<T>>(BASE_URL + path, {params}).pipe(map(res => res));
  }

  public post<T>(path: string, model: T): Observable<ReturnModel<T>> {
    return this.httpClient.post<ReturnModel<T>>(BASE_URL + path , model).pipe(map(res => res));
  }

  public postWithModel<T, X>(path: string, model: X): Observable<ReturnModel<T>> {
    return this.httpClient.post<ReturnModel<T>>(BASE_URL + path , model).pipe(map(res => res));
  }

  public put<T>(path: string, model: T): Observable<T> {
    return this.httpClient.put<T>(BASE_URL + path , model).pipe(map(res => res));
  }

  public delete<T>(path: string): Observable<T> {
    return this.httpClient.put<T>(BASE_URL + path, {}).pipe(map(res => res));
  }
  public deleteWithParams(path: string, id: string, headers: HttpHeaders = null): Observable<Boolean> {
    return this.httpClient.delete<Boolean>(BASE_URL + path + id).pipe(map(res => res));
  }



}
