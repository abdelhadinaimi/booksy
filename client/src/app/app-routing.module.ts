import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { ShelvesComponent } from './components/shelves/shelves.component';
import { AuthGuard } from './services/auth/auth.guard';
import { CallbackComponent } from './components/callback/callback.component';
import { SearchComponent } from './components/search/search.component';
import { DetailshelfComponent } from './components/detailshelf/detailshelf.component';
import { DetailbookComponent } from './components/detailbook/detailbook/detailbook.component';
const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: BooksComponent },
      { path: 'search', component: SearchComponent },
      { path: 'callback', component: CallbackComponent },
      { path: 'books/:id', component: DetailbookComponent },
      { path: 'test/:testID', component: BooksComponent },

      {
        path: 'shelves', component: ShelvesComponent, canActivate: [AuthGuard],
        children: [
          { path: ':shelfId', component: DetailshelfComponent }]
      },
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
