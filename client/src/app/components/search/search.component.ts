import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service/book.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

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
  pages: number;
  pagination: number;
  currentIndex;
  numberItems;
  test;
  cpt: number = 0;
  waiting: boolean = false;
  array = [];
  maxPages: number;
  startIndex: any;
  constructor(private location: Location, private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.model.content = params['q'] !== "undefined" ? params['q'] : "";
      this.model.author = params['inauthor'];
      this.model.subject = params['subject'];
      this.model.publisher = params['inpublisher'];
      this.startIndex = params['startIndex'];
      let maxResults = "&maxResults=18";
      this.searchBooks(params['q'] + maxResults);
    });

  }

  searchBooks(q) {
    this.waiting = true;
    this.currentIndex = this.startIndex !== '0' && this.startIndex !== undefined ? parseInt(this.startIndex) : 0;
    console.log(this.currentIndex);
    let content = (this.model.content === "" || this.model.content === undefined) ? "" : this.model.content
    let author = (this.model.author === undefined || this.model.author === "") ? "" : "+inauthor:" + this.model.author;
    let subject = (this.model.subject === undefined || this.model.subject === "") ? "" : "+subject:" + this.model.subject;
    let editor = (this.model.publisher === undefined || this.model.publisher === "") ? "" : "+inpublisher:" + this.model.publisher;
    let maxResults = "&maxResults=18";
    let index = (this.startIndex === undefined || this.startIndex === "") ? "&startIndex=" + 0 : "&startIndex=" + this.startIndex;
    let query = content + author + subject + editor + index + maxResults;
    let urlQuery = query.replace(/\+/g, '&');
    let newState = 'search?q=' + urlQuery.replace(/\:/g, '=');
    this.location.replaceState(newState);
    history.pushState(null, 'Booksy', newState);
    this.bookService.getBooks(query).subscribe(
      res => {
        this.waiting = false;
        this.books = res['items'];
        this.numberItems = res['totalItems']
        this.pages = Math.floor(parseInt(this.numberItems + this.currentIndex) / 18);
        this.pagination = this.pages < 10 ? this.pages : 10;
        this.counter(0, this.pagination);
      },
      err => {
        this.books = [];
        this.numberItems = 0;
        this.waiting = false;
        this.pagination = 0;
      });
  }
  advancedSearchBooks(form: NgForm, startIndex) {
    this.waiting = true;
    this.currentIndex = startIndex;
    let content = (form.value.content === "") ? "" : form.value.content
    let author = (form.value.author === undefined || form.value.author === "") ? "" : "+inauthor:" + form.value.author;
    let subject = (form.value.subject === undefined || form.value.subject === "") ? "" : "+subject:" + form.value.subject;
    let editor = (form.value.publisher === undefined || form.value.publisher === "") ? "" : "+inpublisher:" + form.value.publisher;
    let maxResults = "&maxResults=18";
    let index = "&startIndex=" + startIndex;
    let query = content + author + subject + editor + index + maxResults;
    let urlQuery = query.replace(/\+/g, '&')
    let newState = 'search?q=' + urlQuery.replace(/\:/g, '=');
    this.location.replaceState(newState);
    history.pushState(null, 'Booksy', newState);
    this.bookService.getBooks(query).subscribe(
      res => {
        this.waiting = false;
        this.books = res['items'];
        this.numberItems = res['totalItems']
        this.pages = Math.floor(parseInt(this.numberItems + this.currentIndex) / 18);
        this.pagination = this.pages < 10 ? this.pages : 10;
        if ((this.pages > 10 && parseInt(startIndex) >= 90)) {
          this.counter((parseInt(startIndex) / 18) - 4, (parseInt(startIndex) / 18) + 6);
          if (this.currentIndex + 18 >= this.numberItems || this.currentIndex + 18 >= this.numberItems) {
            this.counter((parseInt(startIndex) / 18) - 4, (parseInt(startIndex) / 18) + 1);
          }
        }
        else {
          this.counter(0, this.pagination);
        }
      },
      err => {
        this.books = [];
        this.numberItems = 0;
        this.waiting = false;
        this.pagination = 0;
      });
  }

  counter(start: number, end: number) {
    this.array = [];
    for (let k = start; k < end; k++) {
      this.array.push(k);
    }
  }

  setCurrentIndex(i) {
    this.currentIndex = parseInt(i);
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
