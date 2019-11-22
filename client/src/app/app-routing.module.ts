import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { ShelvesComponent } from './components/shelves/shelves.component';
import { AuthGuard } from './services/auth/auth.guard';
import { CallbackComponent } from './components/callback/callback.component';


const routes: Routes = [
  {path: '',component: HomeComponent, 
  children: [
  {path: 'books', component:BooksComponent},
  {path: 'shelves', component:ShelvesComponent},
  {path: 'callback', component:CallbackComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
