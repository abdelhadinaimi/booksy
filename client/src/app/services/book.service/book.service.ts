import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }


  /**
   * Get the project list.
   */
  getBooks(query): Observable<any[]> {
    return this.httpClient.get<any[]>(environment.API_URL + 'books?q='+query);
  }
}
