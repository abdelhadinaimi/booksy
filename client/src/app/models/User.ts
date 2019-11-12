import { BookShelf } from './BookShelf';

export class User {
    firstname:string;
    lastname:string;
    email:string;
    bookshelves:BookShelf[];
    genre:string;
    constructor(firstname:string, lastname:string,email:string,bookshelves:BookShelf[],genre:string){
         this.firstname=firstname;
         this.lastname=lastname;
         this.email=email;
         this.bookshelves=bookshelves;
         this.genre=genre;
    }
}