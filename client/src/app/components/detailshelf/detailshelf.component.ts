import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookshelfService } from '../../services/bookshelf.service/bookshelf.service';
import { parse } from 'querystring';

@Component({
  selector: 'app-detailshelf',
  templateUrl: './detailshelf.component.html',
  styleUrls: ['./detailshelf.component.scss']
})
export class DetailshelfComponent implements OnInit {
  shelfID: any;
  shelf: any;
  deletedBook: any;
  readPages: number;
  updatedBook: any;
  shelves = [];
  waitForMove: boolean = false;
  movedBook: any;
  currentCount: number;
  filterContent;
  books: any;


  constructor(private router: ActivatedRoute, private shelfService: BookshelfService) { }

  ngOnInit() {
    this.router.params.subscribe(
      params => {
        this.shelfID = params['shelfId'];
        if (this.shelfID)
          this.getShelf(this.shelfID);
        this.getShelves();
      }
    );

  }

  getShelves() {
    this.shelfService.getShelvesForBook();
    this.shelfService.shelvesForBook$.subscribe(data => {
      if (!data) return;
      this.shelves = data.filter(e => e._id !== this.shelfID)
    });
  }
  getShelf(id) {
    this.shelfService.getShelf(id);
    this.shelfService.oneShelve$.subscribe(data => {
      if (!data) return;
      this.shelf = data;
      this.books = data.books;
    })
  }

  setIDTodelete(id) {
    this.deletedBook = id;
  }

  deleteBookFromShelf() {
    this.shelfService.deleteBookFromShelf(this.shelfID, this.deletedBook).subscribe(data => {
      this.getShelf(this.shelfID);
      this.shelfService.getShelves(false);
    })
  }

  setIDToUpdate(n, id, count) {
    this.currentCount = parseInt(count);
    this.readPages = parseInt(n);
    this.updatedBook = id;
  }

  updateReadPages() {
    if (!this.readPages || (this.readPages > this.currentCount)) return;
    this.shelfService.updateReadPages(this.shelfID, this.updatedBook, this.readPages).subscribe(data => {
      this.getShelf(this.shelfID);
      this.shelfService.getShelves(false);
    })
  }

  moveToShelf(newShelf, movedBook) {
    this.movedBook = movedBook;
    this.waitForMove = true;
    this.shelfService.deleteBookFromShelf(this.shelfID, movedBook).subscribe(data => {
      this.shelfService.addBookToShelf(newShelf, movedBook).subscribe(data => {
        this.getShelf(this.shelfID);
        this.shelfService.getShelves(false);
        this.waitForMove = false;
      });
    })

  }

  setProgress(read, count) {
    let styles = {
      'width': Math.ceil(parseInt(read) * 100 / parseInt(count)) + '%',
    };
    return styles;
  }

  filterBooks(content) {
    content = content.toLowerCase();
    if (content === "") {
      this.books = this.shelf.books;
    }
    else {
      this.books = this.shelf.books.filter(b => b.book.volumeInfo.title.toLowerCase().includes(content)
        || b.book.volumeInfo.authors.join(',').toLowerCase().includes(content));
    }
  }
}
