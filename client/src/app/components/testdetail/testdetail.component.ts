import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service/book.service';

@Component({
  selector: 'app-testdetail',
  templateUrl: './testdetail.component.html',
  styleUrls: ['./testdetail.component.scss']
})
export class TestdetailComponent implements OnInit {
  bookId: string;
  book: any;
  waiting: boolean;

  constructor(private router: ActivatedRoute, private bookService: BookService) { }

  ngOnInit() {
    this.bookId = this.router.snapshot.paramMap.get('id');
    this.waiting = true;
    this.bookService.getBook(this.bookId).subscribe(data => {
      this.book = data['volume'];
      if(this.book.volumeInfo.description !== undefined)
      this.book.volumeInfo.description = this.book.volumeInfo.description.replace(/<\/?[^>]+>/ig, " ");
      this.waiting = false;
    })

  }

}
