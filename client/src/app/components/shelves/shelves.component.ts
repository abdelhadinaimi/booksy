import { Component, OnInit } from '@angular/core';
import { BookshelfService } from '../../services/bookshelf.service/bookshelf.service';

@Component({
  selector: 'app-shelves',
  templateUrl: './shelves.component.html',
  styleUrls: ['./shelves.component.scss']
})
export class ShelvesComponent implements OnInit {
  shelves: any[];

  constructor(private bookshelfService : BookshelfService) { }

  ngOnInit() {
    this.bookshelfService.getShelves().subscribe(data => {
      this.shelves = data;
    })
  }

}
