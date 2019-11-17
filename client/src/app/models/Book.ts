import { Review } from './Review';

export class Book {
    id: string;
    title: string;
    authors: string[];
    thumbnail: string;
    rating:number;
    reviews:Review[];
    constructor(id: string =null, title: string,authors: string[],thumbnail:string,rating:number,reviews:Review[]) {
        this.id = id;
        this.title = title;
        this.authors = authors;
        this.thumbnail= thumbnail;
        this.rating=rating;
        this.reviews=reviews;
    }
}
