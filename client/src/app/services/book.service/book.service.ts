import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  book$ = new BehaviorSubject<any>(null);

  constructor(private auth: AuthService, private httpClient: HttpClient) { }

  private get _authHeader(): string {
    return `Bearer ${this.auth.accessToken}`;
  }
  /**
   * Get the project list.
   */
  getBooks(query): Observable<any[]> {
    return this.httpClient.get<any[]>(environment.API_URL + 'books?q=' + query);
  }
  /**
   * Get the project.
   */
  /*getBook(id): Observable<any> {
    return this.httpClient.get<any>(environment.API_URL + 'books/' + id);
  }*/

  getBook(id): void {
    this.auth.accessToken$.subscribe(t => {
      if (!t) {
        return this.httpClient.get<any>(environment.API_URL + 'books/' + id).subscribe(data => {
          this.book$.next(data);
        })
      }
      else {
        return this.httpClient.get<any>(environment.API_URL + 'books/' + id, {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + t)
        }).subscribe(data => {
          this.book$.next(data);
        })
      }
    })
  }

  addReview(idBook, review) {
    return this.httpClient.put(environment.API_URL + 'books/' + idBook + '/reviews/', review,
      { headers: new HttpHeaders().set('Authorization', this._authHeader) });
  }

  deleteReview(idBook) {
    return this.httpClient.delete(environment.API_URL + 'books/' + idBook + '/reviews/',
      { headers: new HttpHeaders().set('Authorization', this._authHeader) });
  }
}
