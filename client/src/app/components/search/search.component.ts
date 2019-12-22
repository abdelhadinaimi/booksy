import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service/book.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  model = {
    content: '',
    author: '',
    subject: '',
    publisher: ''
  };
  books = [];
  pages: Number;
  currentIndex;
  numberItems;
  test;
  waiting: boolean = false;
  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.model.content = params['q']
      this.searchBooks(params['q']);
    });

  }

  searchBooks(q) {
    this.waiting = true;
    this.currentIndex = 0;
    this.bookService.getBooks(q).subscribe(data => {
      this.waiting = false;
      this.books = data['items'];
      this.numberItems = data['totalItems']
      this.pages = Math.ceil(parseInt(this.numberItems) / 10);
    });
  }
  advancedSearchBooks(form: NgForm, startIndex) {
    this.waiting = true;
    this.currentIndex = startIndex;
    let content = (form.value.content === "") ? "" : form.value.content
    let author = (form.value.author === "") ? "" : "+inauthor:" + form.value.author;
    let subject = (form.value.subject === "") ? "" : "+subject:" + form.value.subject;
    let editor = (form.value.publisher === "") ? "" : "+inpublisher:" + form.value.publisher;
    let maxResults = "&maxResults=18";
    let index = "&startIndex=" + startIndex;
    let query = content + author + subject + editor + index + maxResults;
    this.bookService.getBooks(query).subscribe(data => {
      this.waiting = false;
      this.books = data['items'];
      this.numberItems = data['totalItems']
      this.pages = Math.ceil(parseInt(this.numberItems) / 10);

    });
  }

  counter(i: number) {
    return new Array(i);
  }
  setCurrentIndex(i) {
    this.currentIndex = parseInt(i);
  }

  print(test){
    let book = this.books.find(b => b.id === test);
    this.test = book;
  }
}
