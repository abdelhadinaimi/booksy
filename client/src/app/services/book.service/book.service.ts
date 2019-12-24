import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private auth: AuthService ,private httpClient: HttpClient) { }

  private get _authHeader(): string {
    return `Bearer ${this.auth.accessToken}`;
  }
  /**
   * Get the project list.
   */
  getBooks(query): Observable<any[]> {
    return this.httpClient.get<any[]>(environment.API_URL + 'books?q='+query);
  }
  /**
   * Get the project.
   */
  getBook(id): Observable<any> {
    return this.httpClient.get<any>(environment.API_URL + 'books/' + id);
  }
}
