import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookshelfService {
  shelves$ = new BehaviorSubject<any[]>([]);
  constructor(private auth: AuthService, private httpClient: HttpClient) { }

  private get _authHeader(): string {
    return `Bearer ${this.auth.accessToken}`;
  }
  /**
   * Get all shelves.
   */
  getShelves(): void {
    this.auth.accessToken$.subscribe(t => {
      if(!t) return;
      return this.httpClient.get<any[]>(environment.API_URL + 'bookshelves', {
        headers: new HttpHeaders().set('Authorization','Bearer '+t)
      }).subscribe(data => {
        this.shelves$.next(data);
      })
    })
    
  }

  /**
    * Get shelf by id
    * 
    */
  getShelf(id): Observable<any> {
    return this.httpClient.get<any>(environment.API_URL + 'bookshelves/' + id, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    });
  }

  /**
     * Get shelf by id
     * 
     */
  createShelf(shelf): Observable<any> {
    return this.httpClient.put(environment.API_URL + 'bookshelves', shelf, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    });
  }

  /**
    * Get shelf by id
    * 
    */
  deleteShelf(id): Observable<any> {
    return this.httpClient.delete(environment.API_URL + 'bookshelves/' + id, {
      headers: new HttpHeaders().set('Authorization', this._authHeader)
    });
  }
}
