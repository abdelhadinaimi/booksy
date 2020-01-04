import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../../services/book.service/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  recommandedBooks = [];
  waitingForRecommanded: boolean;
  waitingForPopular: boolean;
  popularBooks = [];
  test: any;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.waitingForPopular = true;
    this.waitingForRecommanded = true;
    this.getRecommandedBooks();
    this.getPopularBooks();
  }

  getRecommandedBooks() {
    this.bookService.getRecommandedBooks();
    this.bookService.recommandedBooks$.subscribe(data => {
      if (!data) return;
      this.recommandedBooks = data.data.volumes;
      this.waitingForRecommanded = false;
    });
  }

  getPopularBooks() {
    this.bookService.getPopularBooks();
    this.bookService.popularBooks$.subscribe(data => {
      if (!data) return;
      this.popularBooks = data.items;
      this.waitingForPopular = false;
    });
  }

  print(id) {
    this.bookService.bookWithRating$.next(null);
    this.test = null;
    this.bookService.getBookWithRating(id);
    this.bookService.bookWithRating$.subscribe(data => {
      if (!data) return;
      this.test = data;
      if (this.test.volume.volumeInfo.description !== undefined)
        this.test.volume.volumeInfo.description = this.test.volume.volumeInfo.description.replace(/<\/?[^>]+>/ig, " ");

    })
  }
}
