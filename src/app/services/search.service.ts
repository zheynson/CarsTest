import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CarOwner} from '../models/car-owner';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {
  }

  search(): Observable<CarOwner[]> {
    return this.http.get<CarOwner[]>(`api/users`);
  }

  searchUser(id): Observable<CarOwner> {
    return this.http.get<CarOwner>(`api/users/${id}`);
  }

  postUser(todo: CarOwner): Observable<CarOwner> {
    return this.http.post<CarOwner>('api/users', todo);
  }

  editUser(todo: CarOwner ): Observable<CarOwner> {
    return this.http.put<CarOwner>(`api/users`, todo);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`api/users/${id}`);
  }


}
