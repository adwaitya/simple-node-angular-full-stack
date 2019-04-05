import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LoginModel } from '../models/login.model';
import { Observable } from 'rxjs';

import { LoggedInUserModel } from '../models/logged-in-user.model';
import { ReturnModel } from '../models/return.model';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private apiService: ApiService) { }

  login(userModel: LoginModel): Observable<ReturnModel<LoggedInUserModel>> {
    return this.apiService.postWithModel<LoggedInUserModel, LoginModel>('auth/signin', userModel);
  }

  registration(user: User): Observable<ReturnModel<LoggedInUserModel>> {
    return this.apiService.postWithModel<LoggedInUserModel, User>('api/users', user);
  }
}
