import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  books = [];
  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchBooks(params['q']);
    });

  }

  searchBooks(q) {
    this.bookService.getBooks(q).subscribe(data => {
      this.books = data['items'];
      console.log(data['items']);
    });
  }

}
