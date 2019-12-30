import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookshelfService {
  shelves$ = new BehaviorSubject<any>(null);
  shelvesForBook$ = new BehaviorSubject<any[]>(null);
  oneShelve$ = new BehaviorSubject<any>(null);

  constructor(private auth: AuthService, private httpClient: HttpClient) { }

  private get _authHeader(): string {
    return `Bearer ${this.auth.accessToken}`;
  }
  /**
   * Get all shelves.
   */
  getShelves(redirect: boolean): void {
    this.auth.accessToken$.subscribe(t => {
      if (!t) return;
      return this.httpClient.get<any[]>(environment.API_URL + 'bookshelves', {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + t)
      }).subscribe(data => {
        this.shelves$.next({ data, redirect });
      })
    })

  }

  getShelvesForBook(): void {
    this.auth.accessToken$.subscribe(t => {
      if (!t) return;
      return this.httpClient.get<any[]>(environment.API_URL + 'bookshelves', {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + t)
      }).subscribe(data => {
        this.shelvesForBook$.next(data);
      })
    })

  }

  /**
    * Get shelf by id
    * 
    */
  getShelf(id): void {
    this.auth.accessToken$.subscribe(t => {
      if (!t) return;
      return this.httpClient.get<any>(environment.API_URL + 'bookshelves/' + id, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + t)
      }).subscribe(data => {
        this.oneShelve$.next(data);
      })
    })

  }

  /**
     * create shelf
     * 
     */
  createShelf(shelf): Observable<any> {
    return this.httpClient.put(environment.API_URL + 'bookshelves', shelf, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    });
  }

  /**
    * delete shelf by id
    * 
    */
  deleteShelf(id): Observable<any> {
    return this.httpClient.delete(environment.API_URL + 'bookshelves/' + id, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    });
  }

  /**
    * add book to shelf
    * 
    */
  addBookToShelf(idShelf, bookId): Observable<any> {
    return this.httpClient.put(environment.API_URL + 'bookshelves/' + idShelf + '/books', { bookId }, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    });
  }

  /**
      * delete book from shelf
      * 
      */
  deleteBookFromShelf(idShelf, bookId): Observable<any> {
    return this.httpClient.delete(environment.API_URL + 'bookshelves/' + idShelf + '/books/' + bookId, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    });
  }

  /**
      * update read pages in shelved book
      * 
      */
  updateReadPages(idShelf, bookId, numberOfReadPages): Observable<any> {
    return this.httpClient.post(environment.API_URL + 'bookshelves/' + idShelf + '/books/' + bookId, {numberOfReadPages}, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    });
  }
}
