import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { TypedResponse } from '../models/base';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiService: ApiService,
    private httpClient: HttpClient) { }

  getAllUsers(): Observable<TypedResponse<User>> {
    console.log('get all users');
    const params = {page: 1, perpage: 10};
    return this.apiService.getList('api/users', params);
  }

  deleteUser(id: string): Observable<Boolean> {
    return this.apiService.deleteWithParams('api/users/', id);
  }
}
