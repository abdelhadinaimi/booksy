import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Booksy';
  contentSearch;
  constructor(public auth: AuthService,private router : Router){}

  searchBooks(form : NgForm){
    this.router.navigateByUrl('/search?q='+form.value.contentSearch);
  }
}

