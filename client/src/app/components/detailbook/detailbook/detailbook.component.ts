import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { BookService } from '../../../services/book.service/book.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-detailbook',
  templateUrl: './detailbook.component.html',
  styleUrls: ['./detailbook.component.scss']
})
export class DetailbookComponent implements OnInit, OnDestroy {
  bookId: string;
  book: any;
  waiting: boolean;
  subscription: Subscription;
  model = {
    content: '',
    rating: 0
  };
  myReview: any;
  test: any;
  constructor(private router: ActivatedRoute, private navigateRouter: Router, private bookService: BookService, private auth: AuthService) { }

  ngOnInit() {
    this.bookId = this.router.snapshot.paramMap.get('id');
    this.waiting = true;
    this.getBook(this.bookId);


  }

  getBook(id) {
    this.bookService.getBook(id);
    this.subscription = this.bookService.book$.asObservable().subscribe(data => {
      if (!data) return;
      this.book = data;
      this.myReview = data.reviews.find(r => r.writer.name === this.auth.userProfile.name);
      if (this.myReview !== undefined) {
        this.model.content = this.myReview.reviewText;
        this.model.rating = parseInt(this.myReview.rating)
      }
      if (this.book.volume.volumeInfo.description !== undefined)
        this.book.volume.volumeInfo.description = this.book.volume.volumeInfo.description.replace(/<\/?[^>]+>/ig, " ");
      this.waiting = false;

    })
  }
  createReview(form: NgForm) {
    this.bookService.addReview(this.bookId, { reviewText: form.value.content, rating: this.model.rating }).subscribe(data => {
      this.bookService.getBook(this.bookId);
      form.reset();
    })
  }

  deleteReview() {
    this.bookService.deleteReview(this.bookId).subscribe(data => {
      this.bookService.getBook(this.bookId);
    })
  }

  setRating(v) {
    this.model.rating = v;
  }
  print(test) {
    let bookToRecommend = this.book.recommendations.volumes.find(b => b.id === test);
    this.test = bookToRecommend
    console.log(bookToRecommend);
  }

  ngOnDestroy() {
    this.bookService.book$.next(null);
    this.subscription.unsubscribe();
    this.waiting = true;
    this.book = null;
  }

  navigateBook(id) {
    this.model.content = '';
    this.book = null; 
    this.bookService.book$.next(null);
    this.navigateRouter.navigate(['/books/' + id]);
    window.scroll(0, 0);
    this.getBook(id);
  }


}


