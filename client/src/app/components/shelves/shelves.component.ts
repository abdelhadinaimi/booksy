import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookshelfService } from '../../services/bookshelf.service/bookshelf.service';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-shelves',
  templateUrl: './shelves.component.html',
  styleUrls: ['./shelves.component.scss']
})
export class ShelvesComponent implements OnInit {
  shelves: any[];
  shelfName;
  idToDelete: any;
  validationError: boolean;
  errorMessage: boolean;
  errorMessageContent: any;
  constructor(private bookshelfService: BookshelfService, private router: Router) { }

  ngOnInit() {
    this.getShelves(true);
  }

  getShelves(redirect) {
    this.bookshelfService.getShelves(redirect);
    this.bookshelfService.shelves$.subscribe(data => {
      if (!data || !data.data || data.data.length === 0) {
        return;
      }
      this.shelves = data.data;
      if (data.redirect)
        this.router.navigate(['shelves/' + data.data[0]._id])
    })
  }
  createShelf(form: NgForm) {
    if (form.value.name === undefined || form.value.name.length < 3 || form.value.name.length > 32) {
      this.validationError = true;
      return;
    }
    else {
      this.validationError = false;
      this.bookshelfService.createShelf(form.value).subscribe(data => {
        this.getShelves(false);
        form.reset();
      }, err => {
        this.errorMessage = true;
        this.errorMessageContent = err.error.errors[0];
        setTimeout(() => {
          this.errorMessage = false;
        }, 2000);
      })
    }
  }

  deleteShelf() {
    this.bookshelfService.deleteShelf(this.idToDelete).subscribe(d => {
      this.getShelves(true);
    })
  }

  setIDtoDelete(id) {
    this.idToDelete = id;
  }
}
