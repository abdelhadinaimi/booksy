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
  bookWithRating$ = new BehaviorSubject<any>(null);
  popularBooks$ = new BehaviorSubject<any>(null);
  recommandedBooks$ = new BehaviorSubject<any>(null);

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
   * Get the book by id.
   */

  getBook(id, rid = null): void {
    this.auth.accessToken$.subscribe(t => {
      const ridQuery = rid ? '?rid=' + rid : '';
      if (!t) {
        return this.httpClient.get<any>(`${environment.API_URL}books/${id}${ridQuery}`).subscribe(data => {
          this.book$.next(data);
        });
      } else {
        return this.httpClient.get<any>(`${environment.API_URL}books/${id}${ridQuery}`, {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + t)
        }).subscribe(data => {
          this.book$.next(data);
        });
      }
    });
  }

  /**
     * Get the book by id with rating .
     */
  getBookWithRating(id): void {
    this.auth.accessToken$.subscribe(t => {
      if (!t) {
        return this.httpClient.get<any>(environment.API_URL + 'books/' + id + '?short=true').subscribe(data => {
          this.bookWithRating$.next(data);
        });
      } else {
        return this.httpClient.get<any>(environment.API_URL + 'books/' + id + '?short=true', {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + t)
        }).subscribe(data => {
          this.bookWithRating$.next(data);
        });
      }
    });
  }

  /**
     * add a review to the book.
     */
  addReview(idBook, review, rid = null) {
    const ridQuery = rid ? '?rid=' + rid : '';
    return this.httpClient.put(environment.API_URL + 'books/' + idBook + '/reviews/', review,
      { headers: new HttpHeaders().set('Authorization', this._authHeader) });
  }

  /**
   * delete a review.
   */
  deleteReview(idBook) {
    return this.httpClient.delete(environment.API_URL + 'books/' + idBook + '/reviews/',
      { headers: new HttpHeaders().set('Authorization', this._authHeader) });
  }

  /**
   * get recommanded books
   */
  getRecommandedBooks(): void {
    this.auth.accessToken$.subscribe(t => {
      if (!t) {
        return this.httpClient.get<any>(`${environment.API_URL}books/recommendations`).subscribe(data => {
          this.recommandedBooks$.next(data);
        });
      } else {
        return this.httpClient.get<any>(`${environment.API_URL}books/recommendations`, {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + t)
        }).subscribe(data => {
          this.recommandedBooks$.next(data);
        });
      }
    });
  }


  /**
   * get popular books
   */
  getPopularBooks(): void {
    this.auth.accessToken$.subscribe(t => {
      if (!t) {
        return this.httpClient.get<any>(`${environment.API_URL}books/popular`).subscribe(data => {
          this.popularBooks$.next(data);
        });
      } else {
        return this.httpClient.get<any>(`${environment.API_URL}books/popular`, {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + t)
        }).subscribe(data => {
          this.popularBooks$.next(data);
        });
      }
    });
  }
}
