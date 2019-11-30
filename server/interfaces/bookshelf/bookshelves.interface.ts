import { Book } from '../book/book.interface';

export interface Bookshelf {
  readonly _id: string;
  readonly name: string;
  readonly books: ShelvedBook[];
  readonly created_at: string;
  readonly updated_at: string;
}

export interface ShelvedBook {
  readonly book: Book;
  readonly numberOfReadPages: number;
}
