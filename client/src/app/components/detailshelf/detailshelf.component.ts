import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookshelfService } from '../../services/bookshelf.service/bookshelf.service';

@Component({
  selector: 'app-detailshelf',
  templateUrl: './detailshelf.component.html',
  styleUrls: ['./detailshelf.component.scss']
})
export class DetailshelfComponent implements OnInit {
  shelfID: any;
  shelf: any;

  constructor(private router: ActivatedRoute, private shelfService: BookshelfService) { }

  ngOnInit() {
    this.router.params.subscribe(
      params => {
        this.shelfID = params['id'];
        this.getShelf(this.shelfID);
      }
    );

  }

  getShelf(id) {
    this.shelfService.getShelf(id);
    this.shelfService.oneShelve$.subscribe(data => {
      if(!data) return;
      this.shelf = data;
      console.log("books = ",data.books);
    })
  }

}
