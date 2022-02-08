import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, share} from "rxjs";
import {
  AddressesResponse,
  AddressResponse,
  PersonRequest,
} from "../../interfaces/data";

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  service: string = 'http://localhost:8181/api/address/';

  constructor(private http: HttpClient) {
  }

  get(personId: number, page: number = 1): Observable<AddressesResponse> {
    return this.http.get<AddressesResponse>(this.service, {
      params: {
        person_id: personId,
        page,
      }
    }).pipe(share());
  }

  find(id: number): Observable<AddressResponse> {
    return this.http.get<AddressResponse>(this.service + id).pipe(share());
  }

  create(data: PersonRequest): Observable<AddressResponse> {
    return this.http.post<AddressResponse>(this.service, data).pipe(share());
  }

  update(id: number, data: PersonRequest): Observable<AddressResponse> {
    return this.http.put<AddressResponse>(this.service + id, data).pipe(share());
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.service + id).pipe(share());
  }
}
