import {User} from './User';
export class Review {
    rating:number;
    reviewText:string;
    writer:User;
    constructor(rating:number,reviewText:string,writer:User) {
        this.rating = rating;
        this.reviewText=reviewText;
        this.writer=writer;     
    }
}