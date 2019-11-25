import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { ShelvesComponent } from './components/shelves/shelves.component';
import { AuthGuard } from './services/auth/auth.guard';
import { CallbackComponent } from './components/callback/callback.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'books', component: BooksComponent },
      { path: 'shelves', component: ShelvesComponent },
      { path: 'search', component: SearchComponent },
      { path: 'callback', component: CallbackComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }]
})
export class AppRoutingModule { }
