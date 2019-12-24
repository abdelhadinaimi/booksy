import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { ShelvesComponent } from './components/shelves/shelves.component';
import { AuthGuard } from './services/auth/auth.guard';
import { CallbackComponent } from './components/callback/callback.component';
import { SearchComponent } from './components/search/search.component';
import { BookdetailsComponent } from './components/bookdetails/bookdetails.component';
const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: '', redirectTo: 'home',pathMatch: 'full'},
      { path: 'home', component: BooksComponent },
      { path: 'shelves', component: ShelvesComponent },
      { path: 'search', component: SearchComponent },
      { path: 'callback', component: CallbackComponent },
      { path: 'books/:id', component: BookdetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
   ]
})
export class AppRoutingModule { }
