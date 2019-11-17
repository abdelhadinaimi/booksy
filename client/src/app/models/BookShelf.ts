import { Book } from './Book';

export class BookShelf{
    name:string;
    books:Book[];
    numberOfReadPages: number;
    constructor(name:string,books:Book[],numberOfReadPages: number){
        this.name=name;
        this.books=books;
        this.numberOfReadPages=numberOfReadPages;
    }
}