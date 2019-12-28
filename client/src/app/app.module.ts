import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { ShelvesComponent } from './components/shelves/shelves.component';
import { CallbackComponent } from './components/callback/callback.component';
import { SearchComponent } from './components/search/search.component';
import { AuthService } from './services/auth.service';
import { FormsModule, NgForm} from '@angular/forms'
import { BookService } from './services/book.service/book.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailshelfComponent } from './components/detailshelf/detailshelf.component';
import { DetailbookComponent } from './components/detailbook/detailbook/detailbook.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksComponent,
    ShelvesComponent,
    CallbackComponent,
    SearchComponent,
    DetailshelfComponent,
    DetailbookComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
     
  ],
  providers: [AuthService,BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
