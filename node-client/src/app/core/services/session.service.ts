import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggedInUserModel } from '../models/logged-in-user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private currentUserSubject: BehaviorSubject<LoggedInUserModel>;
  public currentUser: Observable<LoggedInUserModel>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoggedInUserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    console.log('[Session Service]', this.currentUserSubject);
  }

  public  get currentUserValue(): LoggedInUserModel {
    console.log('this.currentUserSubject.value', this.currentUserSubject);
    return this.currentUserSubject.value;
  }

  public setCurrentUserValue(model: LoggedInUserModel ) {
    this.currentUserSubject.next(model);
  }

  public getHeaders(): HttpHeaders {
    const httpHeaders = new HttpHeaders;
    httpHeaders.append('Content-Type',  'application/json');
    const user = this.currentUserValue;
    if (user) {
       httpHeaders.append('Authorization' , user.token);
    }
    return httpHeaders;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.setCurrentUserValue(null);
    // this.currentUserSubject.next(null);
}
}
