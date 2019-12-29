import { Component, OnInit } from '@angular/core';
import { BookshelfService } from '../../services/bookshelf.service/bookshelf.service';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Router } from '@angular/router';

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
  constructor(private bookshelfService: BookshelfService, private router: Router) { }

  ngOnInit() {
    this.getShelves();
  }

  getShelves() {
    this.bookshelfService.getShelves();
    this.bookshelfService.shelves$.subscribe(data => {
      if(!data || data.length === 0) return;
      this.shelves = data;
      this.router.navigate(['shelves/'+data[0]._id]);
    })
  }
  createShelf(form: NgForm) {
    if (form.value.name === undefined || form.value.name.length < 3 || form.value.name.length > 32) {
      this.validationError = true;
      return;
    }
    else {
      this.validationError = false;
      this.bookshelfService.createShelf(form.value).subscribe(d => {
        this.getShelves();
        form.reset();
      })
    }
  }

  deleteShelf() {
    this.bookshelfService.deleteShelf(this.idToDelete).subscribe(d => {
      this.getShelves();
    })
  }

  setIDtoDelete(id) {
    this.idToDelete = id;
  }


}
