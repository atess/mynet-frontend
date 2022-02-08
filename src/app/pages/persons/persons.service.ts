import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, share} from "rxjs";
import {PersonRequest, PersonResponse, PersonsResponse} from "../../interfaces/data";

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  service: string = 'http://localhost:8181/api/person/';

  constructor(private http: HttpClient) {
  }

  get(page: number = 1): Observable<PersonsResponse> {
    return this.http.get<PersonsResponse>(this.service, {
      params: {
        page,
      }
    }).pipe(share());
  }

  find(id: number): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(this.service + id).pipe(share());
  }

  create(data: PersonRequest): Observable<PersonResponse> {
    return this.http.post<PersonResponse>(this.service, data).pipe(share());
  }

  update(id: number, data: PersonRequest): Observable<PersonResponse> {
    return this.http.put<PersonResponse>(this.service + id, data).pipe(share());
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.service + id).pipe(share());
  }
}
